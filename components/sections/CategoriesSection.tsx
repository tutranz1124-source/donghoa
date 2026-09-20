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
    desc: 'Không gian sống trên cao tại các vị trí trung tâm, tầm nhìn toàn cảnh cùng hệ tiện ích đặc quyền.',
    image: '/uploads/clean_project_thegio.png',
  },
  {
    index: '02',
    categoryKey: 'biet-thu',
    title: 'Biệt Thự & Nhà Phố Đô Thị',
    subtitle: 'VILLAS & TOWNHOMES',
    desc: 'Khu compound khép kín, an ninh đa lớp, cảnh quan xanh và cộng đồng cư dân tinh hoa.',
    image: '/uploads/clean_project_vingroup.png',
  },
  {
    index: '03',
    categoryKey: 'nghi-duong',
    title: 'Bất Động Sản Nghỉ Dưỡng',
    subtitle: 'COASTAL & RESORT RETREATS',
    desc: 'Biệt thự ven biển và quần thể nghỉ dưỡng tiêu chuẩn quốc tế, kết hợp khai thác vận hành.',
    image: '/uploads/clean_project_alora.png',
  },
  {
    index: '04',
    categoryKey: 'thuong-mai',
    title: 'Shophouse & Thương Mại',
    subtitle: 'COMMERCIAL & SHOPHOUSES',
    desc: 'Vị trí mặt tiền các trục đại lộ huyết mạch, đón đầu lưu lượng kinh doanh và tiềm năng thương mại.',
    image: '/uploads/clean_project_gamuda.png',
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

  return (
    <section id="categories" className="py-20 sm:py-28 bg-warm-50 border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
              DANH MỤC PHÂN KHÚC
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2]">
              Phân Khúc Bất Động Sản Chọn Lọc
            </h2>
          </div>
          <p className="text-sm text-charcoal-600 max-w-md font-normal leading-relaxed">
            Các danh mục bất động sản được thẩm định kỹ lưỡng về vị trí, quy hoạch và tiềm năng gia tăng giá trị.
          </p>
        </div>

        {/* Minimal Editorial Category Grid (01 / 02 / 03 / 04) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((item) => (
            <div
              key={item.index}
              onClick={() => handleClick(item.categoryKey)}
              className="group cursor-pointer flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-warm-200 hover:border-gold/60 transition-all duration-300 shadow-warm-sm hover:shadow-warm-md"
            >
              {/* Category Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-warm-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-mono font-medium text-charcoal border border-warm-200">
                  {item.index}
                </div>
              </div>

              {/* Editorial Description & Title */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.15em] font-semibold text-gold uppercase block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-lg font-serif font-medium text-charcoal group-hover:text-gold transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-charcoal-600 leading-relaxed mt-2 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-warm-100 flex items-center justify-between text-xs font-medium text-charcoal-700 group-hover:text-gold transition-colors">
                  <span>Khám phá quỹ căn</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
