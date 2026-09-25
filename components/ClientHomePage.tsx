'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/sections/HeroBanner';
import PhilosophySection from '@/components/sections/PhilosophySection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import { SiteContentData, BlogPost } from '@/lib/types';

// Dynamic imports for below-the-fold heavy components (bandwidth & JS bundle optimization)
const PrivateAccessSection = dynamic(() => import('@/components/sections/PrivateAccessSection'), {
  ssr: true,
  loading: () => <div className="py-12" />
});

const MortgageCalculatorSection = dynamic(() => import('@/components/sections/MortgageCalculatorSection'), {
  ssr: true,
  loading: () => <div className="py-12" />
});

const MilestonesSection = dynamic(() => import('@/components/sections/MilestonesSection'), {
  ssr: true,
  loading: () => <div className="py-12" />
});

const BlogFeedSection = dynamic(() => import('@/components/sections/BlogFeedSection'), {
  ssr: true,
  loading: () => <div className="py-12" />
});

const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then((mod) => mod.FAQSection), {
  ssr: true,
  loading: () => <div className="py-12" />
});

const QuoteContactSection = dynamic(() => import('@/components/sections/QuoteContactSection'), {
  ssr: true,
  loading: () => <div className="py-12" />
});

const InquiryModal = dynamic(() => import('@/components/InquiryModal'), {
  ssr: false
});

export default function ClientHomePage({ initialContent }: { initialContent: SiteContentData }) {
  const [content, setContent] = useState<SiteContentData>(initialContent);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (projectName?: string) => {
    setSelectedProject(projectName);
    setInquiryModalOpen(true);
  };

  useEffect(() => {
    // 1. Instant check from localStorage
    try {
      const stored = localStorage.getItem('donghoa_site_content');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setContent(parsed);
        }
      }
    } catch (e) {}

    // 2. Fetch fresh content from API
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object' && !data.error) {
          setContent(data);
          try {
            localStorage.setItem('donghoa_site_content', JSON.stringify(data));
          } catch (e) {}
        }
      })
      .catch(() => {});

    // 3. Fetch published blog posts
    fetch('/api/posts?status=published')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch(() => {});

    // 4. Real-time BroadcastChannel sync
    let bc: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        bc = new BroadcastChannel('donghoa_content_sync');
        bc.onmessage = (ev) => {
          if (ev.data && typeof ev.data === 'object') {
            setContent(ev.data);
          }
        };
      }
    } catch (e) {}

    // 5. Storage event listener
    const handleStorage = (ev: StorageEvent) => {
      if (ev.key === 'donghoa_site_content' && ev.newValue) {
        try {
          const parsed = JSON.parse(ev.newValue);
          if (parsed && typeof parsed === 'object') {
            setContent(parsed);
          }
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      if (bc) bc.close();
    };
  }, []);

  const settings = content.settings;
  const enabled = settings?.theme?.enabledSections || {
    hero: true,
    philosophy: true,
    categories: true,
    projects: true,
    privateAccess: true,
    mortgage: true,
    milestones: true,
    blogFeed: true,
    faq: true,
    contact: true,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-charcoal selection:bg-gold selection:text-white">
      {/* 1. HEADER NAVIGATION */}
      <Navbar settings={settings} onOpenInquiry={handleOpenInquiry} />

      <main className="flex-1">
        {/* 2. HERO BANNER */}
        {enabled.hero !== false && (
          <HeroBanner data={content.hero} onOpenInquiry={handleOpenInquiry} />
        )}

        {/* 3. VỀ CHÚNG TÔI & TRIẾT LÝ TƯ VẤN */}
        {enabled.philosophy !== false && (
          <PhilosophySection data={content.philosophy} />
        )}

        {/* 4. PHÂN KHÚC BẤT ĐỘNG SẢN (EDITORIAL 01-04) */}
        {enabled.categories !== false && (
          <CategoriesSection
            data={content.categories}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {/* 5. DANH MỤC DỰ ÁN TRỌNG ĐIỂM (HIERARCHY + REAL FILTER) */}
        {enabled.projects !== false && (
          <ProjectsSection
            block={content.projects}
            selectedCategory={selectedCategory}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {/* 6. PRIVATE PROPERTY ACCESS */}
        {enabled.privateAccess !== false && (
          <PrivateAccessSection data={content.privateAccess} onOpenInquiry={handleOpenInquiry} />
        )}

        {/* 7. CÔNG CỤ TÍNH TOÁN DÒNG TIỀN VAY */}
        {enabled.mortgage !== false && (
          <MortgageCalculatorSection data={content.mortgage} onOpenInquiry={handleOpenInquiry} />
        )}

        {/* 8. NĂNG LỰC & ĐỐI TÁC PHÁT TRIỂN */}
        {enabled.milestones !== false && (
          <MilestonesSection data={content.milestones} />
        )}

        {/* 9. TIN TỨC & GÓC NHÌN THỊ TRƯỜNG */}
        {enabled.blogFeed !== false && (
          <BlogFeedSection block={content.blogFeed} posts={posts} />
        )}

        {/* 10. HỎI ĐÁP QUY TRÌNH & PHÁP LÝ (3 CÂU HỎI) */}
        {enabled.faq !== false && (
          <FAQSection data={content.faq} />
        )}

        {/* 11. LIÊN HỆ CHUYÊN VIÊN TƯ VẤN */}
        {enabled.contact !== false && (
          <QuoteContactSection data={content.contact} />
        )}
      </main>

      {/* 12. FOOTER */}
      <Footer settings={settings} />

      {/* GLOBAL INQUIRY MODAL */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => {
          setInquiryModalOpen(false);
          setSelectedProject(undefined);
        }}
        defaultProject={selectedProject}
        hotline={settings?.hotline || '0906.499.279'}
      />
    </div>
  );
}
