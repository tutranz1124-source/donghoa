'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProjectsBlock, ProjectItem } from '@/lib/types';
import { ArrowRight, MapPin, Building, Star, Eye } from 'lucide-react';
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
    <section id="projects" className="w-full py-24 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-24 bg-[#0A0E1A] text-white border-t border-white/5 relative">
      <div className="max-w-[1440px] mx-auto space-y-16 lg:space-y-20">
        {/* Section Header with Spacious Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-[0.25em] font-sans block">
              {block?.badge || 'DANH MỤC DỰ ÁN TIÊU BIỂU'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight tracking-tight">
              {block?.title || 'Dự Án Bất Động Sản Nổi Bật'}
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880]" />
            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed pt-1">
              Tuyển tập những dự án bất động sản cao cấp hàng đầu với vị trí chiến lược, kiến trúc ấn tượng và giá trị gia tăng bền vững.
            </p>
          </div>

          {/* Minimalist Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            {[
              { key: 'all', label: 'Tất cả dự án' },
              { key: 'featured', label: 'Nổi bật' },
              { key: 'hcm', label: 'TP. Hồ Chí Minh' },
              { key: 'coastal', label: 'Nghỉ dưỡng biển' },
            ].map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    active ? 'bg-[#C5A880] text-[#060913] font-semibold shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Architectural Project Cards Grid with Large Breathing Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayList.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white/[0.02] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl backdrop-blur-sm"
              onClick={() => setSelectedPreviewProject(project)}
            >
              <div>
                {/* Image Showcase */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/50">
                  <Image
                    src={project.image || '/uploads/vinhomes-can-gio.png'}
                    alt={project.title || project.name || 'Dự án Đông Hòa Property'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    {project.featured && (
                      <span className="bg-[#C5A880] text-[#060913] font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-[#060913]" /> Nổi bật
                      </span>
                    )}
                    {(project.category || project.propertyTypes) && (
                      <span className="bg-black/60 backdrop-blur-md text-white/90 text-[10px] px-3 py-1 rounded-full border border-white/15">
                        {project.category || project.propertyTypes}
                      </span>
                    )}
                  </div>

                  {/* Quick View Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-full bg-white/90 text-black text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5" /> Xem nhanh
                    </button>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-7 space-y-4">
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                    {project.title || project.name}
                  </h3>

                  <div className="space-y-2 text-xs text-white/60 font-light">
                    {project.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                    )}
                    {project.scale && (
                      <div className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                        <span className="line-clamp-1">{project.scale}</span>
                      </div>
                    )}
                  </div>

                  {project.description && (
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-light pt-1">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-7 py-5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-[#C5A880] transition-colors uppercase tracking-wider">
                <span>Nhận Tài Liệu Dự Án</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Quick View Modal */}
      {selectedPreviewProject && (
        <ProjectQuickViewModal
          project={selectedPreviewProject}
          isOpen={!!selectedPreviewProject}
          onClose={() => setSelectedPreviewProject(null)}
          onOpenInquiry={onOpenInquiry}
        />
      )}
    </section>
  );
}
