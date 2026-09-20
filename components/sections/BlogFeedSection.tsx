'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost, BlogFeedBlock } from '@/lib/types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogFeedSectionProps {
  block?: BlogFeedBlock;
  posts?: BlogPost[];
}

export default function BlogFeedSection({ block, posts }: BlogFeedSectionProps) {
  const displayPosts = (posts || []).filter((p) => p.status === 'published').slice(0, block?.maxPosts || 3);

  if (displayPosts.length === 0) return null;

  return (
    <section id="blog-feed" className="w-full py-24 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-24 bg-[#080C16] text-white border-t border-white/5 relative">
      <div className="max-w-[1440px] mx-auto space-y-16 lg:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-[0.25em] font-sans block">
              {block?.badge || 'TIN TỨC & GÓC NHÌN CHUYÊN GIA'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight tracking-tight">
              {block?.title || 'Xu Hướng Bất Động Sản & Thị Trường'}
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880]" />
            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed pt-1">
              {block?.subtitle ||
                'Chia sẻ diễn biến thị trường, phân tích đầu tư bất động sản và cẩm nang kiến tạo danh mục tài sản sinh lời bền vững.'}
            </p>
          </div>

          <Link
            href={block?.buttonUrl || '/blog'}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-white hover:text-[#C5A880] transition-colors self-start sm:self-auto border border-white/20 hover:border-[#C5A880] px-5 py-3 rounded-sm"
          >
            <span>{block?.buttonLabel || 'XEM TẤT CẢ BÀI VIẾT'}</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </Link>
        </div>

        {/* 3-Column Blog Cards Grid with Large Breathing Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayPosts.map((post, idx) => (
            <motion.article
              key={post.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/[0.02] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-2xl"
            >
              <div>
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/50">
                  <Image
                    src={post.featuredImage || '/uploads/figma_styles_grid.png'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C16] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      {post.readingTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-serif text-white group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-white/55 line-clamp-3 leading-relaxed font-light pt-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-7 py-5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-[#C5A880] transition-colors uppercase tracking-wider">
                <span>Đọc chi tiết</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
