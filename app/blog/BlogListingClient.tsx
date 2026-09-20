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

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, [initialPosts]);

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
    <div className="max-w-[1440px] mx-auto space-y-14">
      {/* Breadcrumbs & Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-xs text-charcoal-muted font-sans"
        >
          <Link href="/" className="hover:text-charcoal transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gold font-medium">Tin tức & Góc nhìn chuyên gia</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-charcoal tracking-tight leading-tight"
        >
          Tin Tức & Phân Tích Thị Trường
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-charcoal-600 font-normal max-w-2xl mx-auto leading-relaxed pt-1"
        >
          Cập nhật diễn biến thị trường bất động sản cao cấp, phân tích tiềm năng quy hoạch hạ tầng và cẩm nang tích sản an toàn.
        </motion.p>
      </div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white border border-warm-200 p-4 sm:p-5 rounded-2xl shadow-warm-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4"
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
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 uppercase tracking-wider ${
                  active
                    ? 'bg-charcoal text-white shadow-warm-sm'
                    : 'bg-warm-100 text-charcoal-700 hover:text-charcoal hover:bg-warm-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] sm:w-[320px]">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo chủ đề, từ khóa..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-warm-300 text-xs focus:outline-none focus:border-gold bg-warm-50 text-charcoal placeholder-charcoal-muted transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Active Results Summary */}
      {(selectedCategory !== 'all' || searchQuery) && (
        <div className="flex items-center justify-between text-xs text-charcoal-muted px-1">
          <span>
            Tìm thấy <strong className="text-charcoal">{filteredPosts.length}</strong> bài viết phù hợp
          </span>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-gold hover:underline font-medium text-xs cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Featured Highlight Post */}
      {featuredPost && (
        <motion.article
          key={featuredPost.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-warm-200 hover:border-gold/60 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 overflow-hidden group rounded-3xl"
        >
          <div className="relative lg:col-span-7 h-[280px] sm:h-[380px] lg:h-auto min-h-[340px] overflow-hidden bg-warm-100">
            <Image
              src={featuredPost.featuredImage || '/uploads/clean_project_thegio.png'}
              alt={featuredPost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-gold text-[10.5px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-warm-200 flex items-center gap-1.5 shadow-warm-sm">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>{featuredPost.category}</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {featuredPost.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  {featuredPost.readingTime}
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-serif text-charcoal group-hover:text-gold transition-colors leading-snug">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-sm text-charcoal-600 leading-relaxed font-normal line-clamp-4">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-warm-200 flex items-center justify-between text-xs">
              <span className="text-charcoal-muted">
                Tác giả: <strong className="text-charcoal font-semibold">{featuredPost.author}</strong>
              </span>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-charcoal group-hover:text-gold transition-colors"
              >
                <span>Đọc bài viết</span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.article>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-warm-200 hover:border-gold/60 transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden group shadow-warm-sm hover:shadow-warm-md"
            >
              <div>
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-warm-100">
                  <Image
                    src={post.featuredImage || '/uploads/clean_project_thegio.png'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-gold text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-warm-200">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-charcoal-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {post.readingTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-serif text-charcoal group-hover:text-gold transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-[13px] text-charcoal-600 line-clamp-3 leading-relaxed font-normal pt-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-warm-100 flex items-center justify-between text-xs font-semibold text-charcoal group-hover:text-gold transition-colors uppercase tracking-wider">
                <span>Đọc chi tiết</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
