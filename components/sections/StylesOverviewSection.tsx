'use client';

import React from 'react';
import Image from 'next/image';
import FlowReveal, { FlowStaggerGroup, FlowItem } from '@/components/animations/FlowReveal';
import { StylesOverviewData } from '@/lib/types';

interface StylesOverviewSectionProps {
  data?: StylesOverviewData;
}

const defaultStyles = [
  {
    id: 'modern',
    name: 'Modern & Minimalist',
    subtitle: 'LESS IS MORE',
    description:
      'Phương châm "Less is more". Đẩy cao sự tinh giản trong nội thất, chỉ giữ lại những gì thực sự cần thiết. Màu sắc dịu nhẹ (trắng, kem, xám), không gian mở và ngập tràn ánh sáng tự nhiên.',
    cardImage: '/uploads/figma_modern_minimalist.png',
    showcaseImage: '/uploads/figma_modern_minimalist.png',
    anchor: '#modern-section'
  },
  {
    id: 'cozy',
    name: 'Cozy & Warm',
    subtitle: 'JAPANDI & NORDIC',
    description:
      'Sự kết hợp hoàn hảo giữa nét tinh tế, gọn gàng của Nhật Bản và sự ấm áp, mộc mạc của Bắc Âu. Dùng nhiều chất liệu gỗ sáng màu, mây, tre, vải thô và gam màu earthy (màu đất, kem, xanh lá nhạt).',
    cardImage: '/uploads/the-gio-riverside.png',
    showcaseImage: '/uploads/the-gio-riverside.png',
    anchor: '#cozy-section'
  },
  {
    id: 'luxury',
    name: 'Luxury & Classic',
    subtitle: 'ĐẲNG CẤP THƯỢNG LƯU',
    description:
      'Đẩy tính xa hoa và sang trọng lên mức tối đa. Sử dụng các vật liệu siêu cao cấp (gỗ tự nhiên quý, đá xuyên sáng, kim loại mạ vàng, đồ thửa riêng - bespoke) với mức độ hoàn thiện tỉ mỉ.',
    cardImage: '/uploads/figma_luxury_classic.png',
    showcaseImage: '/uploads/figma_luxury_classic.png',
    anchor: '#luxury-section'
  },
  {
    id: 'heritage',
    name: 'Heritage & Retro',
    subtitle: 'HOÀI NIỆM & CÔNG NGHIỆP',
    description:
      'Gợi nhớ về thập niên 50 – 80. Kết hợp giữa những món đồ cũ kỹ/kỷ niệm với những gam màu vui tươi, phá cách (vàng mustard, xanh teal, cam đất). Mô phỏng lại các nhà xưởng cũ. Điểm nhấn là tường gạch trần, sàn bê tông mài, trần để lộ ống kỹ thuật, kết hợp khung sắt đen và gỗ thô tối màu.',
    cardImage: '/uploads/figma_heritage_vignette.png',
    showcaseImage: '/uploads/figma_heritage_vignette.png',
    anchor: '#heritage-section'
  }
];

export default function StylesOverviewSection({ data }: StylesOverviewSectionProps) {
  const tag = data?.tag || 'các sản phẩm đặc biệt';
  const heading = data?.heading || 'PHONG CÁCH THIẾT KẾ';
  const description =
    data?.description ||
    'Dù theo đuổi nét tối giản hiện đại hay vẻ đẹp sang trọng cổ điển, không gian sống luôn cần phản ánh đúng thần thái của người sở hữu. Đó chính là chìa khóa tạo nên sự khác biệt và giá trị bền vững cho mỗi công trình.';
  const stylesList = data?.styles && data.styles.length > 0 ? data.styles : defaultStyles;

  const scrollToAnchor = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="styles"
      className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-20 bg-[#f4f1ea] border-b border-[#e2ddd3] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto space-y-12 lg:space-y-16">
        {/* Section Header */}
        <FlowReveal direction="up" distance={30} className="text-center space-y-4">
          {/* Eyebrow: line + các sản phẩm đặc biệt + line */}
          <div className="inline-flex items-center justify-center gap-2.5">
            <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
            <span className="text-[12px] sm:text-[13px] font-semibold text-[#6e706a] uppercase tracking-widest font-accent">
              {tag}
            </span>
            <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
          </div>

          {/* Heading */}
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold text-[#2d302e] font-display uppercase tracking-tight leading-tight">
            {heading}
          </h2>

          {/* Description */}
          <p className="max-w-[640px] mx-auto text-[15px] sm:text-[16px] text-[#5f6361] leading-relaxed font-light">
            {description}
          </p>
        </FlowReveal>

        {/* 4 Cards Row with Staggered Fluid Reveal */}
        <FlowStaggerGroup
          staggerDelay={0.14}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {stylesList.map((style, idx) => {
            const targetAnchor = style.anchor || (
              idx === 0 ? '#modern-section' :
              idx === 1 ? '#cozy-section' :
              idx === 2 ? '#luxury-section' : '#heritage-section'
            );

            return (
              <FlowItem key={style.id || idx} distance={35}>
                <div
                  onClick={() => scrollToAnchor(targetAnchor)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollToAnchor(targetAnchor);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="bg-white rounded-[22px] sm:rounded-[26px] overflow-hidden border border-[#e2ddd3]/50 hover:border-[#c5a26c]/60 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-start group h-full transform hover:-translate-y-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c5a26c] select-none"
                  aria-label={`Xem chi tiết phong cách ${style.name}`}
                >
                  {/* Full-width flush image with exact Figma 302:220 aspect ratio */}
                  <div className="relative w-full aspect-[302/220] min-h-[190px] sm:min-h-[210px] lg:min-h-[220px] overflow-hidden bg-[#e2ddd3]/20">
                    <Image
                      src={style.cardImage || '/uploads/figma_modern_minimalist.png'}
                      alt={style.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 302px"
                    />
                  </div>

                  {/* Clean text body with comfortable padding and equal height */}
                  <div className="p-3 sm:p-5 lg:p-7 flex flex-col flex-1 space-y-2.5 sm:space-y-3">
                    <h3 className="text-[18px] sm:text-[19px] lg:text-[20px] font-semibold text-[#2d302e] font-display group-hover:text-[#c5a26c] transition-colors leading-snug">
                      {style.name}
                    </h3>

                    <p className="text-[13px] sm:text-[13.5px] text-[#5f6361] leading-relaxed font-light">
                      {style.description}
                    </p>
                  </div>
                </div>
              </FlowItem>
            );
          })}
        </FlowStaggerGroup>
      </div>
    </section>
  );
}
