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
  Tag,
  ArrowRight,
  PhoneCall,
  ChevronRight,
  Share2,
  Check,
  Lightbulb,
  Sparkles,
  Info
} from 'lucide-react';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function renderFormattedInline(text: string) {
  // Simple regex parser for **bold** and *italic*
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Pattern for **bold** or *italic*
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
        <strong key={key++} className="font-bold text-[#04092b]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={key++} className="italic">
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

  // Render markdown content blocks identically to admin reader preview
  const paragraphs = post.content.split(/\n\n+/);

  return (
    <div className="max-w-[960px] mx-auto space-y-10">
      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e2ddd3] pb-4">
        <div className="flex items-center gap-2 text-[12.5px] text-[#6e706a]">
          <Link href="/" className="hover:text-[#04092b] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#04092b] transition-colors">
            Tin tức & Góc nhìn chuyên gia
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#c5a26c] font-medium truncate max-w-[240px] sm:max-w-none">
            {post.category}
          </span>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#04092b] hover:text-[#c5a26c] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Danh sách bài viết
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="inline-block bg-[#04092b] text-white text-[11px] font-semibold uppercase tracking-widest px-3.5 py-1 shadow-sm font-accent">
          {post.category}
        </div>

        <h1 className="text-[32px] sm:text-[42px] lg:text-[48px] font-medium text-[#04092b] font-display leading-[1.25]">
          {post.title}
        </h1>

        {/* Author Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#6e706a] pt-3 pb-4 border-y border-[#e2ddd3]">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#04092b] text-[#c5a26c] flex items-center justify-center font-bold text-[12px] shadow-xs">
                {post.author ? post.author.charAt(0) : 'Đ'}
              </div>
              <div>
                <span className="text-[#04092b] font-semibold block leading-tight">{post.author}</span>
                {post.authorRole && <span className="text-[11px] text-gray-500 block">{post.authorRole}</span>}
              </div>
            </div>

            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#c5a26c]" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#c5a26c]" />
              {post.readingTime}
            </span>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-white hover:bg-[#04092b] text-[#04092b] hover:text-white border border-[#e2ddd3] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span>Đã sao chép link!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#c5a26c]" />
                <span>Chia sẻ bài viết</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] overflow-hidden bg-[#04092b] border border-[#e2ddd3] shadow-lg">
        <Image
          src={post.featuredImage || '/uploads/figma_styles_grid.png'}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Excerpt Lead */}
      {post.excerpt && (
        <div className="bg-white p-6 sm:p-8 border-l-4 border-[#c5a26c] shadow-sm text-[16.5px] sm:text-[17.5px] text-[#1a1b18] italic leading-relaxed font-serif">
          &ldquo;{post.excerpt}&rdquo;
        </div>
      )}

      {/* Body Content Blocks */}
      <div className="bg-white p-8 sm:p-12 border border-[#e2ddd3] shadow-sm space-y-6 text-[16px] sm:text-[17px] text-[#1a1b18] leading-[1.85] font-light max-w-none">
        {paragraphs.map((para, idx) => {
          const trimmed = para.trim();
          if (!trimmed) return null;

          // Heading 1
          if (trimmed.startsWith('# ')) {
            return (
              <h1 key={idx} className="text-[28px] sm:text-[34px] font-bold text-[#04092b] font-display pt-6 pb-2 border-b border-[#e2ddd3]">
                {trimmed.replace('# ', '')}
              </h1>
            );
          }

          // Heading 2
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-[24px] sm:text-[28px] font-bold text-[#04092b] font-display pt-6 pb-2 border-b border-[#e2ddd3]">
                {trimmed.replace('## ', '')}
              </h2>
            );
          }

          // Heading 3
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-[19px] sm:text-[21px] font-semibold text-[#04092b] font-display pt-4">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }

          // Callout Box (> 💡 or > ⚠️ or > 📌)
          if (trimmed.startsWith('> 💡') || trimmed.startsWith('> ⚠️') || trimmed.startsWith('> 📌')) {
            const cleanContent = trimmed.replace(/^>\s*/gm, '');
            return (
              <div key={idx} className="p-5 sm:p-6 bg-amber-50/90 border border-amber-200 text-amber-950 rounded-xl my-6 text-[14.5px] sm:text-[15px] leading-relaxed shadow-xs flex items-start gap-3.5">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">{renderFormattedInline(cleanContent)}</div>
              </div>
            );
          }

          // Hotline CTA Box (> 📞)
          if (trimmed.startsWith('> 📞')) {
            const cleanContent = trimmed.replace(/^>\s*/gm, '').replace('📞', '').trim();
            return (
              <div key={idx} className="p-6 sm:p-7 bg-[#04092b] text-white rounded-2xl my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xl border border-[#c5a26c]/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#c5a26c] text-[12px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Tư Vấn Trực Tiếp Từ Xưởng Sản Xuất</span>
                  </div>
                  <p className="text-[15px] text-white font-medium">{renderFormattedInline(cleanContent)}</p>
                </div>
                <a
                  href="tel:0906499279"
                  className="bg-[#c5a26c] hover:bg-white text-[#04092b] px-6 py-3 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>0906.499.279</span>
                </a>
              </div>
            );
          }

          // Standard Quote (> )
          if (trimmed.startsWith('> ')) {
            const cleanQuote = trimmed.replace(/^>\s*/gm, '');
            return (
              <blockquote key={idx} className="border-l-4 border-[#c5a26c] bg-[#f4f1ea]/60 p-5 my-5 italic text-[#04092b] font-medium text-[16px] sm:text-[17px] rounded-r-xl leading-relaxed">
                {renderFormattedInline(cleanQuote)}
              </blockquote>
            );
          }

          // Divider (---)
          if (trimmed.startsWith('---')) {
            return <hr key={idx} className="border-t border-[#e2ddd3] my-8" />;
          }

          // Image Figure (![alt](url))
          if (trimmed.startsWith('![') && trimmed.includes('](')) {
            const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
            if (match) {
              const alt = match[1];
              const src = match[2];
              return (
                <figure key={idx} className="my-8 space-y-2.5">
                  <div className="relative w-full h-[280px] sm:h-[420px] rounded-xl overflow-hidden shadow-md bg-[#04092b] border border-[#e2ddd3]">
                    <Image src={src} alt={alt || post.title} fill className="object-cover" />
                  </div>
                  {alt && (
                    <figcaption className="text-center text-[12.5px] text-[#6e706a] italic">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              );
            }
          }

          // Unordered list
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const items = trimmed.split('\n').map((li) => li.replace(/^[-*]\s*/, ''));
            return (
              <ul key={idx} className="space-y-2.5 pl-2 text-[#1a1b18] my-4">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a26c] mt-2.5 shrink-0" />
                    <span>{renderFormattedInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          }

          // Ordered list
          if (/^\d+\.\s/.test(trimmed)) {
            const items = trimmed.split('\n').map((li) => li.replace(/^\d+\.\s*/, ''));
            return (
              <ol key={idx} className="space-y-3 pl-2 text-[#1a1b18] my-4">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#04092b] text-[#c5a26c] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{renderFormattedInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          }

          // Standard paragraph
          return (
            <p key={idx} className="leading-[1.85] text-[#1a1b18]">
              {renderFormattedInline(trimmed)}
            </p>
          );
        })}
      </div>

      {/* Tags & Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 border border-[#e2ddd3] shadow-sm">
        {post.tags && post.tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-[#c5a26c]" />
            <span className="text-[13px] font-semibold text-[#04092b] mr-1">Chủ đề:</span>
            {post.tags.map((t, idx) => (
              <span
                key={idx}
                className="bg-[#f4f1ea] border border-[#e2ddd3] px-3 py-1 text-[12px] text-[#6e706a]"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : <div />}

        <a
          href="/#contact"
          className="inline-flex items-center gap-2 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] px-6 py-3 text-[12.5px] font-semibold uppercase tracking-wider transition-colors shadow"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Tư Vấn Thiết Kế Không Gian</span>
        </a>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="space-y-6 pt-10">
          <div className="flex items-center gap-3">
            <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
            <h3 className="text-[20px] font-semibold text-[#04092b] uppercase tracking-wider font-accent">
              BÀI VIẾT LIÊN QUAN
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <article
                key={rPost.id}
                className="bg-white border border-[#e2ddd3] hover:border-[#c5a26c] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative w-full h-[180px] overflow-hidden bg-[#04092b]">
                    <Image
                      src={rPost.featuredImage || '/uploads/figma_styles_grid.png'}
                      alt={rPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#04092b] text-white text-[10px] font-semibold uppercase px-2.5 py-0.5">
                      {rPost.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] text-[#6e706a]">{rPost.publishedAt}</span>
                    <Link href={`/blog/${rPost.slug}`}>
                      <h4 className="text-[16px] font-medium text-[#04092b] font-display group-hover:text-[#c5a26c] transition-colors leading-snug line-clamp-2">
                        {rPost.title}
                      </h4>
                    </Link>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#04092b] group-hover:text-[#c5a26c] transition-colors"
                  >
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}