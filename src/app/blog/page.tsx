/* blog liste sayfası */
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "PaletDepo Blog",
  description: "Palet depolama ve fulfillment dünyasından ipuçları",
  alternates: {
    canonical: "https://www.paletdepo.com/blog",
  },
};

// Blog list sayfası için JSON-LD Schema
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "PaletDepo Blog",
  "description": "Palet depolama, lojistik ve fulfillment dünyasından ipuçları, stratejiler ve uzman tavsiyeleri",
  "url": "https://www.paletdepo.com/blog",
  "publisher": {
    "@type": "Organization",
    "name": "PaletDepo - Memnun Depo Nakliyat Lojistik",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.paletdepo.com/images/logo.png"
    }
  },
  "inLanguage": "tr-TR",
  "about": {
    "@type": "Thing",
    "name": "Palet Depolama ve Lojistik"
  }
};

export default async function BlogHome() {
  const posts = await getAllBlogPosts();

  const breadcrumbItems = [
    { name: 'Blog', href: '/blog', current: true }
  ];

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4">
      {/* JSON-LD Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      <h1 className="text-4xl font-bold text-center mb-16">Blog</h1>

      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col lg:flex-row gap-6 lg:gap-8 group">
            {/* Thumbnail Image */}
            <div className="lg:w-80 lg:flex-shrink-0">
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.heroImage.src}
                  alt={post.heroImage.alt}
                  width={320}
                  height={200}
                  quality={90}
                  className="w-full h-48 lg:h-40 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                />
              </Link>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl lg:text-3xl font-semibold">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="hover:text-primary transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("tr-TR")}
              </p>
              
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-primary hover:text-primary-accent font-medium transition-colors duration-200"
              >
                Devamını oku 
                <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
