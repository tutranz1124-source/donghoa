import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteContent, getBlogPostBySlug, getBlogPosts } from '@/lib/storage';
import BlogPostClient from './BlogPostClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Bài viết không tìm thấy | Đông Hòa Design' };

  return {
    title: `${post.seoTitle || post.title} | Đông Hòa Design`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage || '/uploads/figma_styles_grid.png' }]
    }
  };
}

export default function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const content = getSiteContent();
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getBlogPosts().filter((p) => p.status === 'published' && p.slug !== post.slug);
  const relatedPosts = allPosts.slice(0, 3);

  return (
    <>
      <Navbar settings={content.settings} />
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-8 lg:px-20 bg-[#f4f1ea]">
        <BlogPostClient post={post} relatedPosts={relatedPosts} />
      </main>
      <Footer settings={content.settings} />
    </>
  );
}