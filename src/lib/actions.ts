"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postSchema } from "./schema";
import { FilePostRepository } from "../infrastructure/repositories/FilePostRepository";
import { CreatePostUseCase } from "../use-cases/CreatePostUseCase";

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

  // 3. Use Case の実行
  try {
    const repository = new FilePostRepository();
    const useCase = new CreatePostUseCase(repository);

    await useCase.execute({
      title,
      slug,
      description,
      date,
      category,
      tags,
      coverImage: coverImage || "",
      content,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "ALREADY_EXISTS") {
      return {
        fieldErrors: {
          slug: ["同じスラッグの記事が既に存在します。"],
        },
      };
    }
    console.error("Failed to create post:", error);
    return { error: "記事の保存中にエラーが発生しました。" };
  }

  // 4. キャッシュ更新とリダイレクト
  revalidatePath("/blog");
  redirect("/blog");
}
