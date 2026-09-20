'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProjectsBlock, ProjectItem } from '@/lib/types';
import { ArrowRight, MapPin, Building, Sparkles, Star, Eye } from 'lucide-react';
import ProjectQuickViewModal from '@/components/ProjectQuickViewModal';

interface ProjectsSectionProps {
  block?: ProjectsBlock;
  selectedCategory?: string;
  onOpenInquiry?: (projectName?: string) => void;
}

export default function ProjectsSection({ block, selectedCategory, onOpenInquiry }: ProjectsSectionProps) {
  const items = block?.items || [];
  const [filter, setFilter] = useState<'all' | 'featured' | 'hcm' | 'coastal'>('all');
  const [selectedPreviewProject, setSelectedPreviewProject] = useState<ProjectItem | null>(null);

  // Sync external category filter if passed
  React.useEffect(() => {
    if (selectedCategory) {
      const lower = selectedCategory.toLowerCase();
      if (lower.includes('căn hộ')) setFilter('all');
      else if (lower.includes('nhà phố')) setFilter('hcm');
      else if (lower.includes('biệt thự') || lower.includes('dinh thự')) setFilter('coastal');
    }
  }, [selectedCategory]);

  const filteredItems = items.filter((item) => {
    if (filter === 'featured') return item.featured;
    if (filter === 'hcm') return item.location?.toLowerCase().includes('hồ chí minh') || item.location?.toLowerCase().includes('thủ đức');
    if (filter === 'coastal') return item.location?.toLowerCase().includes('nha trang') || item.location?.toLowerCase().includes('quy nhơn') || item.location?.toLowerCase().includes('ninh thuận') || item.location?.toLowerCase().includes('cần giờ');
    return true;
  });

  const displayList = filteredItems.length > 0 ? filteredItems : items;

  return (
    <section id="projects" className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-20 bg-white border-b border-[#e2ddd3]">
      <div className="max-w-[1440px] mx-auto space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e2ddd3] pb-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
              <span className="text-[11.5px] sm:text-[12px] font-bold text-[#6e706a] uppercase tracking-widest font-accent">
                {block?.badge || 'DANH MỤC DỰ ÁN TIÊU BIỂU'}
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold text-[#04092b] font-display uppercase tracking-tight leading-tight">
              {block?.title || 'DỰ ÁN BẤT ĐỘNG SẢN & KHÔNG GIAN NỔI BẬT'}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#6e706a] font-light leading-relaxed">
              Tuyển tập những dự án bất động sản cao cấp hàng đầu với vị trí chiến lược, kiến trúc ấn tượng và giá trị gia tăng bền vững.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#faf8f5] p-1 rounded-lg border border-[#e2ddd3] self-start md:self-auto">
            {[
              { key: 'all', label: 'Tất cả dự án' },
              { key: 'featured', label: 'Nổi bật' },
              { key: 'hcm', label: 'TP. Hồ Chí Minh' },
              { key: 'coastal', label: 'Nghỉ dưỡng biển' }
            ].map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-3 py-1.5 rounded-md text-[11.5px] font-bold transition-all ${
                    active ? 'bg-[#04092b] text-white shadow-xs' : 'text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Architectural Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayList.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-[#e2ddd3] hover:border-[#c5a26c] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              onClick={() => setSelectedPreviewProject(project)}
            >
              <div>
                {/* Image Showcase */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#04092b]">
                  <Image
                    src={project.image || '/uploads/vinhomes-can-gio.png'}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    {project.featured && (
                      <span className="bg-[#c5a26c] text-[#04092b] font-bold text-[9.5px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm font-accent uppercase tracking-wider">
                        <Star className="w-2.5 h-2.5 fill-[#04092b]" /> Nổi bật
                      </span>
                    )}
                    {project.developer && (
                      <span className="bg-[#04092b]/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-full border border-white/20">
                        {project.developer}
                      </span>
                    )}
                  </div>

                  {/* Quick Preview Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[#04092b] text-[11.5px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-[#c5a26c]" /> Xem Chi Tiết
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-[19px] sm:text-[21px] font-semibold text-[#04092b] font-display group-hover:text-[#c5a26c] transition-colors leading-snug">
                    {project.name}
                  </h3>

                  <div className="space-y-1.5 text-[12.5px] text-[#5f6361] font-light">
                    {project.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#c5a26c] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                    )}
                    {project.area && (
                      <div className="flex items-start gap-2">
                        <Building className="w-3.5 h-3.5 text-[#c5a26c] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{project.area}</span>
                      </div>
                    )}
                    {project.propertyTypes && (
                      <div className="text-[12px] text-[#04092b] font-medium pt-1 line-clamp-1">
                        Sản phẩm: {project.propertyTypes}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#e2ddd3]/60 mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenInquiry?.(project.name);
                  }}
                  className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#04092b] group-hover:text-[#c5a26c] transition-colors cursor-pointer"
                >
                  <span>Nhận Báo Giá & Mặt Bằng</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Quick View Modal */}
      <ProjectQuickViewModal
        project={selectedPreviewProject}
        isOpen={!!selectedPreviewProject}
        onClose={() => setSelectedPreviewProject(null)}
        onOpenInquiry={(pName) => onOpenInquiry?.(pName)}
      />
    </section>
  );
}
