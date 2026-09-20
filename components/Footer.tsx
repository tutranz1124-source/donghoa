'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneCall, Mail, MapPin, ArrowUp } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-warm-100 text-charcoal border-t border-warm-300 relative z-10 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="relative h-[44px] w-[180px]">
              <Image
                src={settings?.logo || '/uploads/logo-dong-hoa-property.png'}
                alt={settings?.siteName || 'Đông Hòa Property'}
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
              Đơn vị tư vấn và phân phối bất động sản chọn lọc. Đồng hành cùng khách hàng kiến tạo không gian sống chuẩn mực và giá trị đầu tư bền vững.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-charcoal-muted">
              <span>Đông Hòa Property © {new Date().getFullYear()}</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-gold">
              DANH MỤC TRANG
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-700">
              <li>
                <a href="#projects" className="hover:text-gold transition-colors">
                  Dự Án Trọng Điểm
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-gold transition-colors">
                  Phân Khúc Bất Động Sản
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-gold transition-colors">
                  Về Đông Hòa Property
                </a>
              </li>
              <li>
                <a href="#mortgage-calculator" className="hover:text-gold transition-colors">
                  Công Cụ Tính Toán Tài Chính
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">
                  Tin Tức & Thị Trường
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-gold">
              THÔNG TIN LIÊN HỆ
            </h4>
            <ul className="space-y-3 text-sm text-charcoal-700">
              <li className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
                  className="hover:text-gold transition-colors font-mono font-medium"
                >
                  Hotline: {settings?.hotline || '0906.499.279'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`mailto:${settings?.email || 'donghoaproperty@gmail.com'}`}
                  className="hover:text-gold transition-colors"
                >
                  {settings?.email || 'donghoaproperty@gmail.com'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {settings?.address || 'TP. Hồ Chí Minh & các văn phòng đại diện dự án'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Scroll to Top */}
        <div className="mt-14 pt-8 border-t border-warm-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p>Bản quyền thuộc về Công ty Cổ phần Bất Động Sản Đông Hòa (Đông Hòa Property).</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-charcoal hover:text-gold transition-colors font-medium cursor-pointer"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
