const config = {
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool"
  },

  layout: {
    blog: "./src/lib/layout/blog.svelte",
    work: "./src/lib/layout/work.svelte"
  },

  remarkPlugins: [],
  rehypePlugins: [],
};

export default config;
