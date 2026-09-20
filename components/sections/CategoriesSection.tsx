'use client';

import React from 'react';
import Image from 'next/image';
import { Building2, Home, Waves, Landmark, ArrowUpRight } from 'lucide-react';
import FlowReveal, { FlowStaggerGroup, FlowItem } from '@/components/animations/FlowReveal';

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  sqm: string;
  count: string;
  description: string;
  image: string;
  icon: React.ElementType;
}

const defaultCategories: CategoryItem[] = [
  {
    id: 'can-ho',
    title: 'Căn Hộ Hạng Sang',
    subtitle: 'Luxury Apartments & Sky Villas',
    sqm: '2.500.000 m² sàn',
    count: '15+ Dự án chiến lược',
    description: 'Không gian sống tinh tế tại các toà tháp biểu tượng trung tâm với tiêu chuẩn bàn giao quốc tế 5 sao.',
    image: '/uploads/clean_project_thegio.png',
    icon: Building2,
  },
  {
    id: 'nha-pho',
    title: 'Nhà Phố Thương Mại',
    subtitle: 'Commercial Shophouse & Townhouses',
    sqm: '1.200.000 m² sàn',
    count: '8+ Khu đô thị kiểu mẫu',
    description: 'Sở hữu mặt tiền kinh doanh đắc địa tại các trục đại lộ huyết mạch, biên độ gia tăng giá trị thương mại bền vững.',
    image: '/uploads/clean_project_lusso.png',
    icon: Home,
  },
  {
    id: 'biet-thu',
    title: 'Biệt Thự Nghỉ Dưỡng Biển',
    subtitle: 'Coastal & Golf Resort Villas',
    sqm: '1.800.000 m² sàn',
    count: '5+ Quần thể đại đô thị',
    description: 'Tổ hợp nghỉ dưỡng all-in-one ôm trọn vịnh biển nguyên sơ, sở hữu lâu dài và vận hành bởi thương hiệu toàn cầu.',
    image: '/uploads/clean_project_alora.png',
    icon: Waves,
  },
  {
    id: 'dinh-thu',
    title: 'Dinh Thự Độc Bản',
    subtitle: 'Bespoke Waterfront Mansions',
    sqm: '850.000 m² cảnh quan',
    count: '3+ Kiệt tác Haute Couture',
    description: 'Biểu tượng truyền đời riêng tư tuyệt đối ven sông, kiến trúc may đo dành riêng cho giới thượng lưu tinh hoa.',
    image: '/uploads/clean_project_anara.png',
    icon: Landmark,
  },
];

interface CategoriesSectionProps {
  onSelectCategory?: (category: string) => void;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

export default function CategoriesSection({ onSelectCategory, onOpenInquiry }: CategoriesSectionProps) {
  const handleCategoryClick = (title: string) => {
    if (onSelectCategory) {
      onSelectCategory(title);
    }
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="categories"
      className="w-full py-16 sm:py-20 lg:py-28 bg-[#04092b] text-white border-t border-b border-[#c5a26c]/20 relative overflow-hidden"
    >
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#c5a26c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 relative z-10 space-y-12 sm:space-y-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <FlowReveal direction="up" distance={30} className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-5 h-[1.5px] bg-[#c5a26c]" />
              <span className="text-[11px] sm:text-[12px] font-semibold text-[#c5a26c] uppercase tracking-[0.2em] font-accent">
                GIỎ HÀNG ĐA DẠNG & ĐẶC QUYỀN
              </span>
            </div>
            <h2 className="text-[26px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.2] text-white font-display">
              Danh Mục Phân Khúc Bất Động Sản Trọng Điểm
            </h2>
            <p className="text-[13.5px] sm:text-[15px] text-white/70 font-light leading-relaxed">
              Tuyển chọn các quỹ căn đắt giá nhất từ những chủ đầu tư uy tín, đảm bảo 100% tính pháp lý minh bạch và tiềm năng tích sản bền vững qua nhiều thế hệ.
            </p>
          </FlowReveal>

          <FlowReveal direction="up" distance={20} delay={0.15} className="shrink-0">
            <button
              type="button"
              onClick={() => {
                if (onOpenInquiry) {
                  onOpenInquiry('Tư vấn toàn bộ danh mục phân khúc bất động sản');
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 border border-white/30 hover:border-[#c5a26c] text-white hover:text-[#c5a26c] text-[12px] sm:text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm group cursor-pointer"
            >
              <span>NHẬN TOÀN BỘ GIỎ HÀNG</span>
              <ArrowUpRight className="w-4 h-4 text-[#c5a26c] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </FlowReveal>
        </div>

        {/* 4 Cards Grid */}
        <FlowStaggerGroup staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {defaultCategories.map((item) => {
            const Icon = item.icon;
            return (
              <FlowItem key={item.id} distance={30}>
                <div
                  onClick={() => handleCategoryClick(item.title)}
                  className="group relative bg-white/[0.03] border border-white/10 hover:border-[#c5a26c] transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-[#c5a26c]/10 rounded-sm h-full"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-[200px] sm:h-[220px] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04092b] via-[#04092b]/30 to-transparent" />

                      {/* Icon Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 p-2 sm:p-2.5 bg-[#04092b]/80 backdrop-blur-md border border-white/20 rounded">
                        <Icon className="w-5 h-5 text-[#c5a26c]" />
                      </div>

                      {/* SQM Metric Tag */}
                      <div className="absolute bottom-3 right-3 sm:right-4 bg-[#c5a26c] text-[#04092b] font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider px-2 sm:px-2.5 py-1">
                        {item.sqm}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3">
                      <span className="text-[10px] sm:text-[11px] text-[#c5a26c] uppercase tracking-widest block font-accent">
                        {item.count}
                      </span>
                      <h3 className="text-[18px] sm:text-[20px] font-medium text-white group-hover:text-[#c5a26c] transition-colors font-display leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-[12px] text-white/50 tracking-wide uppercase">
                        {item.subtitle}
                      </p>
                      <p className="text-[12px] sm:text-[13px] text-white/70 font-light leading-relaxed pt-0.5 sm:pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-white/5 mt-3 sm:mt-4 flex items-center justify-between text-[11px] sm:text-[12px] font-semibold text-white/90 group-hover:text-[#c5a26c] transition-colors uppercase tracking-wider">
                    <span>XEM DỰ ÁN & BẢNG GIÁ</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#c5a26c]" />
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

