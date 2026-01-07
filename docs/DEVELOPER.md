# 開発者向けドキュメント

このプロジェクトは、Next.js を使用したモダンな Web アプリケーションのベースプロジェクトです。MDX ベースのブログ機能が組み込まれています。

## 技術スタック

- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS (v4)
- **コンテンツ管理**: MDX (`next-mdx-remote`, `gray-matter`)
- **タイポグラフィ**: `@tailwindcss/typography`

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## プロジェクト構造

```text
├── content/
│   └── posts/          # ブログ記事 (MDXファイル)
├── src/
│   ├── app/            # Next.js App Router ページとコンポーネント
│   │   ├── blog/       # ブログ関連ページ
│   │   └── globals.css # グローバルスタイル
│   └── lib/
│       └── mdx.ts      # MDXデータ取得ユーティリティ
└── docs/               # ドキュメント類
```

## ブログ記事の追加方法

`content/posts/` ディレクトリに新しい `.mdx` ファイルを作成します。ファイル名が URL のスラッグになります。

### ファイル形式

```markdown
---
title: "記事のタイトル"
date: "2026-01-07"
description: "記事の概要"
---

# 記事の本文

ここに Markdown 形式で内容を記述します。
```

## MDX ユーティリティ (`src/lib/mdx.ts`)

記事データを取得するための共通関数を提供しています。

- `getAllPosts()`: すべての記事のメタデータを日付順（降順）で取得します。
- `getPostBySlug(slug)`: 指定したスラッグの記事データ（メタデータと本文）を取得します。

## 開発ルール

- **コミュニケーション**: 日本語で行います。
- **コードコメント**: 日本語で記述します。
- **コミットメッセージ**: 以下のプレフィックスを使用します。
  - `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
  - 例: `feat: 新しいコンポーネントの追加`
- **Issue 管理**: `.github/ISSUE_TEMPLATE/feature_request.md` のテンプレートに従って Issue を作成してください。
