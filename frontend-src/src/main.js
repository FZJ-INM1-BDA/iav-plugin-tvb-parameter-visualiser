import App from './App.svelte';

const target = document.getElementById(`${__PLUGIN_NAME__}.container`)
const staticFlag = target.getAttribute('static-flag')
const selectedFile = target.getAttribute('selected-file')
const selectedDataset = target.getAttribute('selected-dataset')
const selectedTrackIndex = target.getAttribute('selected-track-index')

const app = new App({
  target,
  props: {
    staticFlag,
    selectedFile,
    selectedDataset,
    selectedTrackIndex
  }
});

interactiveViewer.pluginControl[__PLUGIN_NAME__].onShutdown(() => {
  console.log(`onShutdown ${__PLUGIN_NAME__}`)
  app.$destroy()
})

export default app;