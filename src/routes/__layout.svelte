<script>
  import "../app.css";
  import theme from "$lib/store/theme";
</script>

<svelte:head>
  {#if $theme}
    <link href={`/themes/prism-${$theme}.css`} rel="stylesheet" />
  {/if}
</svelte:head>

{#if $theme}
  <div class="container min-h-screen bg-white-primary dark:bg-black-primary">
    <slot />
  </div>
{/if}
