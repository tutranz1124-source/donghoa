'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building, ShieldCheck, ArrowRight, PhoneCall, Sparkles, Layers } from 'lucide-react';
import { ProjectItem } from '@/lib/types';

interface ProjectQuickViewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export default function ProjectQuickViewModal({
  project,
  onClose,
  onInquire,
}: ProjectQuickViewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0F19]/70 backdrop-blur-md z-0"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="relative w-full max-w-3xl bg-white border border-warm-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-warm-300 flex items-center justify-center text-charcoal hover:text-charcoal hover:scale-105 transition-all shadow-md group cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
          </button>

          <div className="overflow-y-auto custom-scrollbar">
            {/* Project Cover Image */}
            <div className="relative h-64 sm:h-80 w-full bg-warm-100">
              <Image
                src={project.imageUrl || project.image || '/uploads/the-gio-riverside.png'}
                alt={project.title || project.name || 'Dự án'}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-black/20 pointer-events-none" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <div className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-semibold text-gold border border-warm-200 shadow-warm-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>{project.investor || project.developer || 'Chủ đầu tư uy tín'}</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-light block mb-1">
                  THÔNG TIN CHI TIẾT DỰ ÁN
                </span>
                <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-serif font-medium text-white drop-shadow-sm">
                  {project.title || project.name}
                </h3>
              </div>
            </div>

            {/* Project Details & Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 text-sm text-charcoal-700 bg-warm-50 p-3 rounded-xl border border-warm-200">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span className="font-medium">{project.location}</span>
              </div>

              {project.description && (
                <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-normal">
                  {project.description}
                </p>
              )}

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 p-5 bg-warm-50/80 rounded-2xl border border-warm-200 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="text-charcoal-muted block text-xs">Mức giá tham khảo</span>
                  <span className="font-semibold text-charcoal text-[15px] text-gold">{project.priceRange || project.price || 'Liên hệ'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-charcoal-muted block text-xs">Diện tích tiêu chuẩn</span>
                  <span className="font-semibold text-charcoal text-[14px]">{project.area || 'Đa dạng loại hình'}</span>
                </div>
                {project.scale ? (
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <span className="text-charcoal-muted block text-xs">Quy mô phát triển</span>
                    <span className="font-semibold text-charcoal text-[13px] flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="truncate">{project.scale}</span>
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <span className="text-charcoal-muted block text-xs">Pháp lý dự án</span>
                    <span className="font-semibold text-charcoal text-[13px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Thẩm định minh bạch</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onInquire(`Dự án: ${project.title || project.name}`);
                  }}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-charcoal hover:bg-gold text-white hover:text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md group cursor-pointer"
                >
                  <span>Nhận Bảng Giá & CSBH Chi Tiết</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="tel:0906499279"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-warm-300 hover:border-gold hover:bg-warm-100 text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-gold" />
                  <span>0906.499.279</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
