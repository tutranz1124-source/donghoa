'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Tag, BookOpen, Clock, Sparkles } from 'lucide-react';
import { BlogPost } from '@/lib/types';

// Utility for accent-insensitive search in Vietnamese
function removeVietnameseTones(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

interface HeaderSearchBarProps {
  className?: string;
  isMobileDrawer?: boolean;
}

export default function HeaderSearchBar({ className = '', isMobileDrawer = false }: HeaderSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Lazily fetch published posts when search is focused
  const fetchPostsIfNeeded = async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/posts?status=published');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
          setHasFetched(true);
        }
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoading(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter posts based on query
  const searchResults = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const normalizedQuery = removeVietnameseTones(q);

    return posts.filter((post) => {
      const normTitle = removeVietnameseTones(post.title || '');
      const normCat = removeVietnameseTones(post.category || '');
      const normExcerpt = removeVietnameseTones(post.excerpt || '');
      const normTags = (post.tags || []).map((t) => removeVietnameseTones(t));

      return (
        normTitle.includes(normalizedQuery) ||
        normCat.includes(normalizedQuery) ||
        normExcerpt.includes(normalizedQuery) ||
        normTags.some((t) => t.includes(normalizedQuery))
      );
    });
  }, [query, posts]);

  // Extract matching tags
  const matchingTags = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const normalizedQuery = removeVietnameseTones(q);
    const tagSet = new Set<string>();

    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        if (removeVietnameseTones(tag).includes(normalizedQuery)) {
          tagSet.add(tag);
        }
      });
    });

    return Array.from(tagSet).slice(0, 4);
  }, [query, posts]);

  // Suggested keywords when focused with empty query
  const SUGGESTED_KEYWORDS = ['Hiện đại', 'Văn phòng', 'Thi công', 'Vật liệu cao cấp', 'Penthouse'];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    setMobileSearchOpen(false);
    router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectPost = (slug: string) => {
    setIsOpen(false);
    setMobileSearchOpen(false);
    router.push(`/blog/${slug}`);
  };

  const handleSelectTag = (tag: string) => {
    setIsOpen(false);
    setMobileSearchOpen(false);
    router.push(`/blog?q=${encodeURIComponent(tag)}`);
  };

  // Drawer mode (inside mobile hamburger menu)
  if (isMobileDrawer) {
    return (
      <div className="w-full space-y-2">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl bg-white/10 border border-[#c5a26c]/40 focus-within:border-[#c5a26c] focus-within:bg-black/30 transition-all">
            <Search className="w-4 h-4 text-[#c5a26c] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchPostsIfNeeded();
              }}
              onFocus={fetchPostsIfNeeded}
              placeholder="Tìm bài viết, phong cách, từ khóa..."
              className="w-full bg-transparent text-[13px] text-white placeholder-white/50 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-white/50 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {query.trim() && (
          <div className="max-h-[220px] overflow-y-auto divide-y divide-white/10 bg-black/40 rounded-xl p-2 border border-white/10">
            {searchResults.length > 0 ? (
              searchResults.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleSelectPost(post.slug)}
                  className="py-2 flex items-center gap-2.5 cursor-pointer hover:bg-white/10 px-2 rounded-lg transition-colors"
                >
                  <div className="relative w-10 h-10 rounded-md overflow-hidden bg-black/30 shrink-0">
                    <Image src={post.featuredImage || '/uploads/figma_styles_grid.png'} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9.5px] font-bold text-[#c5a26c] uppercase block">{post.category}</span>
                    <p className="text-[12px] font-semibold text-white truncate">{post.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[11.5px] text-white/50 text-center py-2">Không tìm thấy bài viết</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: NAVBAR SEARCH BAR (DESKTOP + MOBILE ICON TRIGGER)
  // -------------------------------------------------------------
  return (
    <>
      {/* DESKTOP SEARCH BAR (>= lg) */}
      <div ref={containerRef} className={`relative hidden lg:block ${className}`}>
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ease-out ${
              isOpen
                ? 'w-64 xl:w-72 bg-[#04092b] border-[#c5a26c] shadow-[0_0_15px_rgba(197,162,108,0.25)] ring-1 ring-[#c5a26c]/50'
                : 'w-36 xl:w-44 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/40'
            }`}
          >
            <Search
              className={`w-3.5 h-3.5 shrink-0 transition-all duration-300 ${
                isOpen ? 'text-[#c5a26c] scale-110' : 'text-white/60 group-hover:text-white'
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => {
                fetchPostsIfNeeded();
                setIsOpen(true);
              }}
              placeholder="Tìm bài viết..."
              className="w-full bg-transparent text-[12.5px] text-white placeholder-white/40 focus:outline-none tracking-wide"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="text-white/40 hover:text-white transition-colors shrink-0 p-0.5"
                title="Xóa tìm kiếm"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </form>

        {/* DESKTOP DROPDOWN RESULTS OVERLAY */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 xl:w-96 bg-[#04092b]/95 backdrop-blur-xl border border-[#c5a26c]/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-white/10">
            {/* Header Status */}
            <div className="px-4 py-2.5 bg-white/5 flex items-center justify-between text-[11px] text-white/60">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3 h-3 text-[#c5a26c]" />
                {query.trim() ? `Kết quả cho "${query}"` : 'Gợi ý tìm kiếm'}
              </span>
              {query.trim() && (
                <span className="font-mono text-[#c5a26c]">{searchResults.length} bài</span>
              )}
            </div>

            {/* Content: Empty query suggestions */}
            {!query.trim() && (
              <div className="p-4 space-y-2.5">
                <span className="text-[11px] font-bold text-[#c5a26c] uppercase tracking-wider block">
                  Chủ đề phổ biến:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_KEYWORDS.map((kw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setQuery(kw);
                        inputRef.current?.focus();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#c5a26c]/20 border border-white/10 hover:border-[#c5a26c]/50 text-[11.5px] text-white/80 hover:text-white transition-colors"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Tags (if query present) */}
            {query.trim() && matchingTags.length > 0 && (
              <div className="px-4 py-2 bg-black/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <Tag className="w-3 h-3 text-[#c5a26c] shrink-0" />
                <span className="text-[10.5px] text-white/50 shrink-0">Thẻ:</span>
                {matchingTags.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectTag(t)}
                    className="px-2 py-0.5 bg-white/10 hover:bg-[#c5a26c] hover:text-[#04092b] text-[11px] text-white/80 rounded transition-colors whitespace-nowrap"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            )}

            {/* Matching Posts List */}
            {query.trim() && (
              <div className="max-h-[320px] overflow-y-auto divide-y divide-white/5 p-1 scrollbar-thin">
                {isLoading ? (
                  <div className="py-6 text-center text-[12px] text-white/50">
                    <div className="w-4 h-4 border-2 border-[#c5a26c] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Đang tìm kiếm...
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handleSelectPost(post.slug)}
                      className="group p-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer flex gap-3 items-center"
                    >
                      <div className="relative w-14 h-12 rounded-lg overflow-hidden bg-black/30 shrink-0 border border-white/10">
                        <Image
                          src={post.featuredImage || '/uploads/figma_styles_grid.png'}
                          alt=""
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-[#c5a26c] uppercase">
                            {post.category}
                          </span>
                          {post.readingTime && (
                            <span className="text-[9.5px] text-white/40 flex items-center gap-0.5 font-mono">
                              <Clock className="w-2.5 h-2.5" /> {post.readingTime}
                            </span>
                          )}
                        </div>
                        <h5 className="text-[12.5px] font-semibold text-white group-hover:text-[#c5a26c] transition-colors line-clamp-1 leading-snug">
                          {post.title}
                        </h5>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 px-4 text-center space-y-1">
                    <p className="text-[12.5px] text-white/70">
                      Không tìm thấy bài viết phù hợp cho &quot;{query}&quot;
                    </p>
                    <p className="text-[11px] text-white/40">
                      Thử tìm với từ khóa ngắn hơn như: <em>hiện đại, gỗ, thi công, văn phòng</em>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Footer Quick Action */}
            <div className="p-2.5 bg-white/5 text-center">
              <Link
                href={query.trim() ? `/blog?q=${encodeURIComponent(query.trim())}` : '/blog'}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 text-[11.5px] font-bold text-[#c5a26c] hover:text-white transition-colors"
              >
                <span>Xem tất cả bài viết trên Blog</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE SEARCH TRIGGER BUTTON (In Navbar < lg)                   */}
      {/* ------------------------------------------------------------- */}
      <button
        type="button"
        onClick={() => {
          fetchPostsIfNeeded();
          setMobileSearchOpen(!mobileSearchOpen);
          setTimeout(() => {
            mobileInputRef.current?.focus();
          }, 150);
        }}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full text-white/80 hover:text-[#c5a26c] hover:bg-white/10 transition-colors"
        title="Tìm kiếm bài viết"
        aria-label="Mở tìm kiếm"
      >
        <Search className="w-4 h-4 text-[#c5a26c]" />
      </button>

      {/* MOBILE SLIDE-DOWN SEARCH OVERLAY (< lg) */}
      {mobileSearchOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[70px] bg-[#04092b]/98 backdrop-blur-xl border-b border-[#c5a26c]/30 shadow-2xl p-4 z-50 animate-in slide-in-from-top-3 duration-200 space-y-3">
          <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
            <div className="relative flex-1 flex items-center bg-white/10 border border-[#c5a26c]/60 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-[#c5a26c] shrink-0 mr-2" />
              <input
                ref={mobileInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm bài viết, phong cách, từ khóa..."
                className="w-full bg-transparent text-[13px] text-white placeholder-white/50 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-white/50 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="px-3 py-2 text-[12px] font-bold text-white/70 hover:text-white rounded-xl bg-white/5"
            >
              Đóng
            </button>
          </form>

          {/* Quick suggestions when query empty */}
          {!query.trim() && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10.5px] font-bold text-[#c5a26c] uppercase tracking-wider block">
                Chủ đề gợi ý:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_KEYWORDS.map((kw, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setQuery(kw);
                      mobileInputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11.5px] text-white/80"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Search Results */}
          {query.trim() && (
            <div className="max-h-[50vh] overflow-y-auto divide-y divide-white/10 space-y-2 pt-1">
              {matchingTags.length > 0 && (
                <div className="flex items-center gap-1.5 pb-2 overflow-x-auto scrollbar-none">
                  <Tag className="w-3 h-3 text-[#c5a26c] shrink-0" />
                  {matchingTags.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectTag(t)}
                      className="px-2 py-0.5 bg-white/10 text-[11px] text-white rounded whitespace-nowrap"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              )}

              {searchResults.length > 0 ? (
                searchResults.slice(0, 4).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleSelectPost(post.slug)}
                    className="pt-2 flex gap-3 items-center active:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-black/30 shrink-0 border border-white/10">
                      <Image
                        src={post.featuredImage || '/uploads/figma_styles_grid.png'}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#c5a26c] uppercase block">
                        {post.category}
                      </span>
                      <h5 className="text-[13px] font-semibold text-white line-clamp-1 leading-snug">
                        {post.title}
                      </h5>
                      <span className="text-[10px] text-white/50 font-mono">
                        {post.readingTime || '5 phút đọc'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-[12.5px] text-white/60">
                  Không tìm thấy bài viết cho &quot;{query}&quot;
                </div>
              )}

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-2 bg-[#c5a26c] text-[#04092b] text-[12px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Xem tất cả kết quả trên Blog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
