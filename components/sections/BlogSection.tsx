'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogFeedBlock, BlogPost } from '@/lib/types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogSectionProps {
  block: BlogFeedBlock;
  posts: BlogPost[];
}

export default function BlogSection({ block, posts }: BlogSectionProps) {
  const displayPosts = (posts || []).slice(0, block.maxPosts || 3);

  return (
    <section id="blog" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-20 bg-[#f4f1ea]">
      <div className="max-w-[1280px] mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-4 h-[1px] bg-[#c5a26c]" />
              <span className="text-[12px] font-semibold text-[#a70c0c] uppercase tracking-widest font-accent">
                {block.badge || 'TIN TỨC & GÓC NHÌN'}
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-medium italic text-[#04092b] font-display">
              {block.title || 'XU HƯỚNG & CẨM NANG THIẾT KẾ NỘI THẤT'}
            </h2>
            {block.subtitle && (
              <p className="text-[15px] text-[#6e706a] font-light">
                {block.subtitle}
              </p>
            )}
          </div>

          <Link
            href={block.buttonUrl || '/blog'}
            className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-[#04092b] hover:text-[#c5a26c] transition-colors"
          >
            <span>{block.buttonLabel || 'XEM TẤT CẢ BÀI VIẾT'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post, idx) => (
            <motion.article
              key={post.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white border border-[#e2ddd3] hover:border-[#c5a26c] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image */}
                <div className="relative w-full h-[220px] overflow-hidden bg-[#04092b]">
                  <Image
                    src={post.featuredImage || '/uploads/anara-binh-tien.png'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#04092b] text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[12px] text-[#6e706a]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a26c]" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c5a26c]" />
                      {post.readingTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-[18px] sm:text-[20px] font-medium text-[#04092b] font-display group-hover:text-[#c5a26c] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-[13px] sm:text-[14px] text-[#6e706a] line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-[#04092b] group-hover:text-[#c5a26c] transition-colors"
                >
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
