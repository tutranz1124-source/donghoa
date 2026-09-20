'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { HeroData } from '@/lib/types';

interface HeroBannerProps {
  data?: HeroData;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

const defaultSlides = [
  {
    tag: 'ĐÔNG HÒA PROPERTY • PHÂN PHỐI CHIẾN LƯỢC',
    title: 'Kiến Tạo Giá Trị — Nâng Tầm Chuẩn Sống',
    subtitle: 'Đồng hành cùng quý khách hàng trên hành trình sở hữu bất động sản vị trí kim cương, pháp lý minh bạch và tiềm năng sinh lời bền vững.',
    backgroundImage: '/uploads/clean_project_vingroup.png',
    primaryButton: 'Khám phá giỏ hàng',
    primaryTarget: '#projects',
    secondaryButton: 'Nhận bảng giá VIP',
    secondaryTarget: '#private-access',
  },
  {
    tag: 'QUỸ CĂN BIỂU TƯỢNG • TP. HỒ CHÍ MINH',
    title: 'Tuyển Chọn Dự Án Hạng Sang Độc Bản',
    subtitle: '100% dự án được thẩm định pháp lý chặt chẽ từ các chủ đầu tư danh tiếng: Vingroup, Gamuda Land, An Gia, Kita Group, KDI Holdings.',
    backgroundImage: '/uploads/clean_project_thegio.png',
    primaryButton: 'Xem các phân khúc',
    primaryTarget: '#categories',
    secondaryButton: 'Tính toán tài chính',
    secondaryTarget: '#mortgage-calculator',
  },
  {
    tag: 'TƯ VẤN ĐẦU TƯ & TÀI CHÍNH BẤT ĐỘNG SẢN',
    title: 'Dịch Vụ Tư Vấn Tận Tâm — Bảo Mật Tuyệt Đối',
    subtitle: 'Hỗ trợ giải ngân ngân hàng linh hoạt, cập nhật tiến độ xây dựng liên tục và đồng hành bàn giao chuẩn mực.',
    backgroundImage: '/uploads/clean_project_alora.png',
    primaryButton: 'Đăng ký tư vấn 1-1',
    primaryTarget: '#contact',
    secondaryButton: 'Góc nhìn thị trường',
    secondaryTarget: '/blog',
  },
];

export default function HeroBanner({ data, onOpenInquiry }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slides = data?.slides && data.slides.length > 0 ? (data.slides as any) : defaultSlides;

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
    <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:h-[840px] bg-[#060913] overflow-hidden flex items-center select-none pt-20">
      {/* Background Images with Cinematic Slow Scale */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {slides.map((s: any, idx: number) => {
          const isActive = currentSlide === idx;
          const bgUrl = s.backgroundImage || '/uploads/clean_project_vingroup.png';
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.03 : 1.08,
              }}
              transition={{
                opacity: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
                scale: { duration: 8, ease: 'easeOut' },
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={bgUrl}
                alt={`Đông Hòa Property - Slide ${idx + 1}`}
                fill
                className="object-cover object-center"
                priority={idx === 0}
              />
            </motion.div>
          );
        })}

        {/* Deep Architectural Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913]/90 via-[#060913]/65 to-[#060913]/30 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-black/30 pointer-events-none z-10" />
      </div>

      {/* Main Content Container with Generous Breathing Room */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-20 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 w-full flex flex-col justify-center h-full py-16"
      >
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Tag / Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold tracking-[0.2em] uppercase font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{currentItem.tag || 'ĐÔNG HÒA PROPERTY'}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-[1.15] tracking-tight">
                {currentItem.title || currentItem.line1 || 'Kiến Tạo Giá Trị — Nâng Tầm Chuẩn Sống'}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl">
                {currentItem.subtitle || currentItem.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleNav(currentItem.primaryTarget || '#projects')}
                  className="px-7 py-3.5 rounded-sm bg-[#C5A880] hover:bg-white text-[#060913] font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 shadow-xl flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>{currentItem.primaryButton || 'Khám phá dự án'}</span>
                  <ArrowRight className="w-4 h-4 text-[#060913] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNav(currentItem.secondaryTarget || '#private-access')}
                  className="px-7 py-3.5 rounded-sm border border-white/30 hover:border-[#C5A880] text-white hover:text-[#C5A880] font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-sm cursor-pointer"
                >
                  <span>{currentItem.secondaryButton || 'Nhận bảng giá VIP'}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators & Navigation Bar */}
        <div className="mt-12 sm:mt-16 flex items-center justify-between pt-8 border-t border-white/10 max-w-3xl">
          <div className="flex items-center gap-2.5">
            {slides.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? 'w-10 bg-[#C5A880]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C5A880] hover:bg-white/5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-white/50">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C5A880] hover:bg-white/5 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
