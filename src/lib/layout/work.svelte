<script>
  import Navbar from "$lib/component/Navbar.svelte";
  import Footer from "$lib/component/Footer.svelte";

  export let title;
  export let category;
</script>

<header>
  <Navbar />
</header>

<h1
  class="text-black-primary dark:text-white-primary my-20 md:my-40 max-w-page-title"
>
  {title}
</h1>
<span
  class="text-black-primary dark:text-white-primary font-monospace font-medium text-xs opacity-50"
>
  {category}
</span>
<div
  class="prose md:prose-lg dark:prose-dark max-w-none my-8"
  style="min-height: 50vh;"
>
  <slot />
</div>

<div class="h-12" />

<Footer />
