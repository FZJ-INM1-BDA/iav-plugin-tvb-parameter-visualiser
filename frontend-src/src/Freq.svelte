<script>
  import { beforeUpdate, onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  export let selectedDataset
  export let selectedFile
  export let selectedTrackIndex

  let imgsrc
  let imgError
  let imgLoading = false

  const imgsrcStream = writable(null)

  const unsubscribe = imgsrcStream.subscribe(val => {
    if (val !== imgsrc) {
      imgError = null
      imgLoading = true
      imgsrc = val
    }
  })

  onDestroy(unsubscribe)

  beforeUpdate(() => {
    if (
      selectedDataset &&
      selectedFile &&
      (selectedTrackIndex === 0 || selectedTrackIndex)
    ){
      const url = new URL(`${__HOSTNAME__}/data/get_tf_plot`)
      url.searchParams.set('kgDatasetId', selectedDataset)
      url.searchParams.set('filename', selectedFile)
      url.searchParams.set('dkLabelIndex', selectedTrackIndex)
      imgsrcStream.set(url.toString())
    } else {
      imgsrcStream.set(null)
    }
  })

  function handleError(error){
    imgError = error
  }

  function handleLoad(){
    imgLoading = false
  }

</script>

<style>
img
{
  transition: opacity ease-in-out 200ms;
}
.loading
{
  opacity: 0.2;
}
</style>
{#if imgsrc }
{#if imgError}
<span>Freqency graph for channel {selectedTrackIndex} cannot be found</span>
{:else}
<img class="w-100 {imgLoading ? 'loading' : ''}"
  src={imgsrc}
  alt="Frequency graph generated from the parameters."
  on:error={handleError}
  on:load={handleLoad}>
{/if}
{:else}
<span>
  Please select a dataset/file/trackIndex
</span>
{/if}