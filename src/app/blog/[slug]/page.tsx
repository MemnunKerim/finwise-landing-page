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
  
  if (!post) {
    return {
      title: "Blog Detay – PaletDepo",
      description: "PaletDepo blog yazısı",
    };
  }

  const blogImageUrl = `/images/blog-${post.slug.replace(/-/g, '')}.png`;
  const fallbackImageUrl = '/images/warehouse-hero.webp';
  
  return {
    title: `${post.title} – PaletDepo Blog`,
    description: post.excerpt,
    keywords: `palet depolama, lojistik, ${post.title.toLowerCase()}, depo yönetimi, istanbul depo`,
    authors: [{ name: "PaletDepo Ekibi" }],
    alternates: {
      canonical: `https://paletdepo.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} – PaletDepo`,
      description: post.excerpt,
      url: `https://paletdepo.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['PaletDepo Ekibi'],
      images: [
        {
          url: blogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
        {
          url: fallbackImageUrl,
          width: 1200,
          height: 675,
          alt: 'PaletDepo - Palet Depolama Hizmetleri',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} – PaletDepo`,
      description: post.excerpt,
      images: [blogImageUrl],
    },
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
          <div className="lg:columns-2 lg:gap-12 xl:columns-3 xl:gap-16" style={{ wordBreak: 'break-word', overflow: 'hidden' }}>
            {processedSections.map((section) => {
              if (section.type === 'content') {
                return (
                  <div 
                    key={section.index}
                    className="prose prose-lg prose-blue mb-8 lg:mb-12 break-inside-avoid prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-800 prose-strong:text-gray-900 prose-ul:text-gray-800 prose-ol:text-gray-800 prose-code:bg-gray-800 prose-code:text-white prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-800 prose-pre:text-white prose-h2:break-after-avoid prose-h3:break-after-avoid prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap"
                    style={{ 
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word', 
                      hyphens: 'auto',
                      maxWidth: '100%',
                      minWidth: 0,
                      overflow: 'hidden'
                    }}
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
