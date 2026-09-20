'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Tag, Clock, Sparkles } from 'lucide-react';
import { BlogPost } from '@/lib/types';

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

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  // Keyboard shortcut (Ctrl+K or Cmd+K) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) fetchPostsIfNeeded();
          return !prev;
        });
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasFetched]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

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

  const SUGGESTED_KEYWORDS = ['Penthouse', 'Biệt thự biển', 'Vinhomes', 'Đầu tư 2026', 'Masterise'];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectPost = (slug: string) => {
    setIsOpen(false);
    router.push(`/blog/${slug}`);
  };

  const handleSelectTag = (tag: string) => {
    setIsOpen(false);
    router.push(`/blog?q=${encodeURIComponent(tag)}`);
  };

  // Mobile Drawer embedded mode
  if (isMobileDrawer) {
    return (
      <div className="w-full space-y-2">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus-within:border-[#C5A880] transition-all">
            <Search className="w-4 h-4 text-[#C5A880] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchPostsIfNeeded();
              }}
              onFocus={fetchPostsIfNeeded}
              placeholder="Tìm kiếm dự án, tin tức..."
              className="w-full bg-transparent text-[13px] text-white placeholder-white/40 focus:outline-none"
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
          <div className="max-h-[220px] overflow-y-auto divide-y divide-white/10 bg-[#080C16] rounded-lg p-2 border border-white/10">
            {searchResults.length > 0 ? (
              searchResults.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleSelectPost(post.slug)}
                  className="py-2 flex items-center gap-2.5 cursor-pointer hover:bg-white/5 px-2 rounded transition-colors"
                >
                  <div className="relative w-10 h-10 rounded overflow-hidden bg-black/30 shrink-0">
                    <Image src={post.featuredImage || '/uploads/hero_slide_1.png'} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9.5px] font-bold text-[#C5A880] uppercase block">{post.category}</span>
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

  return (
    <>
      {/* Sleek Minimalist Trigger Button for Desktop & Mobile Header */}
      <button
        type="button"
        onClick={() => {
          fetchPostsIfNeeded();
          setIsOpen(true);
        }}
        className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A880]/50 text-white/70 hover:text-[#C5A880] transition-all duration-300 group ${className}`}
        title="Tìm kiếm (Ctrl+K)"
        aria-label="Mở tìm kiếm"
      >
        <Search className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
      </button>

      {/* Luxury Search Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-[#080C16] border border-[#C5A880]/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200 divide-y divide-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <form onSubmit={handleSubmit} className="flex items-center px-5 py-4 gap-3 bg-white/[0.02]">
              <Search className="w-5 h-5 text-[#C5A880] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm dự án, phân khúc, tin tức thị trường..."
                className="w-full bg-transparent text-[15px] text-white placeholder-white/40 focus:outline-none tracking-wide"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="text-white/40 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2.5 py-1 text-[11px] uppercase tracking-wider text-white/50 hover:text-white border border-white/10 rounded-md transition-colors"
              >
                ESC
              </button>
            </form>

            {/* Suggestions or Results */}
            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
              {!query.trim() && (
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#C5A880] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chủ đề & Từ khóa gợi ý</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_KEYWORDS.map((kw, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setQuery(kw);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C5A880]/15 border border-white/10 hover:border-[#C5A880]/40 text-[12.5px] text-white/80 hover:text-white transition-colors"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[11.5px] text-white/40 block">
                      Nhấn Enter để tìm kiếm hoặc chọn trực tiếp kết quả bên dưới.
                    </span>
                  </div>
                </div>
              )}

              {query.trim() && matchingTags.length > 0 && (
                <div className="flex items-center gap-2 pb-2">
                  <Tag className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span className="text-[11px] text-white/50 shrink-0">Thẻ liên quan:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchingTags.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectTag(t)}
                        className="px-2.5 py-0.5 bg-[#C5A880]/10 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#060913] text-[11.5px] font-medium rounded transition-colors"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && (
                <div className="space-y-2">
                  {isLoading ? (
                    <div className="py-8 text-center text-[13px] text-white/50">
                      <div className="w-5 h-5 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      Đang tìm kiếm...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => handleSelectPost(post.slug)}
                        className="group p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer flex gap-3.5 items-center border border-transparent hover:border-white/10"
                      >
                        <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-black/40 shrink-0 border border-white/10">
                          <Image
                            src={post.featuredImage || '/uploads/hero_slide_1.png'}
                            alt=""
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wide">
                              {post.category}
                            </span>
                            {post.readingTime && (
                              <span className="text-[10px] text-white/40 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> {post.readingTime}
                              </span>
                            )}
                          </div>
                          <h4 className="text-[13.5px] font-semibold text-white group-hover:text-[#C5A880] transition-colors line-clamp-1">
                            {post.title}
                          </h4>
                          {post.excerpt && (
                            <p className="text-[12px] text-white/50 line-clamp-1 mt-0.5">{post.excerpt}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center space-y-1">
                      <p className="text-[13.5px] text-white/70">
                        Không tìm thấy kết quả phù hợp cho &quot;{query}&quot;
                      </p>
                      <p className="text-[12px] text-white/40">
                        Thử tìm với từ khóa dự án, phong cách hoặc địa điểm.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-white/[0.02] flex items-center justify-between px-5">
              <span className="text-[11px] text-white/40">
                Tìm kiếm thông minh trên Đông Hòa Property
              </span>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#C5A880] hover:text-white transition-colors"
              >
                <span>Xem tất cả kết quả</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
