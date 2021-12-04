<script lang="ts">
  import { format, parseISO } from "date-fns";

  export let href = "#";
  export let title: string;
  export let date: string;
  export let author: string;
  export let preview: string;
</script>

<li class="py-10">
  <span
    class="text-black-primary dark:text-white-primary font-monospace font-medium text-xs opacity-50"
  >
    {format(date ? parseISO(date) : new Date(), "d/M/yyyy")} by {author}
  </span>
  <div class="h-2" />
  <a {href} class="text-black-primary dark:text-white-primary">
    <h3>{title}</h3>
  </a>
  <div class="h-6" />
  <p
    class="text-black-primary dark:text-white-primary max-w-prose line-clamp-6 leading-8"
  >
    {preview}
  </p>
  <div class="h-6" />
  <a {href}>
    <div
      class="inline-flex bg-accent-primary dark:bg-accent-secondary text-black-primary dark:text-white-primary py-3 px-4 rounded-none font-monospace font-medium text-sm"
    >
      read more
    </div>
  </a>
</li>
