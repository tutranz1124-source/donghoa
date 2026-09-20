'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Search,
  BookOpen,
  Sparkles,
  X,
  User
} from 'lucide-react';

interface BlogListingClientProps {
  initialPosts: BlogPost[];
}

export default function BlogListingClient({ initialPosts }: BlogListingClientProps) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(() => searchParams.get('q') || searchParams.get('search') || '');

  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    const c = searchParams.get('category');
    if (c !== null) setSelectedCategory(c);
  }, [searchParams]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, [initialPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchCategory =
        selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts.find(p => p.featured) || (filteredPosts.length > 0 ? filteredPosts[0] : null);
  const regularPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="max-w-[1280px] mx-auto space-y-12">
      {/* Breadcrumbs & Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-[12px] text-[#6e706a]"
        >
          <Link href="/" className="hover:text-[#04092b] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#c5a26c] font-medium">Tin tức & Góc nhìn chuyên gia</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[34px] sm:text-[46px] lg:text-[52px] font-medium italic text-[#04092b] font-display tracking-tight leading-tight"
        >
          TIN TỨC & GÓC NHÌN CHUYÊN GIA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[15px] sm:text-[16px] text-[#6e706a] font-light max-w-2xl mx-auto leading-relaxed"
        >
          Chia sẻ kinh nghiệm thiết kế không gian sống, cẩm nang chọn vật liệu cao cấp, tối ưu chi phí thi công và xu hướng kiến trúc nội thất độc bản.
        </motion.p>
      </div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white border border-[#e2ddd3] p-4 sm:p-5 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4"
      >
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const label = cat === 'all' ? 'Tất cả bài viết' : cat;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition-all duration-200 uppercase tracking-wider ${
                  active
                    ? 'bg-[#04092b] text-white shadow'
                    : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b] hover:bg-[#e8e2d4]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] sm:w-[320px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo chủ đề, từ khóa..."
            className="w-full pl-10 pr-9 py-2 border border-[#e2ddd3] text-[13px] focus:outline-none focus:border-[#c5a26c] bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Active Results Summary */}
      {(selectedCategory !== 'all' || searchQuery) && (
        <div className="flex items-center justify-between text-[13px] text-[#6e706a] px-1">
          <span>
            Tìm thấy <strong>{filteredPosts.length}</strong> bài viết phù hợp
          </span>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-[#a70c0c] hover:underline font-medium text-[12px]"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="bg-white border border-[#e2ddd3] p-16 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-[#c5a26c] mx-auto stroke-1" />
          <h3 className="text-[20px] font-semibold text-[#04092b] font-display">
            Không tìm thấy bài viết phù hợp
          </h3>
          <p className="text-[14px] text-[#6e706a] max-w-md mx-auto">
            Không có kết quả nào cho tiêu chí tìm kiếm của bạn. Hãy thử từ khóa khác hoặc xem tất cả danh mục.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] px-6 py-2.5 text-[12px] font-semibold uppercase tracking-wider transition-colors inline-block"
          >
            Xem tất cả bài viết
          </button>
        </div>
      )}

      {/* Featured Highlight Post (Spotlight) */}
      {featuredPost && (
        <motion.article
          key={featuredPost.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#e2ddd3] hover:border-[#c5a26c] shadow-md hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 overflow-hidden group"
        >
          {/* Image */}
          <div className="relative lg:col-span-7 h-[280px] sm:h-[380px] lg:h-auto min-h-[320px] overflow-hidden bg-[#04092b]">
            <Image
              src={featuredPost.featuredImage || '/uploads/figma_styles_grid.png'}
              alt={featuredPost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute top-4 left-4 bg-[#04092b] text-white text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3 h-3 text-[#c5a26c]" />
              <span>Tiêu điểm: {featuredPost.category}</span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#6e706a]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a26c]" />
                  {featuredPost.publishedAt}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#c5a26c]" />
                  {featuredPost.readingTime}
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`}>
                <h2 className="text-[22px] sm:text-[28px] font-medium text-[#04092b] font-display group-hover:text-[#c5a26c] transition-colors leading-snug">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-[14px] sm:text-[15px] text-[#6e706a] leading-relaxed font-light line-clamp-4">
                {featuredPost.excerpt}
              </p>

              {featuredPost.tags && featuredPost.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {featuredPost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f4f1ea] text-[#04092b] text-[11px] font-medium px-2.5 py-1 border border-[#e2ddd3]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#e2ddd3] flex items-center justify-between">
              <span className="text-[13px] text-[#6e706a]">Tác giả: <strong className="text-[#04092b]">{featuredPost.author}</strong></span>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-[#04092b] group-hover:text-[#c5a26c] transition-colors"
              >
                <span>Đọc bài viết</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.article>
      )}

      {/* Subgrid of Regular Posts */}
      {regularPosts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#04092b] uppercase tracking-wider font-accent">
              BÀI VIẾT MỚI NHẤT
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {regularPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border border-[#e2ddd3] hover:border-[#c5a26c] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative w-full h-[230px] overflow-hidden bg-[#04092b]">
                      <Image
                        src={post.featuredImage || '/uploads/figma_styles_grid.png'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-[#04092b] text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 shadow">
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
                        <h3 className="text-[19px] font-medium text-[#04092b] font-display group-hover:text-[#c5a26c] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-[13.5px] text-[#6e706a] line-clamp-3 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#e2ddd3]/60 mt-4 flex items-center justify-between">
                    <span className="text-[12px] text-[#6e706a] flex items-center gap-1">
                      <User className="w-3 h-3 text-[#c5a26c]" />
                      {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-[#04092b] group-hover:text-[#c5a26c] transition-colors"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
