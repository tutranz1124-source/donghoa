'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/sections/HeroBanner';
import ProjectsSection from '@/components/sections/ProjectsSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import QuoteContactSection from '@/components/sections/QuoteContactSection';
import StylesOverviewSection from '@/components/sections/StylesOverviewSection';
import ModernMinimalistSection from '@/components/sections/ModernMinimalistSection';
import CozyWarmSection from '@/components/sections/CozyWarmSection';
import LuxuryClassicSection from '@/components/sections/LuxuryClassicSection';
import HeritageRetroSection from '@/components/sections/HeritageRetroSection';
import OfficeSection from '@/components/sections/OfficeSection';
import BlogFeedSection from '@/components/sections/BlogFeedSection';
import InquiryModal from '@/components/InquiryModal';
import { SiteContentData, BlogPost } from '@/lib/types';

export default function ClientHomePage({ initialContent }: { initialContent: SiteContentData }) {
  const [content, setContent] = useState<SiteContentData>(initialContent);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (projectName?: string) => {
    setSelectedProject(projectName);
    setInquiryModalOpen(true);
  };

  useEffect(() => {
    // 1. Instant check from localStorage for immediate reflection when admin saves
    try {
      const stored = localStorage.getItem('donghoa_site_content');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setContent(parsed);
        }
      }
    } catch (e) {
      // ignore
    }

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

    // 4. Real-time BroadcastChannel sync across tabs/windows
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

    // 5. Storage event listener for multi-tab sync
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

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f1ea] selection:bg-[#c5a26c] selection:text-[#04092b]">
      {/* 1. HEADER NAVIGATION */}
      <Navbar settings={settings} onOpenInquiry={handleOpenInquiry} />

      <main className="flex-1">
        {/* 2. HERO BANNER */}
        <HeroBanner data={content.hero} />

        {/* 3. DANH MỤC DỰ ÁN TIÊU BIỂU */}
        <ProjectsSection
          block={content.projects}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 4. TẦM NHÌN VÀ SỨ MỆNH */}
        <PhilosophySection data={content.philosophy} />

        {/* 5. PHONG CÁCH THIẾT KẾ (4 CARDS OVERVIEW) */}
        <StylesOverviewSection data={content.stylesOverview} />

        {/* 6. MODERN & MINIMALIST STAGE */}
        <ModernMinimalistSection
          data={content.stylesOverview?.styles?.[0]}
          stageConfig={content.stages?.modern}
        />

        {/* 7. COZY & WARM STAGE */}
        <CozyWarmSection
          data={content.stylesOverview?.styles?.[1]}
          stageConfig={content.stages?.cozy}
        />

        {/* 8. LUXURY & CLASSIC STAGE */}
        <LuxuryClassicSection
          data={content.stylesOverview?.styles?.[2]}
          stageConfig={content.stages?.luxury}
        />

        {/* 9. HERITAGE & RETRO STAGE */}
        <HeritageRetroSection
          data={content.stylesOverview?.styles?.[3]}
          stageConfig={content.stages?.heritage}
        />

        {/* 10. NỘI THẤT VĂN PHÒNG & SHOWROOM */}
        <OfficeSection data={content.office} />

        {/* 11. TIN TỨC & GÓC NHÌN BẤT ĐỘNG SẢN */}
        <BlogFeedSection block={content.blogFeed} posts={posts} />

        {/* 12. KẾT NỐI & TƯ VẤN TRỰC TIẾP */}
        <QuoteContactSection data={content.contact} />
      </main>

      {/* 13. FOOTER */}
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
