<script lang="ts">
  import { onMount } from 'svelte';

  type AyuTheme = 'ayu-light' | 'ayu-dark' | 'ayu-mirage' | 'ayu-evolve';
  const options: { id: AyuTheme; label: string }[] = [
    { id: 'ayu-light', label: 'Ayu Light' },
    { id: 'ayu-dark', label: 'Ayu Dark' },
    { id: 'ayu-mirage', label: 'Ayu Mirage' },
    { id: 'ayu-evolve', label: 'Ayu Evolve' }
  ];
  let theme = $state<AyuTheme>('ayu-dark');

  onMount(() => {
    const initial = document.documentElement.dataset.ayu;
    if (options.some((option) => option.id === initial)) {
      theme = initial as AyuTheme;
    }
  });

  function changeTheme(event: Event) {
    const next = (event.currentTarget as HTMLSelectElement).value as AyuTheme;
    if (!options.some((option) => option.id === next)) return;
    theme = next;
    const mode = next === 'ayu-light' ? 'light' : 'dark';
    const html = document.documentElement;
    html.dataset.ayu = next;
    html.dataset.theme = mode;
    try {
      localStorage.setItem('openpolyfill-ayu-theme', next);
      localStorage.setItem('svocs-theme', mode);
    } catch { /* Storage can be disabled */ }
  }
</script>

<label class="theme-picker">
  <span class="sr-only">Color theme</span>
  <select aria-label="Color theme" value={theme} onchange={changeTheme}>
    {#each options as option}
      <option value={option.id}>{option.label}</option>
    {/each}
  </select>
</label>

<style>
  select {
    max-width: 9.5rem;
    min-height: 2.2rem;
    padding: .35rem .55rem;
    border-radius: .5rem;
    border: 1px solid var(--line);
    color: var(--text);
    background: var(--bg-elev);
    cursor: pointer;
    font: inherit;
    font-size: .84rem;
  }
  select:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  option { background: var(--bg-elev); color: var(--text); }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
