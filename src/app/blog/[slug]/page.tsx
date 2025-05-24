import { notFound } from "next/navigation";
import { blogPosts, BlogMeta } from "@/data/blogPosts";

interface Props {
  params: { slug: string };
}

/* export için gereken statik paramlar */
export const generateStaticParams = () =>
  blogPosts.map((p) => ({ slug: p.slug }));

export const metadata = {
  title: "Blog Detay – PaletDepo",
};

export default function BlogPost({ params }: Props) {
  const post: BlogMeta | undefined = blogPosts.find(
    (p) => p.slug === params.slug
  );
  if (!post) return notFound();

  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(post.date).toLocaleDateString("tr-TR")}
      </p>

      {/* ------- Geçici içerik ------- */}
      <p className="text-gray-700 leading-relaxed">
        {post.excerpt}
        <br />
        <br />
        Bu makalenin tam sürümü üzerinde çalışıyoruz. Yakında, canlı WMS
        senaryoları ve maliyet tablolarıyla güncellenecek. Takipte kalın!
      </p>
    </div>
  );
}
