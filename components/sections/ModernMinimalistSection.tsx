'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StyleItemData, StyleStageConfig } from '@/lib/types';
import StageItemsRenderer from '@/components/StageItemsRenderer';

interface ModernMinimalistSectionProps {
  data?: StyleItemData;
  stageConfig?: StyleStageConfig;
}

const modernColors = [
  { color: '#2F3E46', name: 'Deep Slate' },
  { color: '#8EA5B3', name: 'Misty Blue' },
  { color: '#C7B299', name: 'Soft Sand' },
  { color: '#ABA29B', name: 'Warm Taupe' },
  { color: '#D5D8D6', name: 'Sky Frost' },
];

export default function ModernMinimalistSection({ data, stageConfig }: ModernMinimalistSectionProps) {
  const title = stageConfig?.title || 'MODERN &\nMINIMALIST';
  const description =
    stageConfig?.description ||
    'Phương châm "Less is more". Đề cao sự tinh giản trong nội thất, chỉ giữ lại những gì thực sự cần thiết. Màu sắc dịu nhẹ (trắng, kem, xám), không gian mở và ngập tràn ánh sáng tự nhiên.';

  return (
    <section
      id="modern-section"
      className="w-full bg-white border-b border-[#e2ddd3] overflow-hidden"
    >
      {/* MOBILE RESPONSIVE VIEW (< lg) */}
      <div className="block lg:hidden px-5 py-12 bg-white">
        <div className="max-w-[500px] mx-auto space-y-5">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
              <span className="text-[12px] font-semibold text-[#6e706a] uppercase tracking-widest font-accent">
                PHONG CÁCH THIẾT KẾ
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[36px] font-semibold text-[#2D302E] font-display uppercase tracking-tight leading-tight whitespace-pre-line">
              {title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#5F6361] leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Color Palette Circular Swatches */}
          <div className="flex items-center gap-2.5 pt-1">
            {modernColors.map((item, idx) => (
              <div
                key={idx}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-xs transition-transform active:scale-95"
                style={{ backgroundColor: item.color }}
                title={item.name}
              />
            ))}
          </div>

          {/* Furniture Visual Scene on Mobile — Unified Composition */}
          <div className="relative w-full aspect-[4/3.4] rounded-2xl overflow-hidden mt-4 bg-[#f8f7f4] border border-[#e2ddd3] p-4">
            {stageConfig?.mobileItems && stageConfig.mobileItems.length > 0 ? (
              <StageItemsRenderer items={stageConfig.mobileItems} isMobile />
            ) : (
              <>
                {/* Ceiling Pendant Lamp (Top Right) */}
                <div
                  className="absolute z-10"
                  style={{ left: '77%', top: '0%', width: '15%', height: '26%' }}
                >
                  <Image
                    src="/uploads/figma_modern_pendant.png"
                    alt="Đèn thả trần hiện đại"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Modern Master Bed (Right Center) */}
                <div
                  className="absolute z-10"
                  style={{ left: '38%', top: '16%', width: '60%', height: '46%' }}
                >
                  <Image
                    src="/uploads/figma_modern_bed.png"
                    alt="Giường ngủ Master Hiện đại"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Arc Floor Lamp (Left) */}
                <div
                  className="absolute z-12"
                  style={{ left: '16%', top: '16%', width: '22%', height: '40%' }}
                >
                  <Image
                    src="/uploads/figma_modern_arc_lamp.png"
                    alt="Đèn cây vòm hiện đại"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Modern Bouclé Sofa (Bottom Left) */}
                <div
                  className="absolute z-10"
                  style={{ left: '2%', bottom: '4%', width: '68%', height: '36%' }}
                >
                  <Image
                    src="/uploads/figma_modern_sofa.png"
                    alt="Sofa Bouclé Trắng Dài"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                {/* Single Wood Armchair (Bottom Right) */}
                <div
                  className="absolute z-12"
                  style={{ right: '2%', bottom: '4%', width: '26%', height: '38%' }}
                >
                  <Image
                    src="/uploads/figma_modern_armchair.png"
                    alt="Ghế đơn Gỗ Tự nhiên"
                    fill
                    className="object-contain object-right"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP STAGE (lg and above) */}
      <div className="hidden lg:block relative w-full max-w-[1200px] mx-auto aspect-[561/509] bg-white overflow-hidden select-none">
        {/* Layer 1: Typography & Description (Top Left) */}
        <motion.div
          initial={{ opacity: 0.8, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-[20] flex flex-col items-start"
          style={{
            left: '7.3%',
            top: '7.5%',
            width: '42.0%',
          }}
        >
          <h2
            className="font-semibold text-[#2D302E] font-display uppercase tracking-tight whitespace-pre-line"
            style={{
              fontSize: 'clamp(22px, 4.5vw, 64px)',
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
              fontSize: 'clamp(8.5px, 0.85vw, 13px)',
              lineHeight: '1.55',
              maxWidth: '460px',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {description}
          </p>
        </motion.div>

        {/* Color Palette Circular Swatches (5 Circular Dots) */}
        <div
          className="absolute z-[20] flex items-center justify-between"
          style={{
            left: '7.3%',
            top: '60.7%',
            width: '28.0%',
          }}
        >
          {modernColors.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.15 }}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full shadow-xs cursor-pointer transition-transform shrink-0"
              style={{ backgroundColor: item.color }}
              title={item.name}
            />
          ))}
        </div>

        {/* Dynamic Furniture Items from CMS (reflects Canva Studio edits live) */}
        {stageConfig?.items && stageConfig.items.length > 0 ? (
          <StageItemsRenderer items={stageConfig.items} />
        ) : (
          <>
            {/* Ceiling Pendant Lamp (Top Right) */}
            <motion.div
              initial={{ opacity: 0.8, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[15]"
              style={{
                left: '73.1%',
                top: '0%',
                width: '15.5%',
                height: '29.3%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_modern_pendant.png"
                  alt="Đèn thả trần hiện đại"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Modern Master Bed (Center Right) */}
            <motion.div
              initial={{ opacity: 0.8, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[10]"
              style={{
                left: '44.0%',
                top: '28.7%',
                width: '55.6%',
                height: '37.9%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_modern_bed.png"
                  alt="Giường ngủ Master Hiện đại"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Modern Arc Floor Lamp (Left, beside bed) */}
            <motion.div
              initial={{ opacity: 0.8, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[12]"
              style={{
                left: '22.6%',
                top: '29.3%',
                width: '15.9%',
                height: '29.3%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_modern_arc_lamp.png"
                  alt="Đèn cây vòm hiện đại"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* White Bouclé Sofa (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0.8, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[10]"
              style={{
                left: '5.3%',
                top: '69.5%',
                width: '66.3%',
                height: '19.1%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_modern_sofa.png"
                  alt="Sofa Bouclé Trắng Dài"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Side Armchair (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0.8, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[12]"
              style={{
                left: '78.6%',
                top: '70.1%',
                width: '16.8%',
                height: '21.8%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_modern_armchair.png"
                  alt="Ghế đơn Gỗ Tự nhiên"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}