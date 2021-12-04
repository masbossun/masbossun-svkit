<script lang="ts">
  import Footer from "$lib/component/Footer.svelte";
  import Navbar from "$lib/component/Navbar.svelte";
  import WorkImages from "$lib/component/WorkImages.svelte";
</script>

<header>
  <Navbar />
</header>

<main>
  <h1
    class="text-black-primary dark:text-white-primary my-20 md:my-40 max-w-page-title"
  >
    As a software developer, ryan does his works with passion
  </h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <WorkImages href="/work/winsen-xyz">
      <img
        src="/images/works/works-winsen.webp"
        alt="winsen"
        srcSet="/images/works/works-winsen.webp, /images/works/works-winsen@2x.webp 2x, /images/works/works-winsen@3x.webp 3x"
        class="h-full"
      />
    </WorkImages>
    <WorkImages href="/work/rekber-app">
      <img
        src="/images/works/works-rekber.webp"
        alt="rekber"
        srcSet="/images/works/works-rekber.webp, /images/works/works-rekber@2x.webp 2x, /images/works/works-rekber@3x.webp 3x"
        class="h-full"
      />
    </WorkImages>
    <WorkImages href="/work/waruung-app">
      <img
        src="/images/works/works-waruung.webp"
        alt="bukom-digital"
        srcSet="/images/works/works-waruung.webp, /images/works/works-waruung@2x.webp 2x, /images/works/works-waruung@3x.webp 3x"
        class="h-full"
      />
    </WorkImages>
    <WorkImages href="/work/hijrah-app">
      <img
        src="/images/works/works-hijrah.webp"
        alt="hijrah"
        srcSet="/images/works/works-hijrah.webp, /images/works/works-hijrah@2x.webp 2x, /images/works/works-hijrah@3x.webp 3x"
        class="h-full"
      />
    </WorkImages>
  </div>
  <div class="my-20 md:my-40 prose md:prose-lg dark:prose-dark max-w-none">
    <p>
      His name is Ryan Setiagi, he currently working as a full-time mobile
      developer at <a href="https://rukita.co">rukita</a>. basically, he does
      frontend development for the web and also for mobile app. Quite familiar
      with react environment such as{" "}
      <a href="https://reactjs.org">react js</a> and{" "}
      <a href="https://reactnative.dev">react native</a>. He can explore another
      framework and works with it if needed.
    </p>
    <p>
      In the meantime, he wrote some stuff on his <a href="/blog">blog</a>
      . Just to keep his memory sharp, in case he needs it in the future. He has
      a great interest in learning and building something new. If you are interested,
      feel free to <a href="/contacts">contact</a>{" "}
      him.
    </p>
  </div>
</main>

<Footer />
