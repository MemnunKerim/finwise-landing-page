import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
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

    return {
      slug,
      title,
      date: data.date || '2025-05-27',
      excerpt,
      content: contentHtml,
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