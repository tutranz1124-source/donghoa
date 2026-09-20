'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { BlogPost, BlogFeedBlock } from '@/lib/types';

interface BlogFeedSectionProps {
  block?: BlogFeedBlock;
  posts?: BlogPost[];
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Xu Hướng Bất Động Sản Ven Sông & Không Gian Sống Xanh 2026',
    slug: 'xu-huong-bat-dong-san-ven-song-2026',
    category: 'Phân Tích Thị Trường',
    excerpt: 'Đánh giá tiềm năng gia tăng giá trị của các dự án ven sông tại TP. Hồ Chí Minh và khu đô thị vệ tinh trong chu kỳ mới.',
    content: 'Đánh giá chi tiết về xu hướng bất động sản ven sông...',
    author: 'Đông Hòa Research',
    tags: ['Thị trường 2026', 'Ven sông', 'Quy hoạch'],
    featuredImage: '/uploads/clean_project_thegio.png',
    publishedAt: '2026-03-15',
    readingTime: '5 phút đọc',
    status: 'published',
  },
  {
    id: 'post-2',
    title: 'Những Lưu Ý Pháp Lý Then Chốt Khi Mua Căn Hộ Hình Thành Trong Tương Lai',
    slug: 'luu-y-phap-ly-can-ho-hinh-thanh-trong-tuong-lai',
    category: 'Cẩm Nang Pháp Lý',
    excerpt: 'Rà soát giấy phép xây dựng, điều kiện bán hàng và cam kết bảo lãnh ngân hàng giúp người mua đảm bảo an toàn quyền lợi.',
    content: 'Hướng dẫn các bước rà soát pháp lý dự án...',
    author: 'Chuyên Viên Pháp Lý',
    tags: ['Pháp lý', 'Căn hộ', 'Thủ tục'],
    featuredImage: '/uploads/clean_project_vingroup.png',
    publishedAt: '2026-03-10',
    readingTime: '6 phút đọc',
    status: 'published',
  },
  {
    id: 'post-3',
    title: 'Kinh Nghiệm Hoạch Định Tài Chính Khi Đầu Tư Nhà Phố Thương Mại',
    slug: 'hoach-dinh-tai-chinh-nha-pho-thuong-mai',
    category: 'Chiến Lược Đầu Tư',
    excerpt: 'Cách tính toán tỷ suất sinh lời cho thuê thực tế và cân đối tỷ lệ đòn bẩy vay vốn an toàn.',
    content: 'Phân tích dòng tiền và đòn bẩy tài chính...',
    author: 'Ban Tư Vấn Đầu Tư',
    tags: ['Đầu tư', 'Tài chính', 'Shophouse'],
    featuredImage: '/uploads/clean_project_alora.png',
    publishedAt: '2026-03-05',
    readingTime: '4 phút đọc',
    status: 'published',
  },
];

export default function BlogFeedSection({ block, posts }: BlogFeedSectionProps) {
  const displayPosts = posts && posts.length > 0 ? posts.slice(0, 3) : DEFAULT_POSTS;

  return (
    <section id="blog" className="py-20 sm:py-28 bg-white border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
              GÓC NHÌN CHUYÊN GIA
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2]">
              Tin Tức & Phân Tích Thị Trường
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-gold transition-colors group"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between bg-warm-50 rounded-2xl overflow-hidden border border-warm-200 hover:border-gold/60 transition-all duration-300 shadow-warm-sm hover:shadow-warm-md"
            >
              <div className="relative h-56 w-full overflow-hidden bg-warm-100">
                <Image
                  src={post.featuredImage || '/uploads/clean_project_thegio.png'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10.5px] font-semibold uppercase tracking-wider text-gold border border-warm-200">
                  {post.category || 'Tin tức'}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime || '5 phút đọc'}</span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-charcoal group-hover:text-gold transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-[13px] text-charcoal-600 line-clamp-2 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-warm-200 flex items-center justify-between text-xs font-semibold text-charcoal group-hover:text-gold transition-colors">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
