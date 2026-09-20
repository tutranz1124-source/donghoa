'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings } from '@/lib/types';
import { Phone, Mail, MapPin, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] text-white border-t border-white/10">
      {/* Top Footer Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-5 space-y-6">
          <div className="relative h-[48px] w-[190px] sm:h-[56px] sm:w-[220px]">
            <Image
              src={settings?.logo || '/uploads/logo-dong-hoa-property.png'}
              alt={settings?.siteName || 'Đông Hòa Property'}
              fill
              className="object-contain object-left"
            />
          </div>

          <p className="text-sm text-white/70 leading-relaxed font-light max-w-md">
            {settings?.siteDescription ||
              'Đông Hòa Property là đơn vị tư vấn và phân phối bất động sản cao cấp, mang đến những quỹ căn độc bản với tiềm năng gia tăng giá trị bền vững qua nhiều thế hệ.'}
          </p>
        </div>

        {/* Contact Info Column */}
        <div className="col-span-1 md:col-span-4 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] font-sans">
            THÔNG TIN LIÊN HỆ
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-light">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>{settings?.address || '113-115 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, TP Hồ Chí Minh, Việt Nam'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
              <a
                href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
                className="hover:text-[#C5A880] transition-colors font-medium text-white"
              >
                Hotline: {settings?.hotline || '0906.499.279'}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
              <a
                href={`mailto:${settings?.email || 'info@donghoagroup.vn'}`}
                className="hover:text-[#C5A880] transition-colors"
              >
                Email: {settings?.email || 'info@donghoagroup.vn'}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#C5A880] shrink-0" />
              <a
                href={
                  settings?.website?.startsWith('http')
                    ? settings.website
                    : `https://${settings?.website || 'www.DongHoaGroup.vn'}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C5A880] transition-colors"
              >
                Website: {settings?.website || 'www.DongHoaGroup.vn'}
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] font-sans">
            DANH MỤC TRỌNG TÂM
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-light">
            <li>
              <a href="#categories" className="hover:text-[#C5A880] transition-colors">
                Phân khúc bất động sản
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-[#C5A880] transition-colors">
                Dự án nổi bật
              </a>
            </li>
            <li>
              <a href="#mortgage-calculator" className="hover:text-[#C5A880] transition-colors">
                Công cụ tính tài chính
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#C5A880] transition-colors">
                Giải đáp pháp lý & đầu tư
              </a>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#C5A880] transition-colors">
                Tin tức thị trường BĐS
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Đông Hòa Property. Bản quyền thuộc về Đông Hòa Group.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white/70 hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
