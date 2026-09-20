'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ChevronRight,
  Share2,
  Check,
} from 'lucide-react';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function renderFormattedInline(text: string) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={key++} className="font-semibold text-charcoal">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={key++} className="italic text-charcoal-700">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const paragraphs = post.content.split(/\n\n+/);

  return (
    <div className="max-w-[960px] mx-auto space-y-12">
      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-warm-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-charcoal-muted">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-charcoal transition-colors">
            Tin tức & thị trường
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gold font-medium truncate max-w-[240px] sm:max-w-none">
            {post.category}
          </span>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-gold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tất cả bài viết</span>
        </Link>
      </div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-muted">
          <span className="bg-gold text-white font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            {post.publishedAt}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold" />
            {post.readingTime}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-gold" />
            {post.author}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-charcoal leading-tight tracking-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-charcoal-600 font-normal leading-relaxed border-l-2 border-gold pl-4 sm:pl-6 italic">
          {post.excerpt}
        </p>
      </motion.div>

      {/* Featured Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative w-full aspect-[16/9] max-h-[520px] rounded-3xl overflow-hidden bg-warm-100 border border-warm-200 shadow-warm-md"
      >
        <Image
          src={post.featuredImage || '/uploads/clean_project_thegio.png'}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Main Content Body */}
      <article className="space-y-6 text-base text-charcoal-700 leading-relaxed font-normal">
        {paragraphs.map((para, idx) => {
          const trimmed = para.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('## ')) {
            return (
              <h2
                key={idx}
                className="text-2xl sm:text-3xl font-serif text-charcoal font-medium pt-6 pb-2 border-b border-warm-200"
              >
                {trimmed.replace(/^##\s+/, '')}
              </h2>
            );
          }

          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-serif text-charcoal font-semibold pt-4">
                {trimmed.replace(/^###\s+/, '')}
              </h3>
            );
          }

          if (trimmed.startsWith('> ')) {
            return (
              <blockquote
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-warm-50 border-l-4 border-gold text-charcoal-800 italic my-4"
              >
                {trimmed.replace(/^>\s+/, '')}
              </blockquote>
            );
          }

          return (
            <p key={idx} className="leading-relaxed">
              {renderFormattedInline(trimmed)}
            </p>
          );
        })}
      </article>

      {/* Tags & Social Share */}
      <div className="pt-8 border-t border-warm-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags &&
            post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-warm-100 text-charcoal-700 text-xs font-medium px-3 py-1 rounded-md border border-warm-200"
              >
                #{tag}
              </span>
            ))}
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-warm-100 hover:bg-warm-200 text-charcoal text-xs font-semibold uppercase tracking-wider transition-all self-start sm:self-auto cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Đã sao chép liên kết</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-gold" />
              <span>Chia sẻ bài viết</span>
            </>
          )}
        </button>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-14 border-t border-warm-200 space-y-6">
          <h3 className="text-2xl font-serif text-charcoal font-medium">Bài Viết Liên Quan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rPost, idx) => (
              <Link
                key={rPost.id || idx}
                href={`/blog/${rPost.slug}`}
                className="group bg-white border border-warm-200 rounded-2xl overflow-hidden hover:border-gold/60 transition-all p-4 space-y-3 shadow-warm-sm hover:shadow-warm-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-warm-100">
                  <Image
                    src={rPost.featuredImage || '/uploads/clean_project_thegio.png'}
                    alt={rPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-sm font-serif text-charcoal group-hover:text-gold transition-colors line-clamp-2 leading-snug font-medium">
                  {rPost.title}
                </h4>
                <p className="text-xs text-charcoal-600 line-clamp-2 font-normal">{rPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}