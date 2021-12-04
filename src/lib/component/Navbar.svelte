<script lang="ts">
  import type { IconNames } from "./Icon.type";
  import theme from "$lib/store/theme";

  import NavLogo from "./NavLogo.svelte";
  import NavLink from "./NavLink.svelte";
  import Icon from "./Icon.svelte";
  import NavMenu from "./NavMenu.svelte";

  let windowWidth: number;
  let icon: IconNames;
  let isMenuShow = false;
  $: colorMode = $theme;
  $: icon = colorMode === "dark" ? "moon" : "sun";

  function toggleColorMode() {
    switch (colorMode) {
      case "dark":
        colorMode = "light";
        theme.set("light");
        break;
      case "light":
        colorMode = "dark";
        theme.set("dark");
        break;
      default:
        break;
    }
  }

  function toggleMenuShow() {
    isMenuShow = !isMenuShow;
  }
</script>

<svelte:window bind:innerWidth={windowWidth} />

<nav class="flex flex-row items-center justify-between py-4 relative">
  <NavLogo />

  {#if windowWidth}
    {#if windowWidth >= 640}
      <div class="flex items-center">
        <NavLink href="/blog" className="mr-2">blog</NavLink>
        <NavLink href="/contacts" className="mr-2">contacts</NavLink>
        <button
          class="text-black-primary transition ease-out hover:bg-accent-primary p-2 rounded-none hover:text-white-primary dark:hover:bg-accent-secondary dark:text-white-primary dark:hover:text-black-primary"
          on:click={toggleColorMode}
        >
          <Icon
            {icon}
            height={20}
            width={20}
            class="h-5 w-5"
            style="margin: 2.5px"
          />
        </button>
      </div>
    {:else}
      <button
        type="button"
        on:click={toggleMenuShow}
        class="text-black-primary dark:text-white-primary appearance-none fixed right-2 p-2 rounded-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 z-20"
      >
        <svg class="h-6 w-6 fill-current">
          <use
            href={`/images/icons.svg${
              isMenuShow ? "#masbossun_times" : "#masbossun_menu"
            }`}
          />
        </svg>
      </button>
    {/if}
  {/if}

  {#if isMenuShow}
    <NavMenu onToggleColorMode={toggleColorMode} />
  {/if}
</nav>
