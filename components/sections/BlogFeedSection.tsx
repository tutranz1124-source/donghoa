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
    <section id="blog-feed" className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-20 bg-[#f4f1ea] border-b border-[#e2ddd3]">
      <div className="max-w-[1440px] mx-auto space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#e2ddd3] pb-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
              <span className="text-[11.5px] sm:text-[12px] font-bold text-[#6e706a] uppercase tracking-widest font-accent">
                {block?.badge || 'TIN TỨC & GÓC NHÌN CHUYÊN GIA'}
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold text-[#04092b] font-display uppercase tracking-tight leading-tight">
              {block?.title || 'XU HƯỚNG BẤT ĐỘNG SẢN & KIẾN TRÚC'}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#6e706a] font-light leading-relaxed">
              {block?.subtitle ||
                'Chia sẻ diễn biến thị trường, phân tích đầu tư bất động sản và cẩm nang kiến tạo không gian sống thượng lưu.'}
            </p>
          </div>

          <Link
            href={block?.buttonUrl || '/blog'}
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#04092b] hover:text-[#c5a26c] transition-colors self-start sm:self-auto"
          >
            <span>{block?.buttonLabel || 'XEM TẤT CẢ BÀI VIẾT'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayPosts.map((post, idx) => (
            <motion.article
              key={post.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-[#e2ddd3] hover:border-[#c5a26c] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group rounded-lg"
            >
              <div>
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#04092b]">
                  <Image
                    src={post.featuredImage || '/uploads/figma_styles_grid.png'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#04092b]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center gap-4 text-[11.5px] text-[#6e706a]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#c5a26c]" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c5a26c]" />
                      {post.readingTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#04092b] font-display group-hover:text-[#c5a26c] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-[13px] text-[#5f6361] line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-[#e2ddd3]/60 mt-3 flex items-center justify-between">
                <span className="text-[11.5px] text-[#6e706a]">
                  Tác giả: <strong className="text-[#04092b]">{post.author}</strong>
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-wider text-[#04092b] group-hover:text-[#c5a26c] transition-colors"
                >
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
