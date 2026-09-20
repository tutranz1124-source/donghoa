'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StyleItemData, StyleStageConfig } from '@/lib/types';
import StageItemsRenderer from '@/components/StageItemsRenderer';

interface LuxuryClassicSectionProps {
  data?: StyleItemData;
  stageConfig?: StyleStageConfig;
}

export default function LuxuryClassicSection({ data, stageConfig }: LuxuryClassicSectionProps) {
  const title = stageConfig?.title || 'LUXURY & CLASSIC';
  const description =
    stageConfig?.description ||
    'Đầy tính xa hoa và sang trọng lên mức tối đa. Sử dụng các vật liệu siêu cao cấp (gỗ tự nhiên quý, đá xuyên sáng, kim loại mạ vàng, đồ thửa riêng - bespoke) với mức độ hoàn thiện tỉ mỉ.';

  return (
    <section
      id="luxury-section"
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
            <h2 className="text-[32px] sm:text-[36px] font-semibold text-[#2D302E] font-display uppercase tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#5F6361] leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Furniture Visual Scene on Mobile — Single Unified Composition */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-4 bg-[#faf8f5] border border-[#e2ddd3] p-4">
            {stageConfig?.mobileItems && stageConfig.mobileItems.length > 0 ? (
              <StageItemsRenderer items={stageConfig.mobileItems} isMobile />
            ) : (
              <>
                {/* Luxury Bed (Left) */}
                <div
                  className="absolute z-10"
                  style={{ left: '3%', bottom: '4%', width: '54%', height: '78%' }}
                >
                  <Image
                    src="/uploads/figma_luxury_bed.png"
                    alt="Giường ngủ Bọc nệm Sang trọng"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Gold Palm Lamp (Center) */}
                <div
                  className="absolute z-12"
                  style={{ left: '44%', bottom: '12%', width: '18%', height: '72%' }}
                >
                  <Image
                    src="/uploads/figma_luxury_palm_lamp.png"
                    alt="Đèn cây Lá cọ Mạ vàng"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Material Swatch 1 (Upper Right) */}
                <div
                  className="absolute z-10 rounded-xl overflow-hidden border border-[#e2ddd3] shadow-xs"
                  style={{ right: '4%', top: '6%', width: '24%', height: '26%' }}
                >
                  <Image
                    src="/uploads/figma_luxury_swatch_1.png"
                    alt="Mẫu vật liệu Gỗ lượn sóng"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Material Swatch 2 (Middle Right) */}
                <div
                  className="absolute z-10 rounded-xl overflow-hidden border border-[#e2ddd3] shadow-xs"
                  style={{ right: '4%', top: '35%', width: '24%', height: '24%' }}
                >
                  <Image
                    src="/uploads/figma_luxury_swatch_2.png"
                    alt="Mẫu vật liệu Gỗ xương cá"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Luxury Vases (Lower Right) */}
                <div
                  className="absolute z-20"
                  style={{ right: '6%', bottom: '4%', width: '18%', height: '35%' }}
                >
                  <Image
                    src="/uploads/figma_luxury_vases.png"
                    alt="Bộ bình gốm & thủy tinh"
                    fill
                    className="object-contain"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP STAGE (lg and above) */}
      <div className="hidden lg:block relative w-full max-w-[1440px] mx-auto aspect-[1440/1010] bg-white overflow-hidden select-none">
        {/* Layer 1: Typography & Description (Upper Left) */}
        <motion.div
          initial={{ opacity: 0.8, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-[20] flex flex-col items-start"
          style={{
            left: '8.5%',
            top: '10.0%',
            maxWidth: '62.0%',
          }}
        >
          <h2
            className="font-semibold text-[#2D302E] font-display uppercase tracking-tight whitespace-nowrap"
            style={{
              fontSize: 'clamp(20px, 5.2vw, 76px)',
              lineHeight: '1.05',
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {title}
          </h2>

          <p
            className="font-normal text-[#5F6361] mt-[2.5%]"
            style={{
              fontSize: 'clamp(8.5px, 0.95vw, 13.5px)',
              lineHeight: '1.55',
              maxWidth: '680px',
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
            {/* Layer 2: Main Luxury Master Bed (Center Left) */}
            <motion.div
              initial={{ opacity: 0.8, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[10]"
              style={{
                left: '7.1%',
                top: '34.8%',
                width: '52.1%',
                height: '54.7%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_luxury_bed.png"
                  alt="Giường ngủ Bọc nệm Sang trọng"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Layer 3: Gold Palm Lamp (Center) */}
            <motion.div
              initial={{ opacity: 0.8, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[12]"
              style={{
                left: '45.1%',
                top: '30.1%',
                width: '13.4%',
                height: '46.1%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_luxury_palm_lamp.png"
                  alt="Đèn cây Lá cọ Mạ vàng"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Layer 4: Material Swatch 1 (Upper Right) */}
            <motion.div
              initial={{ opacity: 0.8, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[14]"
              style={{
                left: '75.0%',
                top: '30.5%',
                width: '15.0%',
                height: '17.3%',
              }}
            >
              <div className="relative w-full h-full rounded-sm overflow-hidden border border-[#e2ddd3] shadow-xs">
                <Image
                  src="/uploads/figma_luxury_swatch_1.png"
                  alt="Mẫu vật liệu Gỗ lượn sóng"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Layer 5: Material Swatch 2 (Middle Right) */}
            <motion.div
              initial={{ opacity: 0.8, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[14]"
              style={{
                left: '75.0%',
                top: '48.5%',
                width: '15.0%',
                height: '17.5%',
              }}
            >
              <div className="relative w-full h-full rounded-sm overflow-hidden border border-[#e2ddd3] shadow-xs">
                <Image
                  src="/uploads/figma_luxury_swatch_2.png"
                  alt="Mẫu vật liệu Gỗ xương cá"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Layer 6: Luxury Vases (Lower Right, overlapping Swatch 2) */}
            <motion.div
              initial={{ opacity: 0.8, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[16]"
              style={{
                left: '80.1%',
                top: '62.4%',
                width: '8.0%',
                height: '27.4%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/figma_luxury_vases.png"
                  alt="Bộ bình gốm & thủy tinh"
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