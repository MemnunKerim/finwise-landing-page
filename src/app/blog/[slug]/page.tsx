import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import { getBlogPost } from "@/lib/blog";

interface Props {
  params: { slug: string };
}

/* export için gereken statik paramlar */
export const generateStaticParams = () =>
  blogPosts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const post = await getBlogPost(params.slug);
  
  return {
    title: post ? `${post.title} – PaletDepo` : "Blog Detay – PaletDepo",
    description: post?.excerpt || "PaletDepo blog yazısı",
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getBlogPost(params.slug);
  
  if (!post) return notFound();

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4">
      <article className="prose prose-lg max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("tr-TR")}
          </p>
        </div>
        
        <div 
          className="prose prose-lg prose-blue max-w-none prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
