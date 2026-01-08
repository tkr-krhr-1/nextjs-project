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
    date?: string[];
    category?: string[];
    tags?: string[];
    coverImage?: string[];
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

  const { title, slug, description, date, category, tags, coverImage, content, password } = validatedFields.data;

  // 2. 認証チェック
  if (password !== process.env.ADMIN_KEY) {
    return { error: "認証に失敗しました。パスワードが正しくありません。" };
  }

  // 3. 保存先ディレクトリの準備
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }
  } catch (error) {
    console.error("Failed to create directory:", error);
    return { error: "保存先ディレクトリの作成に失敗しました。" };
  }

  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const tempFilePath = `${filePath}.tmp`;

  // 4. 重複チェック
  if (fs.existsSync(filePath)) {
    return {
      fieldErrors: {
        slug: ["同じスラッグの記事が既に存在します。"],
      },
    };
  }

  // 5. ファイル生成 (アトミックな書き込み)
  try {
    const tagsArray = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

    const fileContent = matter.stringify(content, {
      title,
      date,
      description,
      category,
      tags: tagsArray,
      coverImage: coverImage || "",
    });

    // 一時ファイルに書き込み
    fs.writeFileSync(tempFilePath, fileContent, "utf8");
    
    // 一時ファイルを本番ファイルにリネーム (アトミック)
    fs.renameSync(tempFilePath, filePath);
  } catch (error) {
    console.error("Failed to create post:", error);
    
    // 一時ファイルが残っている場合は削除を試みる
    if (fs.existsSync(tempFilePath)) {
      try { fs.unlinkSync(tempFilePath); } catch (e) { console.error("Failed to delete temp file:", e); }
    }
    
    return { error: "記事の保存中にエラーが発生しました。ディスク容量や権限を確認してください。" };
  }

  // 6. キャッシュ更新とリダイレクト
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/blog");
}
