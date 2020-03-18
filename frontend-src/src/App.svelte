<script>
  import { onMount } from 'svelte'
  import Selector from './Selector.svelte';
  import Graph from './Graph.svelte'

  export let datasetArray = []
  export let selectedDataset = null

  export let fetchedFiles = []
  export let selectedFile = null

  export let fetchedDataFromFile = []

  export let staticFlag;
  export let selectedTrackIndex;

  const fetchRoot = () => {
    datasetArray = []
    selectedDataset = null
    fetch(`${__HOSTNAME__}/data/`)
      .then(res => res.json())
      .then(arr => {
        datasetArray = arr
      })
  }

  function handleSelectDataset(ev) {
    selectedDataset = ev.detail.value
    fetchFiles()
  }

  function fetchFiles(){
    fetchedFiles = []
    selectedFile = null
    const url = new URL(`${__HOSTNAME__}/data/get_filtered_filenames`)
    url.searchParams.set('kgDatasetId', selectedDataset)
    fetch(url)
      .then(res => res.json())
      .then(arr => {
        fetchedFiles = arr.map(({ name }) => name)
      })
  }

  function handleSelectFile(ev) {
    fetchedDataFromFile = []
    selectedFile = ev.detail.value
    const url = new URL(`${__HOSTNAME__}/data/get_matrix`)
    url.searchParams.set('filename', selectedFile)
    url.searchParams.set('kgDatasetId', selectedDataset)
    fetch(url)
      .then(res => res.json())
      .then(arr => {
        fetchedDataFromFile = arr
      })
  }

  function handleChangeIndex(ev) {
    const value = ev.detail.value
    selectedTrackIndex = Number(value)
  }

  function pinGraph(){
    const url = new URL(`${__HOSTNAME__}/frontend/manifest.json`)
    url.searchParams.set('selectedDataset', selectedDataset)
    url.searchParams.set('selectedFile', selectedFile)
    url.searchParams.set('selectedTrackIndex', selectedTrackIndex)
    
    fetch(url)
      .then(res => res.json())
      .then(manifest => {
        interactiveViewer.uiHandle.launchNewWidget(manifest)
      })
  }
    
  onMount(() => {

    const subscriptions = []    
    if (staticFlag) {
      if (selectedFile && selectedDataset) {
        const url = new URL(`${__HOSTNAME__}/data/get_matrix`)
        url.searchParams.set('filename', selectedFile)
        url.searchParams.set('kgDatasetId', selectedDataset)

        fetch(url)
          .then(res => res.json())
          .then(arr => {
            fetchedDataFromFile = arr
          })
      } else {
        // TODO display errors
      }
    } else {

      fetchRoot()

      interactiveViewer.viewerHandle.setLayerVisibility({
        name: /jubrain/
      }, false)

      const obj = {}
      obj[`${__PLUGIN_NAME__}-DK68`] = {
        type: 'segmentation',
        source: `nifti://${__HOSTNAME__}/data/public/aparcaseg.nii.gz`,
        selectedOpacity: 0.5
      }

      interactiveViewer.viewerHandle.loadLayer(obj)

      subscriptions.push(
        interactiveViewer.viewerHandle.mouseOverNehubaLayers.subscribe(arr => {
          selectedTrackIndex = null
          if (arr) {
            const obj = arr.find(({ layer }) => layer.name === `${__PLUGIN_NAME__}-DK68`)
            if (obj) {
              const layerIdx = /#([0-9]{1,})$/.exec(obj.segment)
              if (layerIdx) {
                selectedTrackIndex = Number(layerIdx[1])
              }
            }
          }
        })
      )
    }
  
    return () => {
      if (staticFlag) {

      } else {

        interactiveViewer.viewerHandle.setLayerVisibility({
          name: /jubrain/
        }, true)

        interactiveViewer.viewerHandle.removeLayer({
          name: `${__PLUGIN_NAME__}-DK68`
        })

      }
      while(subscriptions.length > 0) {
        subscriptions.pop().unsubscribe()
      }
    }
  })
</script>

<div class="d-flex flex-column m-2">

  <!-- select dataset -->
  <div class="d-flex flex-column">
    <label class="d-inline-block">
      Select dataset
    </label>
    <Selector
      inputList={datasetArray}
      disabled={staticFlag}
      selectedVal={selectedDataset}
      on:selectChanged={handleSelectDataset}/>
  </div>

  <!-- select file -->
  <div class="d-flex flex-column pt-2 {selectedDataset ? '' : 'tvb-plugin-muted'}">
    <label class="d-inline-block">
      Select file
    </label>
    <Selector
      inputList={fetchedFiles}
      disabled={staticFlag || !selectedDataset}
      selectedVal={selectedFile}
      on:selectChanged={handleSelectFile}/>
  </div>

  <!-- select a channel -->
  <div class="d-flex flex-column pt-2 {selectedDataset && selectedFile ? '' : 'tvb-plugin-muted'}">
    <label class="d-inline-block">
      Select index
    </label>
    <Selector
      inputList={fetchedDataFromFile.map((v, idx) => idx)}
      disabled={staticFlag || !selectedFile}
      selectedVal={selectedTrackIndex}
      on:selectChanged={handleChangeIndex}
      />
  </div>

  <!-- Pin icon -->
  {#if !staticFlag && fetchedDataFromFile[selectedTrackIndex]}
  <div class="mt-2 btn btn-dark"
    on:click={pinGraph}>
    <i class="fas fa-thumbtack"></i>
    <span>
      Pin (alt/option + w)
    </span>
  </div>
  {/if}

  <!-- graph -->
  <div class="d-flex flex-column pt-2">
    <Graph data={fetchedDataFromFile[selectedTrackIndex]} />
  </div>

</div>
<svelte:window on:keydown={ev => !staticFlag && ev.code === 'KeyW' && ev.altKey && pinGraph() }/>
<style>
.tvb-plugin-muted
{
  opacity: 0.5;
}
</style>