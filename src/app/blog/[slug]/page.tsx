import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import { getBlogPost, ProcessedBlogSection } from "@/lib/blog";
//import BlogImageSection from "@/components/BlogImageSection";
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';

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

  // Function to convert markdown to HTML
  const markdownToHtml = async (content: string) => {
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    return processedContent.toString();
  };

  // Process all content sections
  const processedSections: ProcessedBlogSection[] = await Promise.all(
    post.sections.map(async (section, index) => {
      if (section.type === 'content') {
        const contentHtml = await markdownToHtml(section.content);
        return { ...section, processedContent: contentHtml, index };
      }
      return { ...section, index };
    })
  );

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
      <article>
        {/* Header */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-8">
            {new Date(post.date).toLocaleDateString("tr-TR")}
          </p>
        </div>
        
        {/* Hero Image */}
        <div className="mb-16 max-w-5xl mx-auto">
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            width={1200}
            height={600}
            quality={90}
            priority
            className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
        
        {/* Content Container with Newspaper Style */}
        <div className="max-w-7xl mx-auto">
          <div className="lg:columns-2 lg:gap-12 xl:columns-3 xl:gap-16">
            {processedSections.map((section) => {
              if (section.type === 'content') {
                return (
                  <div 
                    key={section.index}
                    className="prose prose-lg prose-blue mb-8 lg:mb-12 break-inside-avoid prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-h2:break-after-avoid prose-h3:break-after-avoid"
                    dangerouslySetInnerHTML={{ __html: section.processedContent || '' }}
                  />
                );
              } else if (section.type === 'image') {
                return (
                  <div 
                    key={section.index}
                    className="mb-8 lg:mb-12 break-inside-avoid"
                    style={{ columnSpan: 'all' }}
                  >
                    <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📸</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-0">
                          Görsel alanı - Bu bölüme konuyla ilgili görsel eklenecek
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
