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
    <footer className="bg-[#04092b] text-white border-t border-[#c5a26c]/30">
      {/* Top Footer Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-5 space-y-4 sm:space-y-6">
          <div className="relative h-[48px] w-[190px] sm:h-[56px] sm:w-[220px]">
            <Image
              src={settings?.logo || '/uploads/logo-dong-hoa-property.png'}
              alt={settings?.siteName || 'Đông Hòa Property'}
              fill
              className="object-contain object-left"
            />
          </div>

          <p className="text-[14px] text-white/80 leading-relaxed font-light max-w-md">
            {settings?.siteDescription ||
              'Đông Hòa Property cung cấp danh mục bất động sản chọn lọc cùng giải pháp thiết kế - thi công không gian sống chuẩn mực và nâng tầm giá trị cho từng công trình.'}
          </p>
        </div>

        {/* Contact Info Column */}
        <div className="col-span-1 md:col-span-4 space-y-3 sm:space-y-4">
          <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#c5a26c] font-accent">
            THÔNG TIN LIÊN HỆ
          </h4>
          <ul className="space-y-3 text-[13.5px] text-white/85 font-light">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#c5a26c] shrink-0 mt-0.5" />
              <span>{settings?.address || '113-115 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, TP Hồ Chí Minh, Việt Nam'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#c5a26c] shrink-0" />
              <a
                href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
                className="hover:text-[#c5a26c] transition-colors font-medium"
              >
                Hotline: {settings?.hotline || '0906.499.279'}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#c5a26c] shrink-0" />
              <a
                href={`mailto:${settings?.email || 'info@donghoagroup.vn'}`}
                className="hover:text-[#c5a26c] transition-colors"
              >
                Email: {settings?.email || 'info@donghoagroup.vn'}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#c5a26c] shrink-0" />
              <a
                href={
                  settings?.website?.startsWith('http')
                    ? settings.website
                    : `https://${settings?.website || 'www.DongHoaGroup.vn'}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c5a26c] transition-colors"
              >
                Website: {settings?.website || 'www.DongHoaGroup.vn'}
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="col-span-1 md:col-span-3 space-y-3 sm:space-y-4">
          <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#c5a26c] font-accent">
            DANH MỤC
          </h4>
          <ul className="space-y-2.5 text-[13.5px] text-white/80 font-light">
            <li>
              <Link href="#projects" className="hover:text-[#c5a26c] transition-colors">
                Danh mục dự án
              </Link>
            </li>
            <li>
              <Link href="#styles" className="hover:text-[#c5a26c] transition-colors">
                Phong cách thiết kế
              </Link>
            </li>
            <li>
              <Link href="#office" className="hover:text-[#c5a26c] transition-colors">
                Không gian văn phòng
              </Link>
            </li>
            <li>
              <Link href="#philosophy" className="hover:text-[#c5a26c] transition-colors">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#c5a26c] transition-colors">
                Tin tức & Cẩm nang
              </Link>
            </li>
            <li>
              <a href="#contact" className="text-[#c5a26c] hover:underline font-medium">
                Đăng ký nhận tư vấn →
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-8 lg:px-20 bg-[#03061f]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/60">
          <p>{settings?.copyright || '© 2026 Đông Hòa Property - Dong Hoa Group. All rights reserved.'}</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#c5a26c] transition-colors text-white/80"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
