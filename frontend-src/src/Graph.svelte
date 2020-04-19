<script>
  import { onMount, beforeUpdate } from 'svelte'
  import { getRandomColor, getMinMax } from './util'
  let graphContainer

  export let datas

  let mountD3Pr

  const margin = {
    left: 40,
    top: 0,
    right: 10,
    bottom: 20
  }

  export let yDomain


  beforeUpdate(() => {
    if (datas && graphContainer) {
      while(graphContainer.children[0]) {
        graphContainer.removeChild(graphContainer.children[0])
      }

      const { left: marginLeft, right: marginRight, top: marginTop, bottom: marginBottom } = margin
      const width = graphContainer.clientWidth - marginLeft - marginRight
      const height = graphContainer.clientHeight - marginTop - marginBottom
      
      const scaleX = d3.scaleLinear().range([0, width])

      // have the Y axis right side up
      const scaleY = d3.scaleLinear().range([height, 0])

      const svg = d3.select(graphContainer)
        .append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
        .append('g')
          .attr('transform', `translate(${marginLeft}, ${marginTop})`)

      const maxX = d3.max(
        datas.map(v => v.length)
      )
      scaleX.domain([0, maxX])
      scaleY.domain(
        yDomain || getMinMax(datas)
      )

      for (const index in datas) {

        const line = d3.line()
          .x(d => scaleX(d.x))
          .y(d => scaleY(d.y))

        svg.append('path')
          .attr('fill', 'none')
          .attr('stroke-width', '1px')
          .attr('stroke', getRandomColor(index))
          .data([ datas[index].map((v, i) => ({ x: i, y: v })) ])
          .attr('d', line)
      }

      // Add the X Axis
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(scaleX));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(scaleY));
    }
  })

  onMount(() => {
    mountD3Pr = interactiveViewer.pluginControl.loadExternalLibraries(['d3@5.7.0'])

    return () => {
      interactiveViewer.pluginControl.unloadExternalLibraries(['d3@5.7.0'])
    }
  })
</script>
{#if datas && datas.length > 0}
<div bind:this={graphContainer} class="graph-container">
</div>
{:else}
<div>
  No datas to display
</div>
{/if}
<style>
.graph-container
{
  height: 20rem;
}
</style>