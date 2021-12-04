<script lang="ts">
  export let href: string;
</script>

<a {href} class="group">
  <div
    class="aspect-w-1 aspect-h-1 bg-white-secondary dark:bg-black-secondary overflow-hidden transition duration-700 ease-out group-hover:bg-accent-primary dark:group-hover:bg-accent-secondary"
  >
    <div
      class="transform transition duration-1000 ease-out group-hover:scale-105 group-hover:translate-x-3 group-hover:-translate-y-1"
    >
      <slot />
    </div>
  </div>
</a>
