<script lang="ts">
  import type { IconNames } from "./Icon.type";

  export let icon: IconNames;
  export let width: number;
  export let height: number;
</script>

<svg class={`fill-current ${$$props.class}`} style={$$props.style}>
  <use href={`/images/icons.svg#${icon}`} {width} {height} />
</svg>
