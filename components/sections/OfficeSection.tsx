'use client';

import React from 'react';
import Image from 'next/image';
import FlowReveal, { FlowStaggerGroup, FlowItem } from '@/components/animations/FlowReveal';
import { OfficeData } from '@/lib/types';

interface OfficeSectionProps {
  data?: OfficeData;
}

export default function OfficeSection({ data }: OfficeSectionProps) {
  const officeData = data;

  const colorSwatches = officeData?.colorSwatches || [
    { color: '#e5dfd7', label: 'Sand Cream' },
    { color: '#8c7b6c', label: 'Earthy Taupe' },
    { color: '#395224', label: 'Forest Sage' },
    { color: '#d2a679', label: 'Warm Caramel' }
  ];

  const officeCards = officeData?.galleryCards || [
    { id: 1, image: '/uploads/office_card_1.png', alt: 'Không gian làm việc văn phòng hiện đại' },
    { id: 2, image: '/uploads/office_card_2.png', alt: 'Khu vực làm việc cá nhân & tiếp khách' },
    { id: 3, image: '/uploads/office_card_3.png', alt: 'Module bàn làm việc linh hoạt' }
  ];

  return (
    <div className="w-full bg-white border-b border-[#e2ddd3]">
      {/* 10. NỘI THẤT VĂN PHÒNG — Hero Composition (Figma 13:258) */}
      <section id="office" className="w-full pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 px-6 sm:px-12 lg:px-20 overflow-hidden bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* LEFT CONTENT COLUMN */}
            <div className="w-full lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-8 z-10">
              <FlowReveal direction="up" distance={30} className="space-y-5 lg:space-y-7">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-[1.5px] bg-[#b85d38]" />
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#b85d38] uppercase tracking-widest font-accent">
                    {officeData?.tag || 'CÁC SẢN PHẨM ĐẶC BIỆT'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-[36px] sm:text-[52px] lg:text-[68px] font-semibold text-[#2d302e] font-display uppercase leading-[1.05] tracking-tight">
                    {officeData?.headingLine1 || 'NỘI THẤT'}
                  </h2>
                  <h3 className="text-[36px] sm:text-[52px] lg:text-[68px] font-semibold text-[#2d302e] font-display uppercase leading-[1.05] tracking-tight">
                    {officeData?.headingLine2 || 'VĂN PHÒNG'}
                  </h3>
                </div>

                <p className="text-[15px] sm:text-[16px] text-[#5f6361] leading-[1.8] font-light max-w-xl">
                  {officeData?.description ||
                    'Thiết kế nội thất văn phòng không chỉ là việc tạo ra một nơi làm việc thẩm mỹ và tối ưu công năng, mà còn là giải pháp kiến tạo không gian truyền cảm hứng, nâng cao hiệu suất và thể hiện trọn vẹn nét văn hóa doanh nghiệp.'}
                </p>

                <div className="pt-2 sm:pt-4 flex items-center gap-3.5">
                  {colorSwatches.map((swatch, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-sm transition-all duration-300 hover:scale-115 cursor-pointer transform"
                      style={{ backgroundColor: swatch.color }}
                      title={swatch.label}
                    />
                  ))}
                </div>
              </FlowReveal>
            </div>

            {/* RIGHT VISUAL SCENE — Exact Figma Frame 13:258 Composition */}
            <div className="w-full max-w-[480px] mx-auto lg:col-span-6 flex items-center justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[540px] xl:max-w-[560px]">
                {/* Desk Office Scene (Figma 30:14: 800x800) */}
                <Image
                  src={officeData?.heroImage || '/uploads/office_hero_main.png'}
                  alt="Không gian tư vấn bất động sản - Đông Hòa Property"
                  fill
                  className="object-contain object-bottom"
                  priority
                />

                {/* Potted Plant (Figma 30:16: exact 48.7% height, 21.8% width, -1.5% left, 3.6% bottom) */}
                <div
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: '-2%',
                    bottom: '3.6%',
                    width: '22%',
                    height: '49%',
                  }}
                >
                  <Image
                    src="/uploads/asset_potted_plant.png"
                    alt="Cây cảnh văn phòng"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 VISUAL CARDS below the office hero (Figma Frame 13:265) */}
      <section id="office-gallery" className="w-full pb-20 lg:pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-white">
        <div className="max-w-[1280px] mx-auto">
          <FlowStaggerGroup staggerDelay={0.15} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {officeCards.map((card) => (
              <FlowItem key={card.id} distance={35}>
                <div
                  className="group relative w-full aspect-[410/400] max-h-[400px] rounded-2xl overflow-hidden bg-[#f4f1ea] border border-[#e2ddd3] shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5"
                >
                  <Image
                    src={card.image}
                    alt={card.alt || 'Không gian dự án Đông Hòa Property'}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 410px"
                  />
                </div>
              </FlowItem>
            ))}
          </FlowStaggerGroup>
        </div>
      </section>
    </div>
  );
}
