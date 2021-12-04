import fs from "fs";
import matter from "gray-matter";
import removeMD from "remove-markdown";

export async function get() {
  const files = fs.readdirSync("./src/routes/blog");

  try {
    const posts = files.map((item) => {
      if (item.match(/\.md$/gm)) {
        const file = fs.readFileSync(`./src/routes/blog/${item}`, "utf8");
        const { data, content } = matter(file);
        const preview = removeMD(
          content
            .match(/^([A-Z]).+/gm)
            .join("")
            .substr(0, 1000)
        );

        return {
          ...(data as {
            date: string;
          }),
          preview
        };
      }
    });

    return {
      body: {
        posts: posts
          .filter(Boolean)
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      }
    };
  } catch (error) {
    console.log(error);
    return {
      body: {
        posts: []
      }
    };
  }
}
