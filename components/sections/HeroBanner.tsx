'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroData } from '@/lib/types';

interface HeroBannerProps {
  data?: HeroData;
}

const defaultSlides = [
  {
    tag: 'ĐÔNG HÒA PROPERTY',
    monogram: 'Đ',
    line1: 'ông Hòa Property',
    line2: 'Kiến tạo giá trị — Nâng tầm chuẩn sống',
    description:
      'Thương hiệu tư vấn & phân phối bất động sản cao cấp hàng đầu, đồng hành cùng quý khách hàng và nhà đầu tư trên hành trình kiến tạo danh mục tài sản truyền đời vững bền.',
    backgroundImage: '/uploads/clean_project_vingroup.png',
    buttonText: 'Khám phá dự án',
    buttonTarget: '#projects',
    secondaryText: 'Về chúng tôi →',
    secondaryTarget: '#philosophy'
  },
  {
    tag: 'ĐÔNG HÒA PROPERTY',
    monogram: 'P',
    line1: 'hân phối chiến lược',
    line2: 'Quỹ căn vị trí kim cương',
    description:
      '100% dự án thẩm định pháp lý minh bạch, bảng giá gốc trực tiếp từ các tập đoàn hàng đầu: Vingroup, Phát Đạt, KDI Holdings, Kita Group, An Gia...',
    backgroundImage: '/uploads/clean_project_thegio.png',
    buttonText: 'Xem giỏ hàng',
    buttonTarget: '#categories',
    secondaryText: 'Bảng giá nội bộ →',
    secondaryTarget: '#contact'
  },
  {
    tag: 'ĐÔNG HÒA PROPERTY',
    monogram: 'T',
    line1: 'ư vấn chuyên sâu',
    line2: 'Đồng hành trọn vẹn',
    description:
      'Hotline 24/7: 0906.499.279 | Email: info@donghoagroup.vn | Trụ sở: 113-115 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, TP.HCM',
    backgroundImage: '/uploads/clean_project_alora.png',
    buttonText: 'Nhận tư vấn ngay',
    buttonTarget: '#contact',
    secondaryText: 'Tin tức thị trường →',
    secondaryTarget: '/blog'
  }
];

export default function HeroBanner({ data }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const slides = data?.slides && data.slides.length > 0 ? data.slides : defaultSlides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isHovered || isDragging) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, isHovered, isDragging]);

  const currentItem = slides[currentSlide] || slides[0];

  return (
    <section className="relative w-full min-h-[540px] sm:min-h-[660px] lg:h-[780px] bg-[#04092b] overflow-hidden flex items-center pt-24 sm:pt-28 pb-8 sm:pb-12 select-none touch-pan-y">
      {/* Seamless Multi-Layer Crossfade Backgrounds (Zero Black Flash) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {slides.map((s, idx) => {
          const isActive = currentSlide === idx;
          const bgUrl = s.backgroundImage || '/uploads/clean_project_vingroup.png';
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
              }}
              transition={{
                opacity: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
                scale: { duration: 6.5, ease: 'linear' },
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

        {/* Ambient Dark-to-Gold Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25 md:to-transparent lg:w-[70%] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden pointer-events-none z-10" />
      </div>

      {/* Swipeable / Draggable Foreground Container */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          const swipeThreshold = 45;
          const velocityThreshold = 180;
          if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
            nextSlide();
          } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
            prevSlide();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 w-full flex flex-col justify-between h-full cursor-grab active:cursor-grabbing"
      >
        <div className="max-w-[700px] space-y-4 sm:space-y-5 pt-4 sm:pt-12 min-h-[260px] sm:min-h-[320px] flex flex-col justify-center">
          {/* Animated Hero Monogram & Text with Silky Smooth Easing */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Calligraphic Monogram + Line 1 & Line 2 */}
              <div className="flex items-start gap-1 sm:gap-2">
                <span className="font-script text-white text-[95px] sm:text-[150px] lg:text-[190px] font-normal leading-[0.75] select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] pointer-events-none">
                  {currentItem.monogram}
                </span>
                <div className="space-y-0.5 pt-2 sm:pt-4">
                  <h1 className="text-[22px] sm:text-[34px] lg:text-[42px] font-sans font-light text-white tracking-wide leading-tight drop-shadow-md pointer-events-none">
                    {currentItem.line1}
                  </h1>
                  {currentItem.line2 && (
                    <h2 className="text-[20px] sm:text-[32px] lg:text-[40px] font-sans font-light italic text-white/95 tracking-wide leading-tight drop-shadow-md pointer-events-none">
                      {currentItem.line2}
                    </h2>
                  )}
                </div>
              </div>

              {/* Subtitle / Description */}
              <p className="text-[13px] sm:text-[16px] text-white/90 font-light leading-relaxed max-w-xl drop-shadow pointer-events-none">
                {currentItem.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Pagination Pill Control */}
        <div className="pt-6 sm:pt-8 flex justify-end">
          <div
            onPointerDown={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-lg text-white cursor-default"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="p-1 hover:text-[#c5a26c] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 px-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    currentSlide === idx ? 'w-5 sm:w-6 bg-white shadow-sm' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="p-1 hover:text-[#c5a26c] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
