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

  <!-- if inputlist is defined, is an array, and has length > 0 -->
  {#if inputList && Array.isArray(inputList) && inputList.length > 0}

  <!-- render each item in the list -->
  {#each inputList as item}
  <option value="{item}">
    {item}
  </option>
  {/each}

  <!-- if inputList cannot be rednered -->
  {:else}

  <!-- if selectedVal is defined, render selected val -->
  {#if selectedVal}
  <option value={selectedVal}>
    {selectedVal}
  </option>
  {/if}

  {/if}
</select>