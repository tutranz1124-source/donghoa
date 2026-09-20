'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StyleItemData, StyleStageConfig } from '@/lib/types';

import StageItemsRenderer from '@/components/StageItemsRenderer';

interface CozyWarmSectionProps {
  data?: StyleItemData;
  stageConfig?: StyleStageConfig;
}

const cozyColors = [
  { color: '#301A0C', name: 'Màu gỗ sẫm' },
  { color: '#7C6146', name: 'Màu đất nung ấm' },
  { color: '#503723', name: 'Nâu óc chó' },
  { color: '#C7BAA7', name: 'Màu kem vải thô' },
  { color: '#A38E71', name: 'Màu cát / Mây tre' },
];

export default function CozyWarmSection({ data, stageConfig }: CozyWarmSectionProps) {
  const title = stageConfig?.title || 'COZY & WARM';
  const description =
    stageConfig?.description ||
    'Sự kết hợp hoàn hảo giữa nét tinh tế, gọn gàng của Nhật Bản và sự ấm áp, mộc mạc của Bắc Âu. Dùng nhiều chất liệu gỗ sáng màu, mây, tre, vải thô và gam màu earthy (màu đất, kem, xanh lá nhạt).';

  return (
    <section
      id="cozy-section"
      className="w-full bg-[#FAF6F0] border-b border-[#e2ddd3] overflow-hidden"
    >
      {/* MOBILE RESPONSIVE VIEW (< lg) */}
      <div className="block lg:hidden px-5 py-12 bg-[#FAF6F0]">
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

          {/* Color Palette Swatches */}
          <div className="flex items-center gap-2 pt-1">
            {cozyColors.map((item, idx) => (
              <div
                key={idx}
                className="h-9 w-7 rounded-full shadow-xs transition-transform active:scale-95"
                style={{ backgroundColor: item.color }}
                title={item.name}
              />
            ))}
          </div>

          {/* Furniture Visual Scene on Mobile */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-4 bg-[#f3ede3]/60 border border-[#e2ddd3] p-4">
            {stageConfig?.mobileItems && stageConfig.mobileItems.length > 0 ? (
              <StageItemsRenderer items={stageConfig.mobileItems} isMobile />
            ) : (
              <>
                {/* Background Slat Wall */}
                <div
                  className="absolute pointer-events-none"
                  style={{ left: '18%', top: 0, width: '20%', height: '70%' }}
                >
                  <Image
                    src="/uploads/clean_cozy_slat_panel.png"
                    alt="Vách nan gỗ tự nhiên"
                    fill
                    className="object-fill"
                    priority
                  />
                </div>

                {/* Sofa & Lamp */}
                <div
                  className="absolute z-10"
                  style={{ left: '5%', bottom: '5%', width: '64%', height: '82%' }}
                >
                  <Image
                    src="/uploads/clean_cozy_sofa_lamp.png"
                    alt="Ghế thư giãn Bouclé & Đèn sàn"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Tables */}
                <div
                  className="absolute z-20"
                  style={{ right: '4%', bottom: '5%', width: '35%', height: '48%' }}
                >
                  <Image
                    src="/uploads/clean_cozy_tables.png"
                    alt="Bàn trà đôi gỗ trụ tròn"
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
      <div className="hidden lg:block relative w-full max-w-[1440px] mx-auto aspect-[1440/1000] bg-[#FAF6F0] overflow-hidden select-none">
        {/* Dynamic Furniture Items from CMS (reflects Canva Studio edits live) */}
        {stageConfig?.items && stageConfig.items.length > 0 ? (
          <StageItemsRenderer items={stageConfig.items} />
        ) : (
          <>
            {/* Layer 1: Background Wood Slat Wall */}
            <motion.div
              initial={{ opacity: 0.7, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[1] pointer-events-none"
              style={{
                left: '20.7%',
                top: '0%',
                width: '16.7%',
                height: '56.0%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/clean_cozy_slat_panel.png"
                  alt="Vách nan gỗ tự nhiên"
                  fill
                  className="object-fill"
                  priority
                />
              </div>
            </motion.div>

            {/* Layer 2: Main Plush Bouclé Sofa with Floor Lamp */}
            <motion.div
              initial={{ opacity: 0.8, scale: 0.96, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[10]"
              style={{
                left: '8.4%',
                top: '14.0%',
                width: '50.1%',
                height: '77.4%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/clean_cozy_sofa_lamp.png"
                  alt="Ghế thư giãn Bouclé & Đèn sàn"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Layer 3: Nesting Wooden Side Tables (Lower Right) */}
            <motion.div
              initial={{ opacity: 0.8, x: 25, y: 25 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-[15]"
              style={{
                left: '67.3%',
                top: '62.2%',
                width: '27.5%',
                height: '32.7%',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/uploads/clean_cozy_tables.png"
                  alt="Bàn trà đôi gỗ trụ tròn"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </>
        )}

        {/* Layer 4: Typography, Description & Color Swatches */}
        <motion.div
          initial={{ opacity: 0.8, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-[20] flex flex-col items-start text-left"
          style={{
            left: '41.7%',
            width: '50.0%',
            top: '12.5%',
          }}
        >
          <h2
            className="font-semibold text-[#2D302E] font-display uppercase tracking-tight text-left"
            style={{
              fontSize: 'clamp(22px, 4.8vw, 68px)',
              lineHeight: '1.05',
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {title}
          </h2>

          <p
            className="font-normal text-[#5F6361] mt-[2.5%] text-left"
            style={{
              fontSize: 'clamp(8.5px, 0.95vw, 13.5px)',
              lineHeight: '1.55',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {description}
          </p>

          {/* Color Palette Swatches (5 Capsule Pills Aligned Right under Description) */}
          <div className="self-end flex items-center justify-between gap-[5%] mt-[4.5%] w-[40%]">
            {cozyColors.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.8, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: 0.15 + idx * 0.05,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="flex-1 aspect-[1/2.6] rounded-[22px] shadow-sm hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: item.color }}
                title={item.name}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
