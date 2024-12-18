import fs from "fs";
import matter from "gray-matter";

(() => {
  const files = fs
    .readdirSync("./markdown")
    .filter((val) => val.endsWith(".md"));
  const contents = [];
  for (let file of files) {
    const { data, content, isEmpty } = matter(
      fs.readFileSync(`./markdown/${file}`)
    );
    if (!isEmpty)
      contents.push({
        title: data.title,
        slug: data.slug,
        desc: data.desc,
        date: data.date,
        content,
      });
  }
  fs.writeFileSync("./src/assets/posts.json", JSON.stringify(contents));
})();
