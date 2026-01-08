import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
}

/**
 * すべての記事のメタデータを取得し、日付順（降順）にソートして返します。
 */
export function getAllPosts(): PostMetadata[] {
  // ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        ...(data as { title: string; date: string; description: string }),
      };
    });

  // 日付順にソート（降順）
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * スラッグを指定して特定の記事データを取得します。
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as { title: string; date: string; description: string }),
    };
  } catch (error) {
    console.error(`Error fetching post by slug: ${slug}`, error);
    return null;
  }
}
