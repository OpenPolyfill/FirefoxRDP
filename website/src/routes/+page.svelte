<script lang="ts">
  import { resolve } from '$app/paths';
  import { onMount } from 'svelte';

  const destination = resolve('/docs');

  onMount(() => {
    window.location.replace(destination);
  });
</script>

<svelte:head>
  <title>Firefox RDP — Documentation</title>
  <!-- Meta refresh remains as a static-host fallback when JavaScript is disabled. -->
  <meta http-equiv="refresh" content={'0;url=' + destination} />
  <link rel="canonical" href={destination} />
</svelte:head>

<section class="redirect-page" aria-labelledby="redirect-title">
  <div class="redirect-card">
    <p class="eyebrow">Firefox RDP</p>
    <h1 id="redirect-title">Documentation</h1>
    <p>Opening the documentation…</p>
    <a class="continue" href={destination}>Continue to docs</a>
  </div>
</section>

<style>
  .redirect-page {
    display: grid;
    place-items: center;
    min-height: min(62vh, 34rem);
    padding: 4rem 1.25rem;
  }

  .redirect-card {
    width: min(100%, 34rem);
    padding: clamp(2rem, 6vw, 4rem);
    border: 1px solid var(--line);
    border-radius: 1rem;
    background: var(--bg-soft);
    box-shadow: 0 1.5rem 4rem color-mix(in srgb, var(--shadow) 24%, transparent);
    text-align: center;
  }

  .eyebrow {
    margin: 0 0 0.75rem;
    color: var(--accent-strong);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3.25rem);
    letter-spacing: -0.04em;
  }

  .redirect-card > p:not(.eyebrow) {
    margin: 0.85rem 0 1.5rem;
    color: var(--text-soft);
  }

  .continue {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1rem;
    border-radius: 0.55rem;
    background: var(--accent);
    color: var(--bg);
    font-weight: 650;
    text-decoration: none;
  }

  .continue:hover {
    background: var(--accent-strong);
  }
</style>
