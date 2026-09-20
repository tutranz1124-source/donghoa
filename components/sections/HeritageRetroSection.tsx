'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StyleItemData, StyleStageConfig, AnimatedStageItem } from '@/lib/types';
import StageItemsRenderer from '@/components/StageItemsRenderer';

interface HeritageRetroSectionProps {
  data?: StyleItemData;
  stageConfig?: StyleStageConfig;
}

const swatchesTable = ['#301B17', '#5C2D25', '#E5A566', '#B7532A', '#7A221E'];
const swatchesChair = ['#0D4B75', '#007A87', '#88B8A6', '#F5B17B', '#F15A24'];

const defaultHeritageMobileItems: AnimatedStageItem[] = [
  {
    id: 'heritage_chandelier',
    name: 'Đèn chùm Cổ điển Đồng',
    image: '/uploads/figma_heritage_chandelier.png',
    position: {
      top: '3.6%',
      left: '17.2%',
      width: '14.1%',
      height: '27.6%',
      zIndex: 15,
    },
    animation: {
      direction: 'drop-top',
      offsetY: -40,
      delay: 0.1,
      duration: 0.85,
    },
  },
  {
    id: 'heritage_vignette',
    name: 'Góc tranh ảnh & Đèn bàn Retro',
    image: '/uploads/figma_heritage_vignette.png',
    position: {
      top: '36.1%',
      left: '3.9%',
      width: '37.8%',
      height: '57.4%',
      zIndex: 10,
    },
    animation: {
      direction: 'slide-left',
      offsetX: -50,
      delay: 0.15,
      duration: 0.85,
    },
  },
  {
    id: 'heritage_table',
    name: 'Bàn tròn Gỗ chạm khắc Cổ',
    image: '/uploads/figma_heritage_table.png',
    position: {
      top: '57.6%',
      left: '51.5%',
      width: '16.5%',
      height: '28.6%',
      zIndex: 12,
    },
    animation: {
      direction: 'fade-scale',
      offsetY: 40,
      delay: 0.2,
      duration: 0.85,
    },
  },
  {
    id: 'heritage_armchair',
    name: 'Ghế bành Bọc nỉ Retro',
    image: '/uploads/figma_heritage_armchair.png',
    position: {
      top: '49.9%',
      left: '75.1%',
      width: '18.1%',
      height: '35.9%',
      zIndex: 14,
    },
    animation: {
      direction: 'slide-right',
      offsetX: 50,
      delay: 0.25,
      duration: 0.85,
    },
  },
];

export default function HeritageRetroSection({ data, stageConfig }: HeritageRetroSectionProps) {
  const title = stageConfig?.title || 'HERITAGE &\nRETRO';
  const description =
    stageConfig?.description ||
    'Gợi nhớ về thập niên 50 – 80. Kết hợp giữa những món đồ cũ kỹ/kỷ niệm với những gam màu vui tươi, phá cách (vàng mustard, xanh teal, cam đất). Mô phỏng lại các nhà xưởng cũ. Điểm nhấn là tường gạch trần, sàn bê tông mài, trần để lộ ống kỹ thuật, kết hợp khung sắt đen và gỗ thô tối màu.';

  return (
    <section
      id="heritage-section"
      className="w-full bg-[#FAF6F0] border-b border-[#e2ddd3] overflow-hidden scroll-mt-20"
    >
      {/* MOBILE RESPONSIVE VIEW (< lg) */}
      <div className="block lg:hidden w-full bg-[#FAF6F0] pt-14 pb-12 px-3 sm:px-6">
        <div className="relative w-full max-w-[640px] mx-auto aspect-[1440/850] bg-[#FAF6F0] overflow-hidden select-none">
          {/* Layer 1: Title & Description (Top Right) */}
          <div
            className="absolute z-[20] flex flex-col items-start"
            style={{
              left: '52.0%',
              top: '7.5%',
              maxWidth: '44.0%',
            }}
          >
            <h2
              className="font-semibold text-[#2D302E] font-display uppercase tracking-tight whitespace-pre-line text-[14px] sm:text-[22px] leading-[1.05]"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(12px, 3.8vw, 24px)',
              }}
            >
              {title}
            </h2>

            <p
              className="font-normal text-[#5F6361] mt-1 line-clamp-3 sm:line-clamp-none leading-snug"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(6.5px, 1.8vw, 11px)',
              }}
            >
              {description}
            </p>
          </div>

          {/* Furniture Visual Scene on Mobile — Dynamic Items from CMS */}
          <StageItemsRenderer
            items={
              stageConfig?.mobileItems && stageConfig.mobileItems.length > 0
                ? stageConfig.mobileItems
                : defaultHeritageMobileItems
            }
            isMobile
          />

          {/* TWO PALETTES OF COLOR SWATCHES AT BOTTOM */}
          {/* Palette 1: Earthy Warm (Under Table) */}
          <div
            className="absolute z-[18] flex items-center justify-between"
            style={{
              left: '49.7%',
              bottom: '4.5%',
              width: '19.8%',
              height: '6.0%',
            }}
          >
            {swatchesTable.map((c, idx) => (
              <div
                key={idx}
                className="h-full w-[19.2%] rounded-[1px] sm:rounded-[2px] shadow-2xs"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Palette 2: Retro Pop (Under Armchair) */}
          <div
            className="absolute z-[18] flex items-center justify-between"
            style={{
              left: '74.5%',
              bottom: '4.5%',
              width: '19.8%',
              height: '6.0%',
            }}
          >
            {swatchesChair.map((c, idx) => (
              <div
                key={idx}
                className="h-full w-[19.2%] rounded-[1px] sm:rounded-[2px] shadow-2xs"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP STAGE (lg and above) */}
      <div className="hidden lg:block relative w-full max-w-[1440px] mx-auto aspect-[1440/850] bg-[#FAF6F0] overflow-hidden select-none">
        {/* Layer 1: Title & Description (Top Right) */}
        <motion.div
          initial={{ opacity: 0.8, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-[20] flex flex-col items-start"
          style={{
            left: '52.0%',
            top: '8.0%',
            maxWidth: '42.0%',
          }}
        >
          <h2
            className="font-semibold text-[#2D302E] font-display uppercase tracking-tight whitespace-pre-line"
            style={{
              fontSize: 'clamp(20px, 5.2vw, 76px)',
              lineHeight: '1.02',
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {title}
          </h2>

          <p
            className="font-normal text-[#5F6361] mt-[3%]"
            style={{
              fontSize: 'clamp(8.5px, 0.95vw, 13px)',
              lineHeight: '1.55',
              maxWidth: '560px',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {description}
          </p>
        </motion.div>

        {/* Dynamic Furniture Items from CMS (reflects Canva Studio edits live) */}
        {stageConfig?.items && stageConfig.items.length > 0 ? (
          <StageItemsRenderer items={stageConfig.items} />
        ) : (
          <>
            {/* Layer 2: Vintage Chandelier (Top Left) */}
            <motion.div
              initial={{ opacity: 0.8, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[15]"
              style={{
                left: '17.0%',
                top: '4.0%',
                width: '14.0%',
                height: '27.5%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_heritage_chandelier.png"
                  alt="Đèn chùm Cổ điển Đồng"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Layer 3: Gallery Art & Lamp Vignette (Left Center) */}
            <motion.div
              initial={{ opacity: 0.8, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[10]"
              style={{
                left: '4.3%',
                top: '36.5%',
                width: '36.5%',
                height: '57.5%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_heritage_vignette.png"
                  alt="Góc tranh ảnh & Đèn bàn Retro"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Layer 4: Antique Scalloped Table (Center Bottom) */}
            <motion.div
              initial={{ opacity: 0.8, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[12]"
              style={{
                left: '51.0%',
                top: '57.5%',
                width: '16.5%',
                height: '29.0%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_heritage_table.png"
                  alt="Bàn tròn Gỗ chạm khắc Cổ"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Layer 5: Vintage Velvet Armchair (Right Center) */}
            <motion.div
              initial={{ opacity: 0.8, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[14]"
              style={{
                left: '74.5%',
                top: '50.0%',
                width: '18.0%',
                height: '36.5%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_heritage_armchair.png"
                  alt="Ghế bành Bọc nỉ Retro"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </>
        )}

        {/* TWO PALETTES OF COLOR SWATCHES AT BOTTOM */}
        {/* Palette 1: Earthy Warm (Under Table) */}
        <div
          className="absolute z-[18] flex items-center justify-between"
          style={{
            left: '49.4%',
            top: '86.0%',
            width: '19.8%',
            height: '7.5%',
          }}
        >
          {swatchesTable.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.12 }}
              className="h-full w-[19.2%] rounded-[2px] shadow-2xs cursor-pointer transition-transform"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Palette 2: Retro Pop (Under Armchair) */}
        <div
          className="absolute z-[18] flex items-center justify-between"
          style={{
            left: '74.1%',
            top: '86.0%',
            width: '19.8%',
            height: '7.5%',
          }}
        >
          {swatchesChair.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.12 }}
              className="h-full w-[19.2%] rounded-[2px] shadow-2xs cursor-pointer transition-transform"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}