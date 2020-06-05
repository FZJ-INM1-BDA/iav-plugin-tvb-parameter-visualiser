import App from './App.svelte';

let app
interactiveViewer.pluginControl.loadExternalLibraries(['d3@5.7.0'])
  .then(() => {
    const target = document.getElementById(`${__PLUGIN_NAME__}.container`)
    const staticFlag = target.getAttribute('static-flag')
    const selectedFile = target.getAttribute('selected-file')
    const selectedDataset = target.getAttribute('selected-dataset')
    const selectedTrackIndex = target.getAttribute('selected-track-index')
    const selectedTrackIndices = target.getAttribute('selected-track-indices')

    app = new App({
      target,
      props: {
        staticFlag,
        selectedFile,
        selectedDataset,
        selectedTrackIndex,
        selectedTrackIndices: selectedTrackIndices && selectedTrackIndices.split(',').map(v => Number(v)).filter(v => v !== NaN)
      }
    });

    interactiveViewer.pluginControl[__PLUGIN_NAME__].onShutdown(() => {
      console.log(`onShutdown ${__PLUGIN_NAME__}`)
      app.$destroy()
    })    
  })

export default app;