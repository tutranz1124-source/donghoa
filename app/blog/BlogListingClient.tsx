'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
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
  User,
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

  const featuredPost = filteredPosts.find((p) => p.featured) || (filteredPosts.length > 0 ? filteredPosts[0] : null);
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="max-w-[1440px] mx-auto space-y-16">
      {/* Breadcrumbs & Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-xs text-white/50 font-sans"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#C5A880] font-medium">Tin tức & Góc nhìn thị trường</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight leading-tight"
        >
          Tin Tức & Góc Nhìn Chuyên Gia
        </motion.h1>

        <div className="w-12 h-0.5 bg-[#C5A880] mx-auto" />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-white/65 font-light max-w-2xl mx-auto leading-relaxed pt-1"
        >
          Cập nhật diễn biến thị trường bất động sản cao cấp, phân tích tiềm năng quy hoạch hạ tầng và cẩm nang tích sản an toàn, bền vững.
        </motion.p>
      </div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white/[0.02] border border-white/10 p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur-md space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4"
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
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 uppercase tracking-wider ${
                  active
                    ? 'bg-[#C5A880] text-[#060913] shadow-md'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] sm:w-[320px]">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo chủ đề, từ khóa..."
            className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#C5A880] bg-white/5 text-white placeholder-white/40 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Active Results Summary */}
      {(selectedCategory !== 'all' || searchQuery) && (
        <div className="flex items-center justify-between text-xs text-white/60 px-1">
          <span>
            Tìm thấy <strong className="text-white">{filteredPosts.length}</strong> bài viết phù hợp
          </span>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-[#C5A880] hover:underline font-medium text-xs cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-16 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-[#C5A880] mx-auto stroke-1" />
          <h3 className="text-xl font-serif text-white">
            Không tìm thấy bài viết phù hợp
          </h3>
          <p className="text-xs text-white/60 max-w-md mx-auto font-light">
            Không có kết quả nào cho tiêu chí tìm kiếm của bạn. Hãy thử từ khóa khác hoặc xem tất cả danh mục.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 bg-[#C5A880] hover:bg-white text-[#060913] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all inline-block cursor-pointer"
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
          className="bg-white/[0.02] border border-white/10 hover:border-[#C5A880]/50 shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 overflow-hidden group rounded-2xl"
        >
          {/* Image */}
          <div className="relative lg:col-span-7 h-[280px] sm:h-[380px] lg:h-auto min-h-[340px] overflow-hidden bg-black/50">
            <Image
              src={featuredPost.featuredImage || '/uploads/figma_styles_grid.png'}
              alt={featuredPost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent opacity-80" />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Tiêu điểm: {featuredPost.category}</span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  {featuredPost.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  {featuredPost.readingTime}
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light line-clamp-4">
                {featuredPost.excerpt}
              </p>

              {featuredPost.tags && featuredPost.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {featuredPost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white/5 text-[#C5A880] text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/50">
                Tác giả: <strong className="text-white font-normal">{featuredPost.author}</strong>
              </span>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-white group-hover:text-[#C5A880] transition-colors"
              >
                <span>Đọc bài viết</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.article>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pt-4">
          {regularPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white/[0.02] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-2xl"
            >
              <div>
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/50">
                  <Image
                    src={post.featuredImage || '/uploads/figma_styles_grid.png'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15">
                    {post.category}
                  </div>
                </div>

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
      )}
    </div>
  );
}
