import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">ブログ記事一覧</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm mb-2">{post.date}</p>
            <p className="text-gray-700">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline mt-4 inline-block"
            >
              続きを読む →
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-12">
        <Link href="/" className="text-gray-600 hover:underline">
          ← トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
