'use client';

import React from 'react';
import Image from 'next/image';
import { X, MapPin, Building, ShieldCheck, Calendar, ArrowRight, Download, PhoneCall, Sparkles } from 'lucide-react';
import { ProjectItem } from '@/lib/types';

interface ProjectQuickViewModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (projectName: string) => void;
}

export default function ProjectQuickViewModal({
  project,
  isOpen,
  onClose,
  onOpenInquiry,
}: ProjectQuickViewModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-[#e2ddd3] shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header Image with Badges */}
        <div className="relative w-full h-56 sm:h-64 bg-[#04092b] shrink-0">
          <Image
            src={project.image || '/uploads/clean_project_thegio.png'}
            alt={project.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Developer badge & Title */}
          <div className="absolute bottom-4 left-4 right-4 space-y-1 text-white z-10">
            {project.developer && (
              <span className="inline-block bg-[#c5a26c] text-[#04092b] font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-accent">
                {project.developer}
              </span>
            )}
            <h3 className="text-[22px] sm:text-[26px] font-semibold font-display leading-tight">
              {project.name}
            </h3>
          </div>
        </div>

        {/* Modal Body / Specs */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#2d302e]">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#faf8f5] p-4 rounded-xl border border-[#e2ddd3]">
            {project.location && (
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a26c] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-bold uppercase text-[#6e706a]">Vị trí</span>
                  <span className="text-[13px] font-medium text-[#04092b]">{project.location}</span>
                </div>
              </div>
            )}

            {project.area && (
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-[#c5a26c] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-bold uppercase text-[#6e706a]">Quy mô / Diện tích</span>
                  <span className="text-[13px] font-medium text-[#04092b]">{project.area}</span>
                </div>
              </div>
            )}

            {project.propertyTypes && (
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#c5a26c] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-bold uppercase text-[#6e706a]">Loại hình phát triển</span>
                  <span className="text-[13px] font-medium text-[#04092b]">{project.propertyTypes}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#c5a26c] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold uppercase text-[#6e706a]">Pháp lý & Bàn giao</span>
                <span className="text-[13px] font-medium text-[#04092b]">Sổ hồng lâu dài / Chuẩn quốc tế</span>
              </div>
            </div>
          </div>

          {/* Value Proposition Note */}
          <p className="text-[13.5px] text-[#5f6361] font-light leading-relaxed">
            Dự án nằm trong quỹ đất kim cương trọng điểm được Đông Hòa Property độc quyền phân phối và tuyển chọn. Khách hàng nhận ngay chính sách ưu đãi chiết khấu trực tiếp và hỗ trợ lãi suất 0% từ các đối tác ngân hàng chiến lược.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-[#faf8f5] border-t border-[#e2ddd3] flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href="tel:0906499279"
            className="flex items-center gap-2 text-[13px] font-bold text-[#04092b] hover:text-[#c5a26c] transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#c5a26c]" />
            <span>Hotline KTS / Cố vấn: 0906.499.279</span>
          </a>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenInquiry(project.name);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#04092b] hover:bg-[#c5a26c] hover:text-[#04092b] text-white font-bold text-[12.5px] uppercase tracking-wider rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Nhận Mặt Bằng & Báo Giá</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

