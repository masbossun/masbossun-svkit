<script>
  import { format, parseISO } from "date-fns";
  import Navbar from "$lib/component/Navbar.svelte";
  import Footer from "$lib/component/Footer.svelte";

  export let title;
  export let author;
  export let date;
  export let git;
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
  {format(date ? parseISO(date) : new Date(), "d/M/yyyy")} by{" "}
  {author}
</span>

<div class="prose md:prose-lg dark:prose-dark max-w-none my-8">
  <slot />
</div>

<h3 class="text-black-primary dark:text-white-primary my-6 p-6 text-center">
  ***
</h3>
<section
  class="bg-white-secondary dark:bg-black-secondary p-6 -mx-6 md:mx-0 mb-20"
>
  <p class="text-black-primary dark:text-white-primary font-body">
    If you find any misleading information or grammar issue, feel free to make
    corrections <a href={git}>here</a>.
  </p>
</section>
<Footer />
