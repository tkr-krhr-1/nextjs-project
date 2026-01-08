"use client";

import { useActionState, useState } from "react";
import { createPost } from "@/lib/actions";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function NewPostPage() {
  const [state, formAction, isPending] = useActionState(createPost, null);
  const [content, setContent] = useState("");
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="mb-8">
        <Link href="/blog" className="text-gray-600 hover:underline mb-4 inline-block">
          ← 記事一覧へ戻る
        </Link>
        <h1 className="text-4xl font-bold">新規記事作成</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* フォーム側 */}
        <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                管理パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                  state?.fieldErrors?.password ? "border-red-500" : ""
                }`}
                placeholder="ADMIN_KEYを入力"
              />
              {state?.fieldErrors?.password && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.password[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                  state?.fieldErrors?.title ? "border-red-500" : ""
                }`}
                placeholder="記事のタイトル"
              />
              {state?.fieldErrors?.title && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.title[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                スラッグ (URL)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                pattern="[a-z0-9-]+"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                  state?.fieldErrors?.slug ? "border-red-500" : ""
                }`}
                placeholder="example-post-slug"
              />
              <p className="text-xs text-gray-500 mt-1">小文字英数字とハイフンのみ</p>
              {state?.fieldErrors?.slug && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.slug[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                概要
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={2}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                  state?.fieldErrors?.description ? "border-red-500" : ""
                }`}
                placeholder="記事の短い説明"
              />
              {state?.fieldErrors?.description && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.description[0]}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  公開日
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  defaultValue={today}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                    state?.fieldErrors?.date ? "border-red-500" : ""
                  }`}
                />
                {state?.fieldErrors?.date && (
                  <p className="text-red-500 text-xs mt-1">{state.fieldErrors.date[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  カテゴリ
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  required
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                    state?.fieldErrors?.category ? "border-red-500" : ""
                  }`}
                  placeholder="Tech, Life, etc."
                />
                {state?.fieldErrors?.category && (
                  <p className="text-red-500 text-xs mt-1">{state.fieldErrors.category[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                タグ (カンマ区切り)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                  state?.fieldErrors?.tags ? "border-red-500" : ""
                }`}
                placeholder="Next.js, React, Tailwind"
              />
              {state?.fieldErrors?.tags && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.tags[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                アイキャッチ画像URL
              </label>
              <input
                type="text"
                id="coverImage"
                name="coverImage"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                  state?.fieldErrors?.coverImage ? "border-red-500" : ""
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {state?.fieldErrors?.coverImage && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.coverImage[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                本文 (Markdown)
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                  state?.fieldErrors?.content ? "border-red-500" : ""
                }`}
                placeholder="# こんにちは"
              />
              {state?.fieldErrors?.content && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.content[0]}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isPending ? "保存中..." : "記事を保存する"}
          </button>
        </form>

        {/* プレビュー側 */}
        <div className="hidden lg:block sticky top-8 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">プレビュー</h2>
          <div className="bg-gray-50 p-8 rounded-lg border min-h-[600px] max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="prose prose-slate max-w-none">
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <p className="text-gray-400">本文を入力するとここにプレビューが表示されます。</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
