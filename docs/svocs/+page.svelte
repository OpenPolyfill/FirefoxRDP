<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const Content = $derived(data.Content);
</script>

<svelte:head>
  <title>Getting started | Firefox RDP</title>
  <meta name="description" content="Install and use the Firefox Remote Debugging Protocol TypeScript SDK." />
</svelte:head>

<article class="home-doc">
  <header>
    <p class="eyebrow">@openpolyfill/firefox-rdp</p>
    <h1>Getting started</h1>
  </header>
  <div class="prose">
    <Content />
  </div>
</article>

<style>
  .home-doc {
    max-width: 52rem;
    margin: 0 auto;
    padding: clamp(2rem, 6vw, 4.5rem) 1.5rem 5rem;
  }
  header { margin-bottom: 2rem; }
  .eyebrow { font: 600 0.82rem monospace; letter-spacing: 0.04em; color: var(--accent-strong); }
  h1 { margin: 0.5rem 0; font-size: clamp(2rem, 5vw, 3.1rem); letter-spacing: -0.035em; }
  .prose { color: var(--text-soft); line-height: 1.7; }
  .prose :global(h2) { margin-top: 2.2rem; color: var(--text); font-size: 1.4rem; }
  .prose :global(a) { color: var(--accent-strong); }
  .prose :global(:not(pre) > code) {
    font: 0.9em 'Cascadia Code', 'JetBrains Mono', Consolas, monospace;
    padding: 0.12em 0.35em;
    border: 1px solid var(--line);
    border-radius: 0.3em;
    background: var(--bg-soft);
  }
  .prose :global(.code-frame) {
    margin: 1.2rem 0;
    border: 1px solid var(--line);
    border-radius: 0.65rem;
    background: var(--bg-soft);
    overflow: hidden;
  }
  .prose :global(.code-frame-header) { padding: 0.4rem 1rem; border-bottom: 1px solid var(--line); }
  .prose :global(.code-frame pre) { overflow-x: auto; margin: 0; padding: 1rem; }
  .prose :global(.token.comment) { color: var(--code-comment); }
  .prose :global(.token.keyword) { color: var(--code-keyword); }
  .prose :global(.token.string) { color: var(--code-string); }
  .prose :global(.token.function) { color: var(--code-function); }
  .prose :global(.token.number) { color: var(--code-number); }
  .prose :global(.token.operator) { color: var(--code-operator); }
  .prose :global(.token.punctuation) { color: var(--code-punctuation); }
</style>
