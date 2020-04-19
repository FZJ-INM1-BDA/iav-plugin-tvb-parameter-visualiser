<script>
  import { onMount } from 'svelte'
  import Selector from './Selector.svelte';
  import Graph from './Graph.svelte'
  import Freq from './Freq.svelte'
  import { getMinMax } from './util'

  export let datasetArray = []
  export let selectedDataset = null

  export let fetchedFiles = []
  export let selectedFile = null

  export let fetchedDataFromFile = []

  export let staticFlag
  export let selectedTrackIndex
  export let selectedTrackIndices = []

  let ngLayername

  const pinnedIndicesSet = new Set()
  let pinnedIndices = []

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

  function updateSelectedTractIndex(val) {
    selectedTrackIndex = val
    selectedTrackIndices = [ val ]
  }

  function handleChangeIndex(ev) {
    const value = ev.detail.value
    updateSelectedTractIndex(Number(value))
  }

  function pinIndex(idx){
    pinnedIndicesSet.add(idx)
    pinnedIndices = Array.from(pinnedIndicesSet)
  }

  function removePin(item){
    pinnedIndicesSet.delete(item)
    pinnedIndices = Array.from(pinnedIndicesSet)
  }

  function pinIndexFromMouseover(){
    togglePinIndex(selectedTrackIndex)
  }

  function togglePinIndex(index) {
    if (pinnedIndicesSet.has(index)) removePin(index)
    else pinIndex(index)
  }

  function pinGraph(){
    const url = new URL(`${__HOSTNAME__}/frontend/manifest.json`)
    url.searchParams.set('selectedDataset', selectedDataset)
    url.searchParams.set('selectedFile', selectedFile)
    url.searchParams.set('selectedTrackIndices', selectedTrackIndices.join(','))
    
    fetch(url)
      .then(res => res.json())
      .then(manifest => {
        interactiveViewer.uiHandle.launchNewWidget(manifest)
      })
  }

  async function getUserToSelectRegion() {
    await new Promise((rs) => setTimeout(rs, 1000))
    while(true) {
      try {
        const regionObj = await interactiveViewer.uiHandle.getUserToSelectARegion(`TVB IAV plugin: click any region to toggle pin region`)
        const { layer, segment } = regionObj || {}
        const { name } = layer || {}
        if (ngLayername && name === ngLayername) {
          const idx = segment && segment.replace && segment.replace(ngLayername, '')
          const regexCheck = /^#[1-9][0-9]*$/.test(idx)
          if (regexCheck) {
            const num = Number(idx.replace('#', ''))
            togglePinIndex(num)
          } else {
            console.log('does not check out', idx)
          }
        }
      } catch (e) {

      }
    }
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

      getUserToSelectRegion()

      interactiveViewer.viewerHandle.setLayerVisibility({
        name: /jubrain/
      }, false)

      const obj = {}
      ngLayername = `${__PLUGIN_NAME__}-DK68`
      obj[ngLayername] = {
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
                updateSelectedTractIndex(
                  Number(layerIdx[1])
                )
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

  <div class="d-flex pt-2 flex-row flex-wrap">
    {#each pinnedIndices as pinnedIndex}
    <div class="d-inline-block d-flex align-items-center">
      <span>
        {pinnedIndex}
      </span>
      <button on:click={() => removePin(pinnedIndex)} class="close">&times;</button>
    </div>
    {/each}
  </div>

  <!-- Pin icon -->
  {#if !staticFlag}
  <div class="mt-2 btn btn-dark {fetchedDataFromFile[selectedTrackIndex] ? '' : 'tvb-plugin-muted'}"
    on:click={pinIndexFromMouseover}>
    <i class="fas fa-thumbtack"></i>
    <span>
      { fetchedDataFromFile[selectedTrackIndex] ? 'Pin (click to toggle)' : 'Hover or select area' }
    </span>
  </div>
  {/if}

  <!-- graph -->
  <div class="d-flex flex-column pt-2">
    <Graph
      datas={[...pinnedIndices, selectedTrackIndex].map(index => fetchedDataFromFile[index]).filter(v => !!v)}
      yDomain={getMinMax(fetchedDataFromFile)}/>
  </div>

  <div class="d-flex pt-2">
    <Freq
      selectedDataset={selectedDataset}
      selectedFile={selectedFile}
      selectedTrackIndex={selectedTrackIndex}
    />
  </div>

</div>
<style>
.tvb-plugin-muted
{
  opacity: 0.5;
}
</style>