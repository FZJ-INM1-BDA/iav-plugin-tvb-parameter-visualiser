<script>
  import { onMount, beforeUpdate } from 'svelte'
  let graphContainer

  export let data;

  let mountD3Pr

  const margin = {
    left: 40,
    top: 0,
    right: 10,
    bottom: 20
  }

  beforeUpdate(() => {
    if (data && graphContainer) {
      while(graphContainer.children[0]) {
        graphContainer.removeChild(graphContainer.children[0])
      }

      const { left: marginLeft, right: marginRight, top: marginTop, bottom: marginBottom } = margin
      const width = graphContainer.clientWidth - marginLeft - marginRight
      const height = graphContainer.clientHeight - marginTop - marginBottom
      
      const scaleX = d3.scaleLinear().range([0, width])
      const scaleY = d3.scaleLinear().range([0, height])
      const line = d3.line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y))

      const svg = d3.select(graphContainer)
        .append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
        .append('g')
          .attr('transform', `translate(${marginLeft}, ${marginTop})`)

      scaleX.domain([0, data.length])
      scaleY.domain(d3.extent( data ))

      svg.append('path')
        .attr('fill', 'none')
        .attr('stroke-width', '1px')
        .attr('stroke', 'steelblue')
        .data([ data.map((v, i) => ({ x: i, y: v })) ])
        .attr('d', line)


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
    console.log('mounting graph.svelte')
    mountD3Pr = interactiveViewer.pluginControl.loadExternalLibraries(['d3@5.7.0'])

    return () => {
      console.log('unmounting graph.svelte')
      interactiveViewer.pluginControl.unloadExternalLibraries(['d3@5.7.0'])
    }
  })
</script>
{#if data}
<div bind:this={graphContainer} class="graph-container">
</div>
{:else}
<div>
  No data to display
</div>
{/if}
<style>
.graph-container
{
  height: 20rem;
}
</style>