<script context="module">
  export async function load({ page, fetch }) {
    const [{ posts }] = await Promise.all([
      fetch("/blog/posts.json").then((S) => S.json())
    ]);

    return {
      props: {
        posts
      }
    };
  }
</script>

<script lang="ts">
  import Navbar from "$lib/component/Navbar.svelte";
  import Footer from "$lib/component/Footer.svelte";
  import BlogPost from "$lib/component/BlogPost.svelte";

  export let posts;
</script>

<header>
  <Navbar />
</header>
<main>
  <h1
    class="text-black-primary dark:text-white-primary my-20 md:my-40 max-w-page-title"
  >
    Ryan usually wrote something here, blog, article, etc, you name it
  </h1>
  <ol>
    {#each posts as S}
      <BlogPost
        title={S?.title}
        author={S?.author}
        date={S?.date}
        href={`/blog/${S?.slug}`}
        preview={S?.preview}
      />
      <div class="h-0.5 w-full bg-white-secondary dark:bg-black-secondary" />
    {/each}
  </ol>
</main>
<div class="h-16" />
<Footer />
