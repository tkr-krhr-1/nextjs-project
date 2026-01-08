"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postSchema } from "./schema";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type ActionState = {
  error?: string;
  fieldErrors?: {
    title?: string[];
    slug?: string[];
    description?: string[];
    content?: string[];
    password?: string[];
  };
} | null;

export async function createPost(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());
  
  // 1. Zodによるバリデーション
  const validatedFields = postSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, slug, description, content, password } = validatedFields.data;

  // 2. 認証チェック
  if (password !== process.env.ADMIN_KEY) {
    return { error: "認証に失敗しました。パスワードが正しくありません。" };
  }

  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  // 3. 重複チェック
  if (fs.existsSync(filePath)) {
    return {
      fieldErrors: {
        slug: ["同じスラッグの記事が既に存在します。"],
      },
    };
  }

  // 4. ファイル生成
  try {
    const fileContent = matter.stringify(content, {
      title,
      date: new Date().toISOString().split("T")[0],
      description,
    });

    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    fs.writeFileSync(filePath, fileContent, "utf8");
  } catch (error) {
    console.error("Failed to create post:", error);
    return { error: "記事の保存中にエラーが発生しました。" };
  }

  // 5. キャッシュ更新とリダイレクト
  revalidatePath("/blog");
  redirect("/blog");
}
