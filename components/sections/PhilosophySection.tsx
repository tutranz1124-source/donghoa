'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TreePine, Hammer, HandHeart } from 'lucide-react';
import FlowReveal, { FlowStaggerGroup, FlowItem } from '@/components/animations/FlowReveal';
import { PhilosophyData } from '@/lib/types';

interface PhilosophySectionProps {
  data?: PhilosophyData;
}

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: TreePine,
    title: 'Phân phối dự án độc quyền & chọn lọc',
    description: 'Danh mục dự án vị trí kim cương, pháp lý minh bạch và tiềm năng sinh lời vượt trội.',
  },
  {
    icon: Hammer,
    title: 'Tư vấn pháp lý & tài chính chuyên sâu',
    description: 'Hỗ trợ lộ trình dòng tiền, đòn bẩy ngân hàng và thủ tục công chứng, sang tên trọn gói.',
  },
  {
    icon: HandHeart,
    title: 'Chính sách ưu đãi & quỹ căn ngoại giao',
    description: 'Đặc quyền tiếp cận quỹ căn đẹp nhất với bảng giá gốc trực tiếp từ chủ đầu tư.',
  },
];

export default function PhilosophySection({ data }: PhilosophySectionProps) {
  const image = data?.image || '/uploads/clean_philosophy_photo.png';
  const tag = data?.tag || 'VỀ CHÚNG TÔI';
  const heading = data?.heading || 'TẦM NHÌN VÀ SỨ MỆNH';
  const description =
    data?.description ||
    'Đông Hòa Property tự hào là đối tác chiến lược của các tập đoàn bất động sản hàng đầu, mang đến giải pháp an cư đẳng cấp và danh mục đầu tư sinh lời bền vững cho khách hàng thượng lưu.';
  const feats = data?.features && data.features.length > 0 ? data.features : defaultFeatures;
  const icons = [TreePine, Hammer, HandHeart];

  return (
    <section
      id="philosophy"
      className="w-full py-20 lg:py-28 bg-[#f4f1ea] border-b border-[#e2ddd3] overflow-hidden relative"
    >
      <div id="about" className="absolute -top-20 left-0" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* LEFT SIDE: Rounded rectangle image with smooth glide-in */}
            <div className="w-full lg:col-span-5 flex justify-center lg:justify-start">
              <FlowReveal direction="up" distance={45} duration={0.9} className="w-full max-w-[515px]">
                <div className="relative w-full aspect-[515/560] max-h-[560px] rounded-2xl overflow-hidden bg-[#e2ddd3]/30 border border-[#e2ddd3] shadow-xl group">
                  <Image
                    src={image}
                    alt="Tầm nhìn và sứ mệnh - Đông Hòa Property"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 515px"
                    priority
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
                </div>
              </FlowReveal>
            </div>

            {/* RIGHT SIDE with Staggered Elements */}
            <div className="w-full lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Header block */}
              <FlowReveal direction="up" distance={30} delay={0.1} className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#6e706a] uppercase tracking-widest font-accent">
                    {tag}
                  </span>
                </div>

                <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-semibold text-[#2d302e] font-display uppercase leading-tight tracking-tight">
                  {heading}
                </h2>

                <p className="text-[15px] sm:text-[16px] text-[#5f6361] leading-relaxed font-light">
                  {description}
                </p>
              </FlowReveal>

              {/* 3 feature rows - Clean open list matching Figma Frame 13:32 */}
              <FlowStaggerGroup staggerDelay={0.18} className="space-y-6 pt-2">
                {feats.map((feature, idx) => {
                  const IconComponent = icons[idx % icons.length];
                  return (
                    <FlowItem key={idx} distance={25}>
                      <div className="flex items-start gap-4 sm:gap-5 group">
                        <div className="w-12 h-12 rounded-xl bg-[#04092b] text-[#c5a26c] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#c5a26c]" strokeWidth={1.75} />
                        </div>
                        <div className="space-y-1 pt-0.5">
                          <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#2d302e] font-display">
                            {feature.title}
                          </h3>
                          <p className="text-[13.5px] sm:text-[14px] text-[#5f6361] font-light leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </FlowItem>
                  );
                })}
              </FlowStaggerGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
