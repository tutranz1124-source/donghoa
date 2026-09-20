'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AboutBlock } from '@/lib/types';
import { Sparkles, ShieldCheck, Factory, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  block: AboutBlock;
}

export default function AboutSection({ block }: AboutSectionProps) {
  return (
    <section id="about" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-20 bg-[#f4f1ea] border-b border-[#e2ddd3]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Difference Callout & Image */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Stylized Drop Cap "K" + "hác biệt" */}
          <div className="bg-white p-8 sm:p-10 border border-[#e2ddd3] shadow-md space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-[64px] sm:text-[80px] font-display text-[#c5a26c] leading-none font-bold select-none">
                K
              </span>
              <div className="pt-2">
                <span className="block text-[26px] sm:text-[34px] font-display font-medium text-[#04092b]">
                  hác biệt
                </span>
                <span className="block text-[12px] font-semibold tracking-widest text-[#a70c0c] uppercase font-accent">
                  GIÁ TRỊ CỐT LÕI
                </span>
              </div>
            </div>

            <p className="text-[15px] sm:text-[16px] text-[#1a1b18] leading-relaxed font-light border-l-2 border-[#c5a26c] pl-4">
              <strong>100% bản vẽ chuẩn thực tế</strong>, không thiết kế &ldquo;ảo&rdquo;. Sở hữu <strong>xưởng sản xuất trực tiếp</strong> giúp giảm chi phí trung gian và tối ưu từ 20–30%. Cam kết <strong>bảo hành 2 năm, bảo trì trọn đời</strong>.
            </p>

            <div className="pt-2">
              <a
                href="#styles"
                className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-[#04092b] hover:text-[#c5a26c] transition-colors"
              >
                <span>Khám phá các phong cách</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative w-full h-[280px] sm:h-[340px] overflow-hidden bg-[#04092b] border border-[#e2ddd3] shadow">
            <Image
              src={block.image || '/uploads/figma_philosophy.png'}
              alt="Đông Hòa Property Philosophy"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Right Column: Mission & 3 Pillars */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
              <span className="text-[12px] font-semibold text-[#a70c0c] uppercase tracking-widest font-accent">
                {block.badge || 'VỀ CHÚNG TÔI'}
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-semibold text-[#2d302e] font-display leading-tight">
              {block.headingAccent || 'TẦM NHÌN VÀ SỨ MỆNH'}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#5f6361] leading-relaxed font-light">
              {block.paragraph1 ||
                'Với những dự án bất động sản cao cấp hàng đầu, Đông Hòa Property tự hào mang đến trải nghiệm sống tinh tế, tiện nghi và danh mục đầu tư giá trị cho từng quý khách hàng.'}
            </p>
          </div>

          {/* 3 Pillars from Figma */}
          <div className="space-y-4">
            <div className="bg-white p-5 border border-[#e2ddd3] flex items-start gap-4 shadow-sm hover:border-[#c5a26c] transition-colors">
              <div className="w-10 h-10 bg-[#04092b] text-[#c5a26c] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[16px] font-semibold text-[#2d302e] font-display">
                  Thiết kế độc bản
                </h4>
                <p className="text-[13.5px] text-[#5f6361] font-light leading-relaxed">
                  Cá nhân hóa 100% theo phong cách, gu thẩm mỹ và phong thủy của chủ nhà.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 border border-[#e2ddd3] flex items-start gap-4 shadow-sm hover:border-[#c5a26c] transition-colors">
              <div className="w-10 h-10 bg-[#04092b] text-[#c5a26c] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[16px] font-semibold text-[#2d302e] font-display">
                  Thi công trọn gói
                </h4>
                <p className="text-[13.5px] text-[#5f6361] font-light leading-relaxed">
                  Cam kết tiến độ chuẩn xác, bảo đảm đúng 99% so với thiết kế 3D.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 border border-[#e2ddd3] flex items-start gap-4 shadow-sm hover:border-[#c5a26c] transition-colors">
              <div className="w-10 h-10 bg-[#04092b] text-[#c5a26c] flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[16px] font-semibold text-[#2d302e] font-display">
                  Xưởng sản xuất trực tiếp
                </h4>
                <p className="text-[13.5px] text-[#5f6361] font-light leading-relaxed">
                  Tối ưu 20–30% chi phí so với thị trường nhờ không qua đơn vị trung gian.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
