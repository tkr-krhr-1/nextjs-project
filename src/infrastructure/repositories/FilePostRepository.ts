import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../../domain/entities/Post";
import { PostRepository } from "../../domain/repositories/PostRepository";

export class FilePostRepository implements PostRepository {
  private readonly postsDirectory: string;

  constructor() {
    this.postsDirectory = path.join(process.cwd(), "content/posts");
  }

  async exists(slug: string): Promise<boolean> {
    const filePath = path.join(this.postsDirectory, `${slug}.mdx`);
    return fs.existsSync(filePath);
  }

  async save(post: Post): Promise<void> {
    const filePath = path.join(this.postsDirectory, `${post.slug}.mdx`);

    const fileContent = matter.stringify(post.content, {
      title: post.title,
      date: post.date,
      description: post.description,
      category: post.category,
      tags: post.tags,
      coverImage: post.coverImage || "",
    });

    if (!fs.existsSync(this.postsDirectory)) {
      fs.mkdirSync(this.postsDirectory, { recursive: true });
    }

    fs.writeFileSync(filePath, fileContent, "utf8");
  }
}
