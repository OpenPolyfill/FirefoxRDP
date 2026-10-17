<script lang="ts">
  import { resolve } from '$app/paths';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  const destination = resolve('/docs/guide/getting-started');
  onMount(() => { void goto(destination, { replaceState: true }); });
</script>

<svelte:head>
  <title>Firefox RDP — Getting Started</title>
  <!-- Static hosts need a prerendered index.html, not an HTTP-only redirect. -->
  <meta http-equiv="refresh" content={'0;url=' + destination} />
  <link rel="canonical" href={destination} />
</svelte:head>

<p>Continue to <a href={destination}>Getting Started</a>.</p>
