'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory?: (category: string) => void;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

const categories = [
  {
    index: '01',
    categoryKey: 'can-ho',
    title: 'Căn Hộ Hạng Sang & Penthouse',
    subtitle: 'APARTMENTS & PENTHOUSES',
    desc: 'Không gian sống trên cao tại các vị trí trung tâm, tầm nhìn toàn cảnh ôm trọn thành phố cùng hệ tiện ích đặc quyền chuẩn mực quốc tế.',
    image: '/uploads/the-gio-riverside.png',
    featured: true,
  },
  {
    index: '02',
    categoryKey: 'biet-thu',
    title: 'Biệt Thự & Nhà Phố Đô Thị',
    subtitle: 'VILLAS & TOWNHOMES',
    desc: 'Khu compound khép kín, an ninh đa lớp, cảnh quan sinh thái và cộng đồng cư dân tinh hoa.',
    image: '/uploads/vinhomes-can-gio.png',
    featured: false,
  },
  {
    index: '03',
    categoryKey: 'nghi-duong',
    title: 'Bất Động Sản Nghỉ Dưỡng',
    subtitle: 'COASTAL RETREATS',
    desc: 'Biệt thự ven biển và quần thể nghỉ dưỡng tiêu chuẩn 5 sao, kết hợp tối ưu vận hành.',
    image: '/uploads/alora-nhatrang.png',
    featured: false,
  },
  {
    index: '04',
    categoryKey: 'thuong-mai',
    title: 'Shophouse & Thương Mại',
    subtitle: 'COMMERCIAL',
    desc: 'Vị trí mặt tiền các trục đại lộ huyết mạch, đón đầu lưu lượng kinh doanh sầm uất.',
    image: '/uploads/happy-one-central.png',
    featured: false,
  },
];

export default function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  const handleClick = (categoryKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const primaryCategory = categories[0];
  const secondaryCategories = categories.slice(1);

  return (
    <section id="categories" className="py-20 sm:py-28 bg-gradient-to-b from-white via-warm-100/50 to-warm-100 border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
              DANH MỤC PHÂN KHÚC
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2] tracking-tight">
              Phân Khúc Bất Động Sản Chọn Lọc
            </h2>
          </div>
          <p className="text-sm text-charcoal-600 max-w-md font-normal leading-relaxed">
            Các danh mục bất động sản được thẩm định kỹ lưỡng về vị trí quy hoạch, tính thanh khoản và tiềm năng tăng trưởng bền vững.
          </p>
        </div>

        {/* Editorial Asymmetric Grid: 1 Large Lead Card + 3 Supporting Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* 1. Large Lead Category Card (5 Cols) */}
          <div
            onClick={() => handleClick(primaryCategory.categoryKey)}
            className="lg:col-span-5 group cursor-pointer flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-warm-300 hover:border-gold/60 transition-all duration-300 shadow-warm-sm hover:shadow-warm-md"
          >
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-warm-200">
              <Image
                src={primaryCategory.image}
                alt={primaryCategory.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-mono font-semibold text-charcoal border border-warm-200 shadow-warm-sm">
                {primaryCategory.index}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-charcoal text-white rounded-full text-[10.5px] uppercase tracking-wider font-semibold">
                Tiêu Điểm
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] tracking-[0.18em] font-semibold text-gold uppercase block mb-1">
                  {primaryCategory.subtitle}
                </span>
                <h3 className="text-2xl font-serif font-medium text-charcoal group-hover:text-gold transition-colors leading-snug">
                  {primaryCategory.title}
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed mt-2.5">
                  {primaryCategory.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-warm-100 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-gold transition-colors">
                <span>Khám phá dự án liên quan</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>

          {/* 2. Three Supporting Secondary Category Cards (7 Cols -> 3 Items Stacked/Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {secondaryCategories.map((item) => (
              <div
                key={item.index}
                onClick={() => handleClick(item.categoryKey)}
                className="group cursor-pointer flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden border border-warm-300 hover:border-gold/60 transition-all duration-300 shadow-warm-sm hover:shadow-warm-md"
              >
                <div className="relative h-48 lg:h-auto lg:w-48 xl:w-56 shrink-0 overflow-hidden bg-warm-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-mono font-semibold text-charcoal border border-warm-200">
                    {item.index}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] tracking-[0.15em] font-semibold text-gold uppercase block">
                      {item.subtitle}
                    </span>
                    <h4 className="text-lg font-serif font-medium text-charcoal group-hover:text-gold transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-charcoal-600 leading-relaxed line-clamp-2 mt-1">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-medium text-charcoal-700 group-hover:text-gold transition-colors">
                    <span>Xem danh mục</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
