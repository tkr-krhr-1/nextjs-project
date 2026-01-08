import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <header className="mb-8">
        <Link href="/blog" className="text-gray-600 hover:underline mb-4 inline-block">
          ← 記事一覧へ戻る
        </Link>
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
      </header>
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
