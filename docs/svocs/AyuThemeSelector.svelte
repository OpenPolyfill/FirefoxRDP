<script lang="ts">
	import { onMount } from 'svelte';

	type AyuTheme = 'ayu-light' | 'ayu-dark' | 'ayu-mirage' | 'ayu-evolve';
	type ThemeSelection = 'auto' | AyuTheme;

	const options: { id: ThemeSelection; label: string }[] = [
		{ id: 'auto', label: 'Auto / System' },
		{ id: 'ayu-light', label: 'Ayu Light' },
		{ id: 'ayu-dark', label: 'Ayu Dark' },
		{ id: 'ayu-mirage', label: 'Ayu Mirage' },
		{ id: 'ayu-evolve', label: 'Ayu Evolve' }
	];
	let theme = $state<ThemeSelection>('auto');

	function resolvedTheme(selection: ThemeSelection): AyuTheme {
		if (selection !== 'auto') return selection;
		return window.matchMedia('(prefers-color-scheme: light)').matches ? 'ayu-light' : 'ayu-dark';
	}

	function applyTheme(next: ThemeSelection, persist = true) {
		theme = next;
		const resolved = resolvedTheme(next);
		const html = document.documentElement;
		html.dataset.ayu = resolved;
		html.dataset.theme = resolved === 'ayu-light' ? 'light' : 'dark';
		html.dataset.themePreference = next;
		if (!persist) return;
		try {
			localStorage.setItem('openpolyfill-ayu-theme', next);
			if (next === 'auto') {
				localStorage.removeItem('svocs-theme');
			} else {
				localStorage.setItem('svocs-theme', html.dataset.theme);
			}
		} catch {
			/* Storage can be disabled */
		}
	}

	onMount(() => {
		const initial = document.documentElement.dataset.themePreference;
		if (options.some((option) => option.id === initial)) {
			theme = initial as ThemeSelection;
		}
		const media = window.matchMedia('(prefers-color-scheme: light)');
		const updateSystemTheme = () => {
			if (theme === 'auto') applyTheme('auto', false);
		};
		media.addEventListener('change', updateSystemTheme);
		return () => media.removeEventListener('change', updateSystemTheme);
	});

	function changeTheme(event: Event) {
		const next = (event.currentTarget as HTMLSelectElement).value as ThemeSelection;
		if (!options.some((option) => option.id === next)) return;
		applyTheme(next);
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
