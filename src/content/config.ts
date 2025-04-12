import { z, defineCollection } from 'astro:content';

// Define the blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic metadata
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    
    // Hero image
    hero: z.object({
      image: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }),
    
    // Author information
    author: z.object({
      name: z.string(),
      avatar: z.string().optional(),
      bio: z.string().optional(),
    }),
    
    // Categories and tags for better organization and filtering
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    
    // Post status for draft/published management
    status: z.enum(['draft', 'published', 'archived']),
    
    // SEO and social sharing
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
      ogImage: z.string().optional(),
    }).optional(),
    
    // Reading time estimate (in minutes)
    readingTime: z.number().optional(),
    
    // Featured post flag
    featured: z.boolean().default(false),
    
    // Custom ordering if needed
    order: z.number().optional(),
  }),
});

// Export the collections
export const collections = {
  'blog': blogCollection,
};