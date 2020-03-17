setTimeout(() => {
  let fetchedProfiles, selectedFile, subscriptions = [], onhoverLayerIdx
  const selector = document.getElementById(`$$PLUGIN_NAME$$.selector`)
  const resultPanel = document.getElementById('$$PLUGIN_NAME$$.result-panel')
  const populateSelector = arr => {
    while(!!selector.children[0]) {
      selector.removeChild(selector.children[0])
    }

    const defaultOpt = document.createElement('option')
    defaultOpt.value = null
    defaultOpt.innerText = 'select'
    selector.appendChild(defaultOpt)

    for (const item of arr) {
      const { name } = item
      const option = document.createElement('option')
      option.value = name
      option.innerText = name
      selector.appendChild(option)
    }
  }

  const outputWarning = message => {
    const div = document.createElement('div')
    div.innerText = message
    resultPanel.appendChild(div)
  }

  const updateGraph = () => {
    while(resultPanel.childElementCount > 0) {
      resultPanel.removeChild(resultPanel.children[0])
    }
    if (!selectedFile) {
      outputWarning(`Select a file.`)
      return
    }

    if (!fetchedProfiles) {
      outputWarning('Fetching file ...')
      return
    }

    if (!onhoverLayerIdx) {
      outputWarning('Hover on a segment')
      return
    }

    if (!fetchedProfiles[onhoverLayerIdx]) {
      outputWarning(`index out of bound idx: ${onhoverLayerIdx}, length: ${fetchedProfiles.length}`)
      return
    }

    outputWarning(`selected file: ${selectedFile}`)
    outputWarning(`------------`)
    outputWarning(`hovering segment index: ${onhoverLayerIdx}`)
    outputWarning(`------------`)

    const graphDiv = document.createElement('div')
    graphDiv.id = '$$PLUGIN_NAME$$.graph-container'
    graphDiv.style.height = '20rem'
    graphDiv.classList = 'w-100'
    resultPanel.appendChild(graphDiv)
    
    const scaleX = d3.scaleLinear().range([0, graphDiv.clientWidth])
    const scaleY = d3.scaleLinear().range([0, graphDiv.clientHeight])
    const line = d3.line()
      .x(d => scaleX(d.x))
      .y(d => scaleY(d.y))

    const svg = d3.select(graphDiv)
      .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
      .append('g')

    scaleX.domain([0, fetchedProfiles[onhoverLayerIdx].length])
    scaleY.domain(d3.extent( fetchedProfiles[onhoverLayerIdx] ))

    svg.append('path')
      .attr('fill', 'none')
      .attr('stroke-width', '2px')
      .attr('stroke', 'steelblue')
      .data([ fetchedProfiles[onhoverLayerIdx].map((v, i) => ({ x: i, y: v })) ])
      .attr('d', line)
  }

  const listenForChangeEv = ev => {
    fetchedProfiles = null
    const { srcElement } = ev
    selectedFile = srcElement.value === 'null'
      ? null
      : srcElement.value
    const url = new URL('$$HOSTNAME$$/data/get_matrix')
    url.searchParams.set('filename', selectedFile)

    if (!selectedFile) return
    fetch(url)
      .then(res => res.json())
      .then(val => {
        fetchedProfiles = val
        updateGraph()
      })
      .catch(e => {

      })
  }

  // TODO does not currently work. tracking issue: https://github.com/HumanBrainProject/interactive-viewer/issues/489
  const onShutdownCallback = () => {
    selector.removeEventListener('change', listenForChangeEv)
    interactiveViewer.viewerHandle.setLayerVisibility({
      name: /jubrain/
    }, true)
    while(subscriptions.length > 0) {
      subscriptions.pop().unsubscribe()
    }
    unloadExternalLibraries.unloadExternalLibraries(['d3@5.7.0'])
  }

  const main = () => {

    (() => {
      interactiveViewer.pluginControl.loadExternalLibraries(['d3@5.7.0'])
    })()

    subscriptions.push(
      interactiveViewer.viewerHandle.mouseOverNehubaLayers.subscribe(arr => {
        onhoverLayerIdx = null
        if (arr) {
          const obj = arr.find(({ layer }) => layer.name === '$$PLUGIN_NAME$$-DK68')
          if (obj) {
            const layerIdx = /#([0-9]{1,})$/.exec(obj.segment)
            if (layerIdx) {
              onhoverLayerIdx = Number(layerIdx[1])
            }
          }
        }
        updateGraph()
      })
    )

    selector.addEventListener('change', listenForChangeEv)
    fetch(`$$HOSTNAME$$/data/get_filtered_filenames`)
      .then(res => res.json())
      .then(populateSelector)
      .catch(e => {

      })

    interactiveViewer.viewerHandle.setLayerVisibility({
      name: /jubrain/
    }, false)
    interactiveViewer.viewerHandle.loadLayer({
      '$$PLUGIN_NAME$$-DK68': {
        type: 'segmentation',
        source: 'nifti://$$HOSTNAME$$/data/public/aparcaseg.nii.gz',
        selectedOpacity: 0.5
      }
    })
    interactiveViewer.pluginControl['$$PLUGIN_NAME$$'].onShutdown(onShutdownCallback)
  }
  main()
})