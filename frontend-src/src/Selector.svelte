<script>
  export let inputList;
  export let disabled;
  export let selectedVal;

  import { createEventDispatcher } from 'svelte'
  
  const dipatchChangeEv = createEventDispatcher()
  function handleChange(ev){
    const newValue = ev.srcElement.value
    dipatchChangeEv('selectChanged', { value: newValue })
  }
</script>

<select
  on:change={handleChange}
  value={selectedVal || 'null'}
  disabled={disabled}>
  <option value="null" disabled>
    -- select --
  </option>
  {#if selectedVal}
  <option value={selectedVal}>
    {selectedVal}
  </option>
  {/if}
  {#each inputList as item}
  <option value="{item}">
    {item}
  </option>
  {/each}
</select>