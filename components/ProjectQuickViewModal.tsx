'use client';

import React from 'react';
import Image from 'next/image';
import { X, MapPin, Building, ShieldCheck, ArrowRight, Download, Sparkles } from 'lucide-react';
import { ProjectItem } from '@/lib/types';

interface ProjectQuickViewModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: (projectName?: string) => void;
}

export default function ProjectQuickViewModal({
  project,
  isOpen,
  onClose,
  onOpenInquiry,
}: ProjectQuickViewModalProps) {
  if (!isOpen || !project) return null;

  const projectName = project.title || project.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#060913] text-white border border-[#C5A880]/30 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header Image with Badges */}
        <div className="relative w-full h-60 sm:h-72 bg-black/60 shrink-0">
          <Image
            src={project.image || '/uploads/clean_project_thegio.png'}
            alt={projectName}
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-black/40" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Developer badge & Title */}
          <div className="absolute bottom-5 left-6 right-6 space-y-1.5 z-10">
            {project.developer && (
              <span className="inline-block bg-[#C5A880] text-[#060913] font-semibold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full font-sans">
                {project.developer}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl font-serif font-light leading-tight text-white">
              {projectName}
            </h3>
          </div>
        </div>

        {/* Modal Body / Specs */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] p-5 rounded-xl border border-white/10">
            {project.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/50">Vị trí</span>
                  <span className="text-xs sm:text-sm font-medium text-white">{project.location}</span>
                </div>
              </div>
            )}

            {(project.scale || project.area) && (
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/50">Quy mô / Diện tích</span>
                  <span className="text-xs sm:text-sm font-medium text-white">{project.scale || project.area}</span>
                </div>
              </div>
            )}

            {(project.category || project.propertyTypes) && (
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/50">Loại hình phát triển</span>
                  <span className="text-xs sm:text-sm font-medium text-white">{project.category || project.propertyTypes}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/50">Pháp lý & Bàn giao</span>
                <span className="text-xs sm:text-sm font-medium text-white">{project.ownership || 'Sổ hồng lâu dài / Chuẩn quốc tế'}</span>
              </div>
            </div>
          </div>

          {project.description && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider font-sans">
                Giới thiệu dự án
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenInquiry?.(projectName);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#C5A880] hover:bg-white text-[#060913] font-semibold text-xs tracking-wider uppercase rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Nhận Báo Giá & Mặt Bằng</span>
              <ArrowRight className="w-4 h-4 text-[#060913]" />
            </button>

            <button
              type="button"
              onClick={() => {
                alert(`Tài liệu Brochure dự án ${projectName} đã được gửi đến email chuyên viên tư vấn.`);
              }}
              className="w-full sm:w-auto px-5 py-3 border border-white/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Brochure PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
