import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { blogPosts } from '@/data/blogPosts';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  sections: BlogSection[];
  heroImage: {
    src: string;
    alt: string;
  };
}

export interface BlogSection {
  type: 'content' | 'image';
  content: string;
  imageSrc?: string;
  imageAlt?: string;
  imageAtRight?: boolean;
}

export interface ProcessedBlogSection extends BlogSection {
  index: number;
  processedContent?: string;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = [];
  
  for (const post of blogPosts) {
    const fullPost = await getBlogPost(post.slug);
    if (fullPost) {
      posts.push(fullPost);
    }
  }
  
  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process markdown content to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // Extract first paragraph as excerpt if not provided
    const excerpt = data.excerpt || extractExcerpt(content);

    // Extract title from first heading if not in frontmatter
    const title = data.title || extractTitle(content);

    // Create sections with dummy images
    const sections = createBlogSections(content, slug);

    // Get hero image for this post
    const heroImage = getHeroImageForPost(slug);

    return {
      slug,
      title,
      date: data.date || '2025-05-27',
      excerpt,
      content: contentHtml,
      sections,
      heroImage,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

function extractTitle(content: string): string {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1] : 'Blog Post';
}

function extractExcerpt(content: string): string {
  // Remove the title (first line starting with #)
  const contentWithoutTitle = content.replace(/^#\s+.+$/m, '').trim();
  
  // Get the first paragraph
  const firstParagraph = contentWithoutTitle.split('\n\n')[0];
  
  // Clean up markdown formatting and limit length
  const cleanText = firstParagraph
    .replace(/[#*`]/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim();
    
  return cleanText.length > 200 
    ? cleanText.substring(0, 200) + '...'
    : cleanText;
}

function createBlogSections(content: string, slug: string): BlogSection[] {
  const sections: BlogSection[] = [];
  
  // Split content by main headings (##)
  const parts = content.split(/(?=^##\s)/m);
  
  // Define dummy images for different posts
  const dummyImages = getDummyImagesForPost(slug);
  let imageIndex = 0;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;
    
    // Add content section
    sections.push({
      type: 'content',
      content: part
    });
    
    // Add image section after every 2-3 content sections (but not after the last one)
    if (i > 0 && i < parts.length - 1 && (i + 1) % 3 === 0 && imageIndex < dummyImages.length) {
      sections.push({
        type: 'image',
        content: '',
        imageSrc: dummyImages[imageIndex].src,
        imageAlt: dummyImages[imageIndex].alt,
        imageAtRight: imageIndex % 2 === 1
      });
      imageIndex++;
    }
  }
  
  return sections;
}

function getDummyImagesForPost(slug: string): Array<{src: string, alt: string}> {
  // Return different dummy images based on the post
  const baseImages = [
    { src: '/images/warehouse-hero.webp', alt: 'Depo operasyonları' },
    { src: '/images/service-digital.jpg', alt: 'Dijital çözümler' },
    { src: '/images/service-handling.jpg', alt: 'Palet taşıma' },
    { src: '/images/service-unitload.jpg', alt: 'Birim yük operasyonları' }
  ];
  
  if (slug.includes('wms')) {
    return [
      { src: '/images/service-digital.jpg', alt: 'WMS teknolojisi' },
      { src: '/images/warehouse-hero.webp', alt: 'Otomatik depo sistemleri' },
      { src: '/images/service-handling.jpg', alt: 'Stok takip sistemleri' }
    ];
  } else if (slug.includes('maliyet')) {
    return [
      { src: '/images/service-unitload.jpg', alt: 'Maliyet optimizasyonu' },
      { src: '/images/warehouse-hero.webp', alt: 'Verimli depolama' },
      { src: '/images/service-digital.jpg', alt: 'Akıllı çözümler' }
    ];
  } else if (slug.includes('fulfillment')) {
    return [
      { src: '/images/service-handling.jpg', alt: 'E-ticaret lojistiği' },
      { src: '/images/service-digital.jpg', alt: 'Fulfillment teknolojisi' },
      { src: '/images/warehouse-hero.webp', alt: 'Hızlı teslimat' }
    ];
  }
  
  return baseImages.slice(0, 3);
}

function getHeroImageForPost(slug: string): {src: string, alt: string} {
  if (slug.includes('wms')) {
    return { 
      src: '/images/blog-WMSEntegrasyonuStokTakibi.png', 
      alt: 'WMS Entegrasyonu ve Canlı Stok Takibi' 
    };
  } else if (slug.includes('maliyet')) {
    return { 
      src: '/images/blog-DepolamaMaliyetiOptimizasyonu.png', 
      alt: 'Palet Depolama Maliyeti Optimizasyonu' 
    };
  } else if (slug.includes('fulfillment')) {
    return { 
      src: '/images/blog-FulfillmentDepoSecimi.png', 
      alt: 'E-ticarette Fulfillment ve Depo Seçimi' 
    };
  }
  
  return { 
    src: '/images/warehouse-hero.webp', 
    alt: 'Depo ve Lojistik Operasyonları' 
  };
}