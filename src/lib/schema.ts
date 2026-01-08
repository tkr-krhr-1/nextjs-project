import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  slug: z
    .string()
    .min(1, "スラッグは必須です")
    .regex(/^[a-z0-9-]+$/, "スラッグは小文字英数字とハイフンのみ使用可能です")
    .max(50, "スラッグは50文字以内で入力してください"),
  description: z
    .string()
    .min(1, "概要は必須です")
    .max(200, "概要は200文字以内で入力してください"),
  content: z.string().min(1, "本文は必須です"),
  password: z.string().min(1, "パスワードは必須です"),
});

export type PostInput = z.infer<typeof postSchema>;
