/* blog liste sayfası */
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

export const metadata = {
  title: "PaletDepo Blog",
  description: "Palet depolama ve fulfillment dünyasından ipuçları",
};

export default function BlogHome() {
  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 space-y-10">
      <h1 className="text-4xl font-bold text-center">Blog</h1>

      {blogPosts.map((post) => (
        <article key={post.slug} className="space-y-1">
          <h2 className="text-2xl font-semibold">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("tr-TR")}
          </p>
          <p className="text-gray-600">{post.excerpt}</p>
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary hover:underline text-sm font-medium"
          >
            Devamını oku →
          </Link>
        </article>
      ))}
    </div>
  );
}
