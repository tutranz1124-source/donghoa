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
        if (!el && (targetId === 'services' || targetId === 'projects')) el = document.getElementById('projects');
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
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
        if (!el && (targetId === 'services' || targetId === 'projects')) el = document.getElementById('projects');
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
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

  const navLinks = [
    { label: 'Dự Án', url: '#projects' },
    { label: 'Phân Khúc', url: '#categories' },
    { label: 'Bảng Giá VIP', url: '#private-access' },
    { label: 'Về Chúng Tôi', url: '#philosophy' },
    { label: 'Tin Tức', url: '/blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060913]/95 backdrop-blur-md py-3.5 shadow-2xl border-b border-[#C5A880]/20'
          : 'bg-[#060913]/80 backdrop-blur-sm border-b border-white/10 py-4 lg:py-5'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="relative flex items-center group shrink-0">
          <div className="relative h-[40px] w-[160px] sm:h-[46px] sm:w-[185px] lg:h-[48px] lg:w-[200px] transition-transform duration-300 group-hover:scale-105">
            <Image
              src={settings?.logo || '/uploads/logo-dong-hoa-property.png'}
              alt={settings?.siteName || 'Đông Hòa Property'}
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Spacious Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[13.5px] uppercase tracking-wider font-medium text-white/80">
          {navLinks.map((item, idx) => {
            const isInternalPage = item.url.startsWith('/') && !item.url.startsWith('/#');
            if (isInternalPage) {
              return (
                <Link
                  key={idx}
                  href={item.url}
                  className="relative py-1 cursor-pointer hover:text-[#C5A880] transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
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
                className="relative py-1 cursor-pointer hover:text-[#C5A880] transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Items: Search, Hotline & CTA Button */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <HeaderSearchBar />

          <a
            href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#C5A880] hover:text-white transition-colors whitespace-nowrap group px-2 py-1"
          >
            <PhoneCall className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span className="font-mono tracking-wide">{settings?.hotline || '0906.499.279'}</span>
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
            className="bg-[#C5A880] hover:bg-white text-[#060913] px-5 xl:px-6 py-2.5 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.4)] rounded-full whitespace-nowrap cursor-pointer active:scale-95"
          >
            <span className="font-bold text-[12px] tracking-wider uppercase font-sans">
              Tư Vấn Ngay
            </span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <HeaderSearchBar />

          <a
            href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
            className="w-9 h-9 flex items-center justify-center text-[#C5A880] hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
            title={`Gọi Hotline ${settings?.hotline || '0906.499.279'}`}
          >
            <PhoneCall className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center text-white hover:text-[#C5A880] bg-white/5 border border-white/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060913] border-b border-[#C5A880]/20 px-6 py-6 space-y-5 animate-in slide-in-from-top-4 duration-300">
          <HeaderSearchBar isMobileDrawer={true} />

          <nav className="flex flex-col space-y-1 font-medium text-white text-[15px]">
            {navLinks.map((item, idx) => {
              const isInternalPage = item.url.startsWith('/') && !item.url.startsWith('/#');
              if (isInternalPage) {
                return (
                  <Link
                    key={idx}
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 border-b border-white/10 hover:text-[#C5A880] transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-white/30 text-xs">→</span>
                  </Link>
                );
              }
              return (
                <a
                  key={idx}
                  href={item.url}
                  onClick={(e) => handleNavClick(e, item.url)}
                  className="py-3 border-b border-white/10 hover:text-[#C5A880] transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-white/30 text-xs">→</span>
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
              className="w-full text-center bg-[#C5A880] py-3 font-bold text-[13px] text-[#060913] uppercase tracking-wider hover:bg-white transition-all shadow rounded-lg"
            >
              Nhận Tư Vấn Bất Động Sản
            </button>
            <a
              href={`tel:${(settings.hotline || '0906.499.279').replace(/\D/g, '')}`}
              className="w-full text-center border border-[#C5A880]/40 py-2.5 font-semibold text-[13px] text-[#C5A880] flex items-center justify-center gap-2 hover:bg-[#C5A880]/10 rounded-lg"
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
