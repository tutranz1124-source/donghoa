'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, PhoneCall } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import HeaderSearchBar from './HeaderSearchBar';

interface NavbarProps {
  settings: SiteSettings;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

export default function Navbar({ settings, onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll when navigating to hash from external pages
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        let el = document.getElementById(targetId);
        if (!el && targetId === 'about') el = document.getElementById('philosophy');
        if (!el && (targetId === 'services' || targetId === 'projects')) el = document.getElementById('office');
        if (el) {
          const headerOffset = 85;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('#')) {
      e.preventDefault();
      const targetId = url.replace('#', '');
      if (isHome) {
        let el = document.getElementById(targetId);
        if (!el && targetId === 'about') el = document.getElementById('philosophy');
        if (!el && (targetId === 'services' || targetId === 'projects')) el = document.getElementById('office');
        if (el) {
          const headerOffset = 85;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        router.push(`/${url}`);
      }
      setMobileMenuOpen(false);
    } else if (url.startsWith('/')) {
      setMobileMenuOpen(false);
    }
  };

  const navLinks = settings?.navLinks?.length
    ? settings.navLinks
    : [
        { label: 'Về chúng tôi', url: '#philosophy' },
        { label: 'Phân khúc', url: '#categories' },
        { label: 'Dự án trọng điểm', url: '#projects' },
        { label: 'Bảng giá VIP', url: '#private-access' },
        { label: 'Tin tức thị trường', url: '/blog' },
        { label: 'Liên hệ', url: '#contact' },
      ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060913]/95 backdrop-blur-md py-3.5 shadow-2xl border-b border-[#C5A880]/20'
          : 'bg-[#060913]/80 backdrop-blur-sm border-b border-white/10 py-4 lg:py-5'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center group">
          <div className="relative h-[42px] w-[170px] sm:h-[48px] sm:w-[195px] lg:h-[52px] lg:w-[215px] transition-transform duration-300 group-hover:scale-105">
            <Image
              src={settings?.logo || '/uploads/logo-dong-hoa-property.png'}
              alt={settings?.siteName || 'Đông Hòa Property'}
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-9 text-[14px] lg:text-[14.5px] font-medium text-white">
          {navLinks.map((item, idx) => {
            const isInternalPage = item.url.startsWith('/') && !item.url.startsWith('/#');
            if (isInternalPage) {
              return (
                <Link
                  key={idx}
                  href={item.url}
                  className="relative py-1 cursor-pointer hover:text-[#c5a26c] transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#c5a26c] hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <a
                key={idx}
                href={item.url}
                onClick={(e) => handleNavClick(e, item.url)}
                className="relative py-1 cursor-pointer hover:text-[#c5a26c] transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#c5a26c] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button: Search Bar, Consultation CTA & Phone */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          <HeaderSearchBar />

          <a
            href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#c5a26c] hover:text-white transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{settings?.hotline || '0906.499.279'}</span>
          </a>

          <button
            type="button"
            onClick={(e) => {
              if (onOpenInquiry) {
                onOpenInquiry();
              } else {
                handleNavClick(e as any, '#contact');
              }
            }}
            className="group bg-[#c5a26c] hover:bg-white text-[#04092b] px-5 xl:px-6 py-2.5 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg rounded-sm whitespace-nowrap cursor-pointer"
          >
            <span className="font-semibold text-[12px] xl:text-[12.5px] uppercase tracking-wider font-accent">
              Tư Vấn Ngay
            </span>
          </button>
        </div>

        {/* Mobile Actions: Search, Phone & Menu Button */}
        <div className="flex items-center gap-1 sm:gap-2 lg:hidden z-10">
          <HeaderSearchBar />

          <a
            href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#c5a26c] hover:text-white rounded-lg transition-colors"
            title={`Gọi Hotline ${settings?.hotline || '0906.499.279'}`}
          >
            <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a26c]" strokeWidth={2} />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white hover:text-[#c5a26c] focus:outline-none rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060913] border-b border-[#C5A880]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          {/* Mobile Search inside Drawer */}
          <div className="pb-1">
            <HeaderSearchBar isMobileDrawer={true} />
          </div>

          <nav className="flex flex-col space-y-3 font-medium text-white text-[15px]">
            {navLinks.map((item, idx) => {
              const isInternalPage = item.url.startsWith('/') && !item.url.startsWith('/#');
              if (isInternalPage) {
                return (
                  <Link
                    key={idx}
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 border-b border-white/10 hover:text-[#C5A880] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={idx}
                  href={item.url}
                  onClick={(e) => handleNavClick(e, item.url)}
                  className="py-2 border-b border-white/10 hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenInquiry) {
                  onOpenInquiry();
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full text-center bg-[#C5A880] py-3 font-semibold text-[13px] text-[#060913] uppercase tracking-wider hover:bg-white transition-all shadow rounded-sm cursor-pointer"
            >
              Nhận Tư Vấn Bất Động Sản
            </button>
            <a
              href={`tel:${(settings.hotline || '0906.499.279').replace(/\D/g, '')}`}
              className="w-full text-center border border-[#C5A880]/40 py-2.5 font-semibold text-[13px] text-[#C5A880] flex items-center justify-center gap-2 hover:bg-[#C5A880]/10 rounded-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hotline: {settings.hotline || '0906.499.279'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
