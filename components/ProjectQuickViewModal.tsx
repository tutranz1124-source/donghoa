'use client';

import React from 'react';
import Image from 'next/image';
import { X, MapPin, Building, ShieldCheck, ArrowRight } from 'lucide-react';
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
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white border border-warm-200 rounded-3xl shadow-warm-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-warm-200 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-all shadow-warm-sm"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Project Image */}
          <div className="relative h-64 sm:h-80 w-full bg-warm-100">
            <Image
              src={project.imageUrl || project.image || '/uploads/clean_project_thegio.png'}
              alt={project.title || project.name || 'Dự án'}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-semibold text-gold border border-warm-200 shadow-warm-sm">
              {project.investor || 'Chủ đầu tư uy tín'}
            </div>
          </div>

          {/* Project Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-semibold text-gold uppercase tracking-wider block mb-1">
                THÔNG TIN CHI TIẾT DỰ ÁN
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-charcoal-600 mt-2">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>{project.location}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-warm-50 rounded-2xl border border-warm-200 text-xs sm:text-sm">
              <div>
                <span className="text-charcoal-muted block text-xs">Mức giá tham khảo</span>
                <span className="font-semibold text-charcoal mt-1 block">{project.priceRange || 'Liên hệ'}</span>
              </div>
              <div>
                <span className="text-charcoal-muted block text-xs">Diện tích tiêu chuẩn</span>
                <span className="font-semibold text-charcoal mt-1 block">{project.area || 'Đa dạng loại hình'}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-charcoal-muted block text-xs">Pháp lý dự án</span>
                <span className="font-semibold text-charcoal mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Thẩm định chuẩn mực</span>
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onInquire(project.title || project.name || 'Dự án')}
                className="w-full sm:flex-1 py-3.5 rounded-full bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-warm-sm"
              >
                <span>Nhận tư vấn chi tiết</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-warm-300 hover:bg-warm-100 text-charcoal text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
