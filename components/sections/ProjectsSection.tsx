'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Eye, ArrowRight, Building, Sparkles } from 'lucide-react';
import { ProjectsBlock, ProjectItem } from '@/lib/types';
import ProjectQuickViewModal from '../ProjectQuickViewModal';

interface ProjectsSectionProps {
  block?: ProjectsBlock;
  selectedCategory?: string;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'p-the-gio',
    name: 'The Gio Riverside',
    title: 'The Gio Riverside',
    category: 'can-ho',
    location: 'TP. Dĩ An, Bình Dương (Liền kề TP. Thủ Đức)',
    investor: 'An Gia Group',
    developer: 'An Gia Group',
    priceRange: 'Từ 1.8 Tỷ / Căn',
    price: 'Từ 1.8 Tỷ / Căn',
    area: '45m² - 115m²',
    featured: true,
    scale: '2 Tháp • 40 Tầng • 3.000 Căn Hộ & Penthouse',
    description: 'Tổ hợp căn hộ ven sông với tầm nhìn ôm trọn sông Đồng Nai. Thiết kế kiến trúc tối ưu không gian mở cùng hơn 30 tiện ích nội khu chuẩn nghỉ dưỡng.',
    image: '/uploads/the-gio-riverside.png',
    imageUrl: '/uploads/the-gio-riverside.png',
  },
  {
    id: 'p-vinhomes-can-gio',
    name: 'Vinhomes Cần Giờ',
    title: 'Vinhomes Cần Giờ',
    category: 'biet-thu',
    location: 'Cần Giờ, TP. Hồ Chí Minh',
    investor: 'Vingroup',
    developer: 'Vingroup',
    priceRange: 'Từ 15 Tỷ / Căn',
    price: 'Từ 15 Tỷ / Căn',
    area: '150m² - 450m²',
    featured: true,
    scale: 'Đại đô thị sinh thái 2.870 ha',
    description: 'Siêu đô thị lấn biển tiên phong tại Việt Nam, sở hữu hệ sinh thái rừng ngập mặn Cần Giờ và hạ tầng giao thông kết nối cầu Cần Giờ.',
    image: '/uploads/vinhomes-can-gio.png',
    imageUrl: '/uploads/vinhomes-can-gio.png',
  },
  {
    id: 'p-grand-marina',
    name: 'Grand Marina Saigon',
    title: 'Grand Marina Saigon',
    category: 'can-ho',
    location: 'Quận 1, TP. Hồ Chí Minh',
    investor: 'Masterise Homes',
    developer: 'Masterise Homes',
    priceRange: 'Liên hệ tư vấn',
    price: 'Liên hệ tư vấn',
    area: '52m² - 250m²',
    featured: true,
    scale: '8 Tháp căn hộ hàng hiệu Marriott & JW Marriott',
    description: 'Dự án bất động sản hàng hiệu quy mô bậc nhất thế giới mang thương hiệu Marriott International bên bờ sông Sài Gòn lịch sử.',
    image: '/uploads/lusso-saigon.png',
    imageUrl: '/uploads/lusso-saigon.png',
  },
  {
    id: 'p-global-city',
    name: 'The Global City',
    title: 'The Global City',
    category: 'biet-thu',
    location: 'Phường An Phú, TP. Thủ Đức',
    investor: 'Masterise Homes (Foster + Partners)',
    developer: 'Masterise Homes (Foster + Partners)',
    priceRange: 'Từ 36 Tỷ / Căn',
    price: 'Từ 36 Tỷ / Căn',
    area: '95m² - 220m²',
    scale: '117.4 ha • Nhà phố SOHO & Biệt thự',
    description: 'Khu đô thị phức hợp chuẩn quốc tế được quy hoạch bởi Foster + Partners, biểu tượng trung tâm mới của TP. Hồ Chí Minh.',
    image: '/uploads/kieu-by-kita.png',
    imageUrl: '/uploads/kieu-by-kita.png',
  },
  {
    id: 'p-elysian',
    name: 'Elysian Gamuda Land',
    title: 'Elysian Gamuda Land',
    category: 'can-ho',
    location: 'Đường Lò Lu, TP. Thủ Đức',
    investor: 'Gamuda Land',
    developer: 'Gamuda Land',
    priceRange: 'Từ 3.2 Tỷ / Căn',
    price: 'Từ 3.2 Tỷ / Căn',
    area: '48m² - 105m²',
    scale: '4 Block • 1.398 Căn Hộ Xanh Biophilic',
    description: 'Dự án căn hộ áp dụng triết lý thiết kế Biophilic đưa thiên nhiên vào từng không gian sống với 40+ tiện ích sinh thái.',
    image: '/uploads/happy-one-central.png',
    imageUrl: '/uploads/happy-one-central.png',
  },
  {
    id: 'p-gran-melia',
    name: 'Gran Meliá Nha Trang',
    title: 'Gran Meliá Nha Trang',
    category: 'nghi-duong',
    location: 'Bãi Tiên, TP. Nha Trang',
    investor: 'KDI Holdings',
    developer: 'KDI Holdings',
    priceRange: 'Liên hệ tư vấn',
    price: 'Liên hệ tư vấn',
    area: '350m² - 900m²',
    scale: 'Dinh thự biển siêu sang vận hành bởi Gran Meliá',
    description: 'Bộ sưu tập dinh thự biển thượng lưu đầu tiên tại Đông Nam Á mang thương hiệu xa xỉ nhất của tập đoàn khách sạn Meliá.',
    image: '/uploads/alora-nhatrang.png',
    imageUrl: '/uploads/alora-nhatrang.png',
  },
];

export default function ProjectsSection({
  block,
  selectedCategory: initialCategory,
  onOpenInquiry,
}: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>(initialCategory || 'all');
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  React.useEffect(() => {
    if (initialCategory) {
      setActiveFilter(initialCategory);
    }
  }, [initialCategory]);

  const rawProjects = block?.items && block.items.length > 0 ? block.items : DEFAULT_PROJECTS;

  const filterTabs = [
    { label: 'Tất Cả Dự Án', value: 'all' },
    { label: '01 / Căn Hộ Hạng Sang', value: 'can-ho' },
    { label: '02 / Biệt Thự & Nhà Phố', value: 'biet-thu' },
    { label: '03 / BĐS Nghỉ Dưỡng', value: 'nghi-duong' },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return rawProjects;
    return rawProjects.filter((p) => p.category === activeFilter);
  }, [rawProjects, activeFilter]);

  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const supportingProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-white border-b border-warm-200 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6"
        >
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{block?.badge || 'DANH MỤC DỰ ÁN'}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2] tracking-tight">
              {block?.title || 'Dự Án Trọng Điểm Đang Phân Phối'}
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-warm-100/80 backdrop-blur-sm rounded-full border border-warm-300 shadow-inner">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeFilter === tab.value
                    ? 'text-white shadow-warm-sm'
                    : 'text-charcoal-700 hover:text-charcoal hover:bg-white/80'
                }`}
              >
                {activeFilter === tab.value && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-charcoal rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* 1. HERO FEATURED PROJECT (Dominant 65/35 Asymmetric Split) */}
        {featuredProject && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 bg-gradient-to-br from-warm-50 to-warm-100 rounded-3xl border border-warm-300 overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-all duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden bg-warm-200">
                <Image
                  src={featuredProject.imageUrl || featuredProject.image || '/uploads/the-gio-riverside.png'}
                  alt={featuredProject.title || featuredProject.name || 'Dự án'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-semibold uppercase tracking-wider text-gold shadow-warm-sm border border-warm-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span>Dự Án Tâm Điểm</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                    <Building className="w-3.5 h-3.5 text-gold" />
                    <span>Chủ đầu tư: <strong>{featuredProject.investor || featuredProject.developer}</strong></span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal leading-snug group-hover:text-gold transition-colors">
                    {featuredProject.title || featuredProject.name}
                  </h3>

                  <div className="flex items-center gap-2 text-[13.5px] text-charcoal-600">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span className="line-clamp-1">{featuredProject.location}</span>
                  </div>

                  <p className="text-sm text-charcoal-600 leading-relaxed line-clamp-3">
                    {featuredProject.description}
                  </p>

                  <div className="pt-3 grid grid-cols-2 gap-4 border-t border-warm-200 text-xs">
                    <div>
                      <span className="text-charcoal-muted block">Mức giá tham khảo</span>
                      <span className="font-semibold text-charcoal text-sm mt-0.5 block">{featuredProject.priceRange || featuredProject.price || 'Liên hệ tư vấn'}</span>
                    </div>
                    <div>
                      <span className="text-charcoal-muted block">Quy mô / Diện tích</span>
                      <span className="font-semibold text-charcoal text-sm mt-0.5 block">{featuredProject.scale || featuredProject.area || 'Đang cập nhật'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalProject(featuredProject)}
                    className="flex-1 py-3.5 rounded-full bg-white hover:bg-warm-100 border border-warm-300 text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-warm-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Eye className="w-4 h-4 text-gold" />
                    <span>Xem chi tiết</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenInquiry) {
                        onOpenInquiry(featuredProject.title || featuredProject.name);
                      } else {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 py-3.5 rounded-full bg-charcoal hover:bg-gold hover:text-charcoal text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-warm-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Nhận thông tin</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. SUPPORTING PROJECTS GRID WITH ANIMATED PRESENCE */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {supportingProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-warm-50/70 hover:bg-white rounded-3xl border border-warm-300 hover:border-gold/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1"
              >
                <div className="relative h-60 w-full overflow-hidden bg-warm-200">
                  <Image
                    src={project.imageUrl || project.image || '/uploads/the-gio-riverside.png'}
                    alt={project.title || project.name || 'Dự án'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-medium text-charcoal border border-warm-200 shadow-warm-sm">
                    {project.investor || project.developer || 'Chủ đầu tư uy tín'}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif font-medium text-charcoal group-hover:text-gold transition-colors">
                      {project.title || project.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-charcoal-600">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>

                    <p className="text-[13px] text-charcoal-600 line-clamp-2 leading-relaxed pt-1">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-warm-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-charcoal-muted block">Mức giá dự kiến</span>
                      <span className="font-semibold text-charcoal text-sm mt-0.5 block">{project.priceRange || project.price || 'Liên hệ'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-charcoal-muted block">Quy mô</span>
                      <span className="font-semibold text-charcoal text-sm mt-0.5 block">{project.scale || project.area || 'Tiêu chuẩn'}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setModalProject(project)}
                      className="flex-1 py-2.5 rounded-full bg-white hover:bg-warm-100 border border-warm-300 text-charcoal text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold" />
                      <span>Xem nhanh</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenInquiry) {
                          onOpenInquiry(project.title || project.name);
                        } else {
                          const el = document.getElementById('contact');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="flex-1 py-2.5 rounded-full bg-charcoal hover:bg-gold hover:text-charcoal text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>Tư vấn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* QUICK VIEW MODAL */}
      <ProjectQuickViewModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onInquire={(projTitle) => {
          setModalProject(null);
          if (onOpenInquiry) {
            onOpenInquiry(projTitle);
          } else {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </section>
  );
}
