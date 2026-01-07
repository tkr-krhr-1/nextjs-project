# 実装プラン: Issue #2 ブログ機能の基盤構築

Issue #2 に基づき、ブログ機能の基盤となる依存関係の導入とディレクトリ構造の準備を行います。

## 1. 依存関係のインストール

以下のパッケージをインストールします。

- `gray-matter`: Markdown のフロントマターをパースするため
- `next-mdx-remote`: MDX コンテンツをレンダリングするため
- `@tailwindcss/typography`: 記事本文のスタイリング（prose クラス）のため

```bash
npm install gray-matter next-mdx-remote @tailwindcss/typography
```

## 2. ディレクトリ構造の作成

ブログ記事を管理するためのディレクトリを作成します。

- `content/posts/`

## 3. サンプル記事の作成

動作確認用のサンプル記事 `content/posts/hello-world.mdx` を作成します。

### 内容案:

---

title: "Hello World"
date: "2026-01-07"
description: "最初のブログ記事です。"

---

# Hello World

これは最初のブログ記事です。MDX を使用して記述されています。
