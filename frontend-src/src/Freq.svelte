<script>
  import { beforeUpdate } from 'svelte'
  export let selectedDataset
  export let selectedFile
  export let selectedTrackIndex

  let imgsrc
  beforeUpdate(() => {
    imgsrc = null
    if (
      selectedDataset &&
      selectedFile &&
      (selectedTrackIndex === 0 || selectedTrackIndex)
    ){
      const url = new URL(`${__HOSTNAME__}/data/get_tf_plot`)
      url.searchParams.set('kgDatasetId', selectedDataset)
      url.searchParams.set('filename', selectedFile)
      url.searchParams.set('dkLabelIndex', selectedTrackIndex)
      imgsrc = url.toString()
    }
  })
</script>

{#if imgsrc }
<img class="w-100" src={imgsrc} alt="Frequency graph generated from the parameters.">
{:else}
<span>
  Please select a dataset/file/trackIndex
</span>
{/if}