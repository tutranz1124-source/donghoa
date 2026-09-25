'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CategoriesData, CategoryItem } from '@/lib/types';

interface CategoriesSectionProps {
  data?: CategoriesData;
  onSelectCategory?: (category: string) => void;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
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
    image: '/uploads/la-tien-villa.png',
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

export default function CategoriesSection({ data, onSelectCategory }: CategoriesSectionProps) {
  const handleClick = (categoryKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const items = data?.items && data.items.length > 0 ? data.items : DEFAULT_CATEGORIES;
  const tag = data?.tag || 'DANH MỤC PHÂN KHÚC';
  const heading = data?.heading || 'Phân Khúc Bất Động Sản Chọn Lọc';
  const description =
    data?.description ||
    'Các danh mục bất động sản được thẩm định kỹ lưỡng về vị trí quy hoạch, tính thanh khoản và tiềm năng tăng trưởng bền vững.';

  const primaryCategory = items[0] || DEFAULT_CATEGORIES[0];
  const secondaryCategories = items.slice(1);

  return (
    <section id="categories" className="py-20 sm:py-28 bg-gradient-to-b from-white via-warm-100/50 to-warm-100 border-b border-warm-200 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{tag}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2] tracking-tight">
              {heading}
            </h2>
          </div>
          <p className="text-sm text-charcoal-600 max-w-md font-normal leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Editorial Asymmetric Grid: 1 Large Lead Card + 3 Supporting Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* 1. Large Lead Category Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleClick(primaryCategory.categoryKey)}
            className="lg:col-span-5 group cursor-pointer flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-warm-300 hover:border-gold/60 transition-all duration-300 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1"
          >
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-warm-200">
              <Image
                src={primaryCategory.image || '/uploads/the-gio-riverside.png'}
                alt={primaryCategory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-mono font-bold text-gold border border-warm-200 shadow-warm-sm">
                {primaryCategory.index}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-8 sm:p-10 space-y-4">
              <span className="text-xs font-sans tracking-[0.15em] font-semibold text-gold uppercase block">
                {primaryCategory.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal group-hover:text-gold transition-colors">
                {primaryCategory.title}
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
                {primaryCategory.desc}
              </p>

              <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-charcoal group-hover:text-gold transition-colors">
                <span>Khám phá dự án phân khúc này</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* 2. Three Supporting Category Cards (7 Cols Vertical Stack) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 sm:gap-6">
            {secondaryCategories.map((cat, idx) => (
              <motion.div
                key={cat.categoryKey}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleClick(cat.categoryKey)}
                className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border border-warm-300 hover:border-gold/60 transition-all duration-300 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-0.5 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="relative h-44 sm:h-36 w-full sm:w-48 rounded-2xl overflow-hidden shrink-0 bg-warm-200">
                  <Image
                    src={cat.image || '/uploads/vinhomes-can-gio.png'}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-mono font-bold text-gold border border-warm-200">
                    {cat.index}
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-left w-full">
                  <span className="text-[11px] font-sans tracking-wider font-semibold text-gold uppercase block">
                    {cat.subtitle}
                  </span>
                  <h4 className="text-xl font-serif font-medium text-charcoal group-hover:text-gold transition-colors">
                    {cat.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-charcoal-600 line-clamp-2 leading-relaxed font-normal">
                    {cat.desc}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-warm-100 group-hover:bg-[#04092b] group-hover:text-gold flex items-center justify-center text-charcoal-700 transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
