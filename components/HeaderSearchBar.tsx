'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Building2, BookOpen, MapPin, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { BlogPost, ProjectItem } from '@/lib/types';

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

const POPULAR_SEARCHES = [
  'The Gió Riverside',
  'Vinhomes Cần Giờ',
  'Grand Marina',
  'Căn hộ cao cấp',
  'Biệt thự ven sông',
  'Nghỉ dưỡng',
];

export default function HeaderSearchBar({ className = '', isMobileDrawer = false }: HeaderSearchBarProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'posts'>('all');
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchIndexIfNeeded = async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      const [postsRes, projectsRes] = await Promise.all([
        fetch('/api/posts?status=published').catch(() => null),
        fetch('/api/projects').catch(() => null),
      ]);

      if (postsRes && postsRes.ok) {
        const postsData = await postsRes.json();
        if (Array.isArray(postsData)) setPosts(postsData);
      }

      if (projectsRes && projectsRes.ok) {
        const projData = await projectsRes.json();
        if (projData?.projects && Array.isArray(projData.projects)) {
          setProjects(projData.projects);
        }
      }
      setHasFetched(true);
    } catch {
      // Graceful fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) fetchIndexIfNeeded();
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Multi-domain search matching
  const filteredProjects = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const normQ = removeVietnameseTones(q);

    return projects.filter((p) => {
      const normName = removeVietnameseTones(p.name || p.title || '');
      const normDev = removeVietnameseTones(p.developer || p.investor || '');
      const normLoc = removeVietnameseTones(p.location || '');
      const normCat = removeVietnameseTones(p.category || '');
      const normDesc = removeVietnameseTones(p.description || '');

      return (
        normName.includes(normQ) ||
        normDev.includes(normQ) ||
        normLoc.includes(normQ) ||
        normCat.includes(normQ) ||
        normDesc.includes(normQ)
      );
    });
  }, [query, projects]);

  const filteredPosts = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const normQ = removeVietnameseTones(q);

    return posts.filter((post) => {
      const normTitle = removeVietnameseTones(post.title || '');
      const normCat = removeVietnameseTones(post.category || '');
      const normExcerpt = removeVietnameseTones(post.excerpt || '');
      const normTags = (post.tags || []).map((t) => removeVietnameseTones(t));

      return (
        normTitle.includes(normQ) ||
        normCat.includes(normQ) ||
        normExcerpt.includes(normQ) ||
        normTags.some((t) => t.includes(normQ))
      );
    });
  }, [query, posts]);

  const totalResults = filteredProjects.length + filteredPosts.length;

  const handleSelectProject = (project: ProjectItem) => {
    setIsOpen(false);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#projects');
    }
  };

  const handleSelectPost = (slug: string) => {
    setIsOpen(false);
    router.push(`/blog/${slug}`);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
  };

  // Mobile Drawer Inline Search Mode
  if (isMobileDrawer) {
    return (
      <div className="w-full space-y-2">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 focus-within:border-gold transition-all">
            <Search className="w-4 h-4 text-gold shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchIndexIfNeeded();
              }}
              onFocus={fetchIndexIfNeeded}
              placeholder="Tìm kiếm dự án, bài viết..."
              className="w-full bg-transparent text-[13.5px] text-white placeholder-white/50 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-white/60 hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {query.trim() && (
          <div className="max-h-[260px] overflow-y-auto divide-y divide-white/10 bg-[#161A22] rounded-xl p-2 border border-white/15 shadow-lg">
            {filteredProjects.length > 0 && (
              <div className="py-1">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider px-2 block mb-1">Dự án</span>
                {filteredProjects.slice(0, 3).map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => handleSelectProject(proj)}
                    className="py-1.5 px-2 flex items-center gap-2.5 cursor-pointer hover:bg-white/5 rounded transition-colors"
                  >
                    <div className="relative w-9 h-9 rounded bg-white/10 shrink-0 overflow-hidden">
                      <Image src={proj.imageUrl || proj.image || '/uploads/the-gio-riverside.png'} alt="" fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white truncate">{proj.title || proj.name}</p>
                      <span className="text-[10px] text-gold">{proj.priceRange || 'Liên hệ'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredPosts.length > 0 && (
              <div className="py-1">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider px-2 block mb-1">Bài viết</span>
                {filteredPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleSelectPost(post.slug)}
                    className="py-1.5 px-2 flex items-center gap-2.5 cursor-pointer hover:bg-white/5 rounded transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-white/90 truncate">{post.title}</p>
                      <span className="text-[10px] text-white/50">{post.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProjects.length === 0 && filteredPosts.length === 0 && (
              <p className="text-[11px] text-white/50 text-center py-3">Không tìm thấy kết quả phù hợp</p>
            )}
          </div>
        )}
      </div>
    );
  }

  const modalPortal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 sm:pt-28 px-4 sm:px-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md z-0"
          />

          {/* Spotlight Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-10 border border-warm-300 flex flex-col max-h-[80vh] my-0"
          >
            {/* Search Bar Input Header */}
            <div className="relative flex items-center px-5 sm:px-6 py-4 border-b border-warm-200 bg-warm-50/80">
              <Search className="w-5 h-5 text-gold shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm dự án, phân khúc, tin tức thị trường..."
                className="w-full bg-transparent text-base sm:text-[16px] text-charcoal placeholder-charcoal-muted focus:outline-none font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="text-charcoal-muted hover:text-charcoal p-1.5 rounded-full hover:bg-warm-200 transition-colors mr-2 cursor-pointer"
                  aria-label="Xóa nội dung"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-charcoal-muted hover:text-charcoal bg-warm-200/80 hover:bg-warm-300 rounded-md transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Filter Tabs (when searching) */}
            {query.trim() && (
              <div className="flex items-center gap-1.5 px-5 sm:px-6 py-2.5 border-b border-warm-100 bg-white">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-charcoal text-white shadow-sm'
                      : 'text-charcoal-600 hover:text-charcoal hover:bg-warm-100'
                  }`}
                >
                  Tất cả ({totalResults})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-charcoal text-white shadow-sm'
                      : 'text-charcoal-600 hover:text-charcoal hover:bg-warm-100'
                  }`}
                >
                  Dự án ({filteredProjects.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('posts')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'posts'
                      ? 'bg-charcoal text-white shadow-sm'
                      : 'text-charcoal-600 hover:text-charcoal hover:bg-warm-100'
                  }`}
                >
                  Tin tức ({filteredPosts.length})
                </button>
              </div>
            )}

            {/* Search Results / Suggestion Body */}
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[55vh] space-y-6">
              {/* 1. Empty Query: Show popular searches */}
              {!query.trim() && (
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dự án & Tìm kiếm phổ biến</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setQuery(item);
                          inputRef.current?.focus();
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-warm-50 hover:bg-warm-100 border border-warm-200 text-xs font-medium text-charcoal-700 hover:text-charcoal hover:border-gold/50 transition-all cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Loading State */}
              {query.trim() && isLoading && (
                <div className="py-12 text-center text-xs text-charcoal-muted">
                  <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Đang tìm kiếm dự án & bài viết...
                </div>
              )}

              {/* 3. Results Display */}
              {query.trim() && !isLoading && (
                <>
                  {/* Projects Section */}
                  {(activeTab === 'all' || activeTab === 'projects') && filteredProjects.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-gold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Dự án bất động sản ({filteredProjects.length})</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {filteredProjects.map((proj) => (
                          <div
                            key={proj.id}
                            onClick={() => handleSelectProject(proj)}
                            className="group p-3 rounded-2xl bg-warm-50 hover:bg-warm-100/80 border border-warm-200 hover:border-gold/50 transition-all cursor-pointer flex gap-3 items-center shadow-warm-sm"
                          >
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-warm-200 shrink-0">
                              <Image
                                src={proj.imageUrl || proj.image || '/uploads/the-gio-riverside.png'}
                                alt={proj.title || proj.name || 'Dự án'}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-gold uppercase block">
                                {proj.investor || proj.developer || 'Chủ đầu tư uy tín'}
                              </span>
                              <h4 className="text-sm font-serif font-semibold text-charcoal truncate group-hover:text-gold transition-colors">
                                {proj.title || proj.name}
                              </h4>
                              <div className="flex items-center gap-1 text-[11px] text-charcoal-muted truncate mt-0.5">
                                <MapPin className="w-3 h-3 text-gold shrink-0" />
                                <span className="truncate">{proj.location}</span>
                              </div>
                              <span className="text-xs font-bold text-charcoal mt-1 block">
                                {proj.priceRange || proj.price || 'Liên hệ'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blog Posts Section */}
                  {(activeTab === 'all' || activeTab === 'posts') && filteredPosts.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-gold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Tin tức & Thị trường ({filteredPosts.length})</span>
                        </span>
                      </div>
                      <div className="space-y-2">
                        {filteredPosts.map((post) => (
                          <div
                            key={post.id}
                            onClick={() => handleSelectPost(post.slug)}
                            className="group p-3 rounded-2xl hover:bg-warm-50 border border-transparent hover:border-warm-200 transition-all cursor-pointer flex gap-3.5 items-center"
                          >
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-warm-100 shrink-0 border border-warm-200">
                              <Image
                                src={post.featuredImage || '/uploads/vinhomes-can-gio.png'}
                                alt=""
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-bold text-gold uppercase tracking-wide">
                                  {post.category}
                                </span>
                                {post.readingTime && (
                                  <span className="text-[10px] text-charcoal-muted flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" /> {post.readingTime}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-[13.5px] font-medium text-charcoal group-hover:text-gold transition-colors line-clamp-1">
                                {post.title}
                              </h4>
                              {post.excerpt && (
                                <p className="text-[11.5px] text-charcoal-muted line-clamp-1 mt-0.5">{post.excerpt}</p>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-charcoal-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Zero Results State */}
                  {totalResults === 0 && (
                    <div className="py-12 text-center space-y-2">
                      <p className="text-sm font-medium text-charcoal">
                        Không tìm thấy kết quả phù hợp cho &ldquo;{query}&rdquo;
                      </p>
                      <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                        Quý khách vui lòng thử tìm kiếm theo tên dự án (The Gió, Grand Marina, Vinhomes), địa điểm hoặc loại hình căn hộ/biệt thự.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer Helper */}
            <div className="px-6 py-3 bg-warm-50 border-t border-warm-200 flex items-center justify-between text-xs text-charcoal-muted">
              <span>Đông Hòa Property • Hệ thống tìm kiếm bất động sản chọn lọc</span>
              {query.trim() && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 font-semibold text-gold hover:text-charcoal transition-colors cursor-pointer"
                >
                  <span>Xem tất cả bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Desktop Luxury Search Trigger Pill */}
      <button
        type="button"
        onClick={() => {
          fetchIndexIfNeeded();
          setIsOpen(true);
        }}
        className={`hidden lg:flex items-center justify-between gap-2.5 px-3.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-gold/50 text-white/70 hover:text-white transition-all duration-200 text-xs font-normal cursor-pointer w-44 xl:w-56 shadow-sm group select-none ${className}`}
        title="Tìm kiếm dự án & tin tức (Ctrl+K)"
        aria-label="Mở tìm kiếm"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Search className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform shrink-0" />
          <span className="truncate text-[12.5px] text-white/70 group-hover:text-white">Tìm kiếm dự án...</span>
        </div>
        <kbd className="hidden xl:inline-flex items-center text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/50 font-mono border border-white/10 shrink-0">
          ⌘K
        </kbd>
      </button>

      {/* Mobile Glass Round Icon */}
      <button
        type="button"
        onClick={() => {
          fetchIndexIfNeeded();
          setIsOpen(true);
        }}
        className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-gold hover:text-white transition-all duration-200 cursor-pointer"
        title="Tìm kiếm"
        aria-label="Mở tìm kiếm"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Render Dialog in Body Portal to prevent Header Stacking Context clipping */}
      {mounted && typeof document !== 'undefined' ? createPortal(modalPortal, document.body) : null}
    </>
  );
}
