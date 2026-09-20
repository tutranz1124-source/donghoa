'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HeroData } from '@/lib/types';

interface HeroBannerProps {
  data?: HeroData;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

const DEFAULT_SLIDES = [
  {
    tag: 'ĐÔNG HÒA PROPERTY • PHÂN PHỐI CHIẾN LƯỢC',
    title: 'Kiến Tạo Chuẩn Sống — Tuyển Chọn Bất Động Sản Độc Bản',
    subtitle: 'Đồng hành tư vấn chuyên sâu các dự án sở hữu vị trí chiến lược, quy hoạch chuẩn mực và thẩm định pháp lý minh bạch.',
    backgroundImage: '/uploads/clean_project_thegio.png',
    primaryButton: 'Khám phá dự án',
    primaryTarget: '#projects',
    secondaryButton: 'Liên hệ tư vấn',
    secondaryTarget: '#contact',
  },
  {
    tag: 'QUỸ CĂN CHỌN LỌC • TP. HỒ CHÍ MINH & KHU VỰC TRỌNG ĐIỂM',
    title: 'Danh Mục Căn Hộ & Biệt Thự Cao Cấp',
    subtitle: 'Hợp tác phân phối chính thức từ các chủ đầu tư uy tín hàng đầu: Masterise Homes, Gamuda Land, Vingroup, Khang Điền.',
    backgroundImage: '/uploads/clean_project_vingroup.png',
    primaryButton: 'Xem các phân khúc',
    primaryTarget: '#categories',
    secondaryButton: 'Khám phá giỏ hàng',
    secondaryTarget: '#projects',
  },
  {
    tag: 'TƯ VẤN GIẢI PHÁP ĐẦU TƯ BỀN VỮNG',
    title: 'Tận Tâm Đồng Hành — Bảo Mật Tuyệt Đối',
    subtitle: 'Cung cấp góc nhìn thị trường chuẩn xác, phân tích tiềm năng thực tế và hỗ trợ xuyên suốt quá trình giao dịch.',
    backgroundImage: '/uploads/clean_project_alora.png',
    primaryButton: 'Đăng ký tư vấn',
    primaryTarget: '#contact',
    secondaryButton: 'Tin tức thị trường',
    secondaryTarget: '/blog',
  },
];

function sanitizeSlide(s: any, idx: number) {
  let tag = s.tag || DEFAULT_SLIDES[idx]?.tag || 'ĐÔNG HÒA PROPERTY';
  let title = s.title || '';
  if (!title) {
    const rawLine = (s.monogram || '') + (s.line1 || '') + (s.line2 ? ' ' + s.line2 : '');
    if (rawLine.toLowerCase().includes('hiết kế') || !rawLine.trim()) {
      title = DEFAULT_SLIDES[idx]?.title || 'Kiến Tạo Chuẩn Sống — Tuyển Chọn Bất Động Sản Độc Bản';
    } else {
      title = rawLine.trim();
    }
  }

  let subtitle = s.subtitle || s.description || DEFAULT_SLIDES[idx]?.subtitle || '';
  let backgroundImage = s.backgroundImage || DEFAULT_SLIDES[idx]?.backgroundImage || '/uploads/clean_project_thegio.png';
  let primaryButton = s.primaryButton || s.buttonText || DEFAULT_SLIDES[idx]?.primaryButton || 'Khám phá dự án';
  let primaryTarget = s.primaryTarget || s.buttonTarget || DEFAULT_SLIDES[idx]?.primaryTarget || '#projects';
  let secondaryButton = s.secondaryButton || s.secondaryText || DEFAULT_SLIDES[idx]?.secondaryButton || 'Liên hệ tư vấn';
  let secondaryTarget = s.secondaryTarget || DEFAULT_SLIDES[idx]?.secondaryTarget || '#contact';

  return {
    tag,
    title,
    subtitle,
    backgroundImage,
    primaryButton,
    primaryTarget,
    secondaryButton,
    secondaryTarget,
  };
}

export default function HeroBanner({ data, onOpenInquiry }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = useMemo(() => {
    if (data?.slides && Array.isArray(data.slides) && data.slides.length > 0) {
      return data.slides.map((s, idx) => sanitizeSlide(s, idx));
    }
    return DEFAULT_SLIDES;
  }, [data]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  const currentItem = slides[currentSlide] || slides[0];

  const handleNav = (target: string) => {
    if (target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = target;
    }
  };

  return (
    <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:h-[840px] bg-warm-100 overflow-hidden flex items-center select-none pt-16 sm:pt-20">
      {/* Background Architectural Visuals with Soft Warm Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {slides.map((s, idx) => {
          const isActive = currentSlide === idx;
          const bgUrl = s.backgroundImage || '/uploads/clean_project_thegio.png';
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.02 : 1.05,
              }}
              transition={{
                opacity: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
                scale: { duration: 7, ease: 'easeOut' },
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={bgUrl}
                alt={`Đông Hòa Property - ${s.title}`}
                fill
                className="object-cover object-center"
                priority={idx === 0}
              />
            </motion.div>
          );
        })}

        {/* Soft, Warm Architectural Gradient Overlays (Rich Warm Shading) */}
        <div className="absolute inset-0 bg-gradient-to-r from-warm-50/95 via-warm-50/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-100 via-transparent to-warm-50/30 pointer-events-none z-10" />
      </div>

      {/* Hero Content Container - Asymmetric Fluid Proportions */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-20 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full flex flex-col justify-center h-full py-12"
      >
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 overflow-visible"
            >
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-warm-300 shadow-warm-sm text-gold text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase font-sans">
                <span>{currentItem.tag}</span>
              </div>

              {/* Headline - Full character safety */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-normal text-charcoal leading-[1.15] tracking-tight overflow-visible">
                {currentItem.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-[17px] text-charcoal-600 font-normal leading-relaxed max-w-xl">
                {currentItem.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => handleNav(currentItem.primaryTarget)}
                  className="px-7 py-3.5 rounded-full bg-charcoal hover:bg-gold text-white font-medium text-xs tracking-[0.12em] uppercase transition-all duration-300 shadow-warm-sm flex items-center gap-2.5 group cursor-pointer active:scale-95"
                >
                  <span>{currentItem.primaryButton}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry();
                    } else {
                      handleNav(currentItem.secondaryTarget);
                    }
                  }}
                  className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white border border-warm-300 hover:border-gold text-charcoal hover:text-gold font-medium text-xs tracking-[0.12em] uppercase transition-all duration-300 shadow-warm-sm backdrop-blur-sm cursor-pointer"
                >
                  <span>{currentItem.secondaryButton}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicator Bar */}
        <div className="mt-10 sm:mt-14 flex items-center justify-between pt-6 border-t border-warm-300/80 max-w-2xl lg:max-w-3xl">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? 'w-9 bg-gold' : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full border border-warm-300 bg-white/80 flex items-center justify-center text-charcoal-700 hover:text-charcoal hover:border-gold transition-all shadow-warm-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-charcoal-muted">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full border border-warm-300 bg-white/80 flex items-center justify-center text-charcoal-700 hover:text-charcoal hover:border-gold transition-all shadow-warm-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
