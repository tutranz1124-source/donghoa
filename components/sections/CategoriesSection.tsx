'use client';

import React from 'react';
import Image from 'next/image';
import { Building2, Home, Waves, Landmark, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    count: '15+ Dự án',
    description: 'Không gian sống tinh tế tại các toà tháp biểu tượng trung tâm với tiêu chuẩn bàn giao quốc tế 5 sao.',
    image: '/uploads/clean_project_thegio.png',
    icon: Building2,
  },
  {
    id: 'nha-pho',
    title: 'Nhà Phố Thương Mại',
    subtitle: 'Commercial Shophouse & Townhouses',
    sqm: '1.200.000 m² sàn',
    count: '8+ Khu đô thị',
    description: 'Sở hữu mặt tiền kinh doanh đắc địa tại các trục đại lộ huyết mạch, biên độ gia tăng giá trị thương mại bền vững.',
    image: '/uploads/clean_project_lusso.png',
    icon: Home,
  },
  {
    id: 'biet-thu',
    title: 'Biệt Thự Nghỉ Dưỡng',
    subtitle: 'Coastal & Golf Resort Villas',
    sqm: '1.800.000 m² sàn',
    count: '5+ Quần thể',
    description: 'Tổ hợp nghỉ dưỡng ôm trọn vịnh biển nguyên sơ, sở hữu lâu dài và vận hành bởi các thương hiệu toàn cầu.',
    image: '/uploads/clean_project_alora.png',
    icon: Waves,
  },
  {
    id: 'dinh-thu',
    title: 'Dinh Thự Độc Bản',
    subtitle: 'Bespoke Waterfront Mansions',
    sqm: '850.000 m² cảnh quan',
    count: '3+ Kiệt tác',
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
      className="w-full py-24 sm:py-28 lg:py-36 bg-[#080C16] text-white relative overflow-hidden border-t border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10 space-y-16 lg:space-y-20">
        {/* Header Block with Generous Whitespace */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-6xl">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-[0.25em] font-sans block">
              PHÂN KHÚC TRỌNG ĐIỂM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight tracking-tight">
              Giỏ Hàng Bất Động Sản Cao Cấp
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880]" />
            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed pt-1">
              Tuyển chọn các quỹ căn đắt giá nhất từ những chủ đầu tư danh tiếng, đảm bảo 100% tính pháp lý minh bạch và tiềm năng tích sản bền vững qua nhiều thế hệ.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                if (onOpenInquiry) onOpenInquiry('Yêu cầu giỏ hàng tổng hợp các phân khúc');
              }}
              className="px-6 py-3 border border-white/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-2 rounded-sm group cursor-pointer"
            >
              <span>Nhận Báo Cáo Phân Khúc</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4 Clean Editorial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {defaultCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => handleCategoryClick(cat.title)}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-[#C5A880]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-2xl rounded-xl"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-black/40">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080C16] via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 p-2.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-lg">
                      <Icon className="w-4 h-4 text-[#C5A880]" />
                    </div>

                    <div className="absolute bottom-3 right-4 text-[11px] font-mono text-[#C5A880] tracking-wider">
                      {cat.count}
                    </div>
                  </div>

                  {/* Card Content with Generous Padding */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-serif text-white group-hover:text-[#C5A880] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#C5A880]/80 tracking-wide font-sans font-medium">
                      {cat.subtitle}
                    </p>
                    <p className="text-xs text-white/60 font-light leading-relaxed pt-1">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-[#C5A880] transition-colors border-t border-white/5 uppercase tracking-wider">
                  <span>Khám phá quỹ căn</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
