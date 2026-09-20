'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroBlock } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  block: HeroBlock;
  onExplore?: (filter?: { location?: string; type?: string }) => void;
}

export default function HeroSection({ block }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[750px] lg:min-h-[850px] flex items-center pt-28 pb-16 px-4 sm:px-8 lg:px-20 overflow-hidden bg-[#04092b]">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={block.backgroundImage || '/uploads/figma_hero.png'}
          alt={block.tagline || 'Đông Hòa Design'}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Vignette & Gold Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#04092b]/90 via-[#04092b]/60 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-[1440px] w-full mx-auto relative z-10">
        <div className="max-w-2xl text-white space-y-6">
          {/* Stylized Drop Cap & Artistic Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-start gap-3 sm:gap-4"
          >
            <span className="text-[72px] sm:text-[96px] lg:text-[110px] font-display text-[#c5a26c] leading-none font-bold select-none">
              T
            </span>
            <div className="pt-2 sm:pt-4 space-y-1">
              <span className="block text-[28px] sm:text-[40px] lg:text-[46px] font-display font-medium italic leading-tight text-white">
                ruyền cảm hứng sống
              </span>
              <span className="block text-[22px] sm:text-[32px] lg:text-[36px] font-display font-light text-[#c5a26c] tracking-wide">
                Thiết kế không gian
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[15px] sm:text-[17px] text-white/90 leading-relaxed font-light pl-2 border-l-2 border-[#c5a26c] max-w-xl"
          >
            {block.description ||
              'Nội thất sang trọng được tạo nên với sự sáng tạo, tính công năng và vẻ đẹp vượt thời gian. Giải pháp thiết kế & thi công nội thất trọn gói, biến ngôi nhà mơ ước của bạn thành hiện thực với dấu ấn cá nhân độc bản.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#about"
              className="inline-flex items-center gap-3 bg-[#c5a26c] hover:bg-white text-[#04092b] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-widest transition-all duration-300 shadow-xl group"
            >
              <span>Xem thêm</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </a>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-white/80 hover:border-[#c5a26c] hover:text-[#c5a26c] text-white px-7 py-3.5 text-[13px] font-semibold uppercase tracking-widest transition-colors backdrop-blur-sm"
            >
              <span>Khám phá bài viết</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
