<script>
  export let href;
</script>

<a
  {href}
  class={`py-2 px-4 transition ease-out hover:bg-accent-primary text-black-primary hover:text-white-primary dark:hover:bg-accent-secondary dark:text-white-primary dark:hover:text-black-primary ${$$props.class}`}
>
  <span class="font-monospace font-medium text-base">
    <slot />
  </span>
</a>
