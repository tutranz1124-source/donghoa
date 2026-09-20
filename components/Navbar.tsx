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
    { label: 'Về Đông Hòa', url: '#philosophy' },
    { label: 'Tin Tức', url: '/blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md py-3 shadow-warm-sm border-b border-[#E8E3DA]'
          : 'bg-[#FAF8F5]/80 backdrop-blur-sm border-b border-[#E8E3DA]/80 py-4 lg:py-4.5'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="relative flex items-center group shrink-0">
          <div className="relative h-[38px] w-[150px] sm:h-[44px] sm:w-[175px] lg:h-[46px] lg:w-[190px] transition-transform duration-300 group-hover:scale-105">
            <Image
              src={settings?.logo || '/uploads/logo-dong-hoa-property.png'}
              alt={settings?.siteName || 'Đông Hòa Property'}
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Quiet Minimalist Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-11 text-[13.5px] uppercase tracking-wider font-medium text-charcoal-700">
          {navLinks.map((item, idx) => {
            const isInternalPage = item.url.startsWith('/') && !item.url.startsWith('/#');
            if (isInternalPage) {
              return (
                <Link
                  key={idx}
                  href={item.url}
                  className="relative py-1 cursor-pointer hover:text-charcoal transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
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
                className="relative py-1 cursor-pointer hover:text-charcoal transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Items: Search, Hotline & Refined CTA */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <HeaderSearchBar />

          <a
            href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
            className="flex items-center gap-2 text-[13px] font-medium text-charcoal-700 hover:text-gold transition-colors whitespace-nowrap group px-2 py-1"
          >
            <PhoneCall className="w-3.5 h-3.5 text-gold transition-transform group-hover:scale-110" />
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
            className="bg-charcoal hover:bg-gold text-white px-5 xl:px-6 py-2.5 transition-all duration-300 flex items-center justify-center gap-2 shadow-warm-sm rounded-full whitespace-nowrap cursor-pointer active:scale-95"
          >
            <span className="font-semibold text-[12px] tracking-wider uppercase font-sans">
              Liên Hệ Tư Vấn
            </span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <HeaderSearchBar />

          <a
            href={`tel:${(settings?.hotline || '0906.499.279').replace(/\D/g, '')}`}
            className="w-9 h-9 flex items-center justify-center text-charcoal rounded-full bg-warm-100 border border-warm-200 transition-colors"
            title={`Gọi Hotline ${settings?.hotline || '0906.499.279'}`}
          >
            <PhoneCall className="w-4 h-4 text-gold" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center text-charcoal bg-warm-100 border border-warm-200 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-warm-200 px-6 py-6 space-y-5 animate-in slide-in-from-top-4 duration-300 shadow-warm-md">
          <HeaderSearchBar isMobileDrawer={true} />

          <nav className="flex flex-col space-y-1 font-medium text-charcoal text-[15px]">
            {navLinks.map((item, idx) => {
              const isInternalPage = item.url.startsWith('/') && !item.url.startsWith('/#');
              if (isInternalPage) {
                return (
                  <Link
                    key={idx}
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 border-b border-warm-100 hover:text-gold transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-charcoal-muted text-xs">→</span>
                  </Link>
                );
              }
              return (
                <a
                  key={idx}
                  href={item.url}
                  onClick={(e) => handleNavClick(e, item.url)}
                  className="py-3 border-b border-warm-100 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-charcoal-muted text-xs">→</span>
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
              className="w-full text-center bg-charcoal py-3 font-semibold text-[13px] text-white uppercase tracking-wider hover:bg-gold transition-all shadow-warm-sm rounded-lg"
            >
              Liên Hệ Tư Vấn Trực Tiếp
            </button>
            <a
              href={`tel:${(settings.hotline || '0906.499.279').replace(/\D/g, '')}`}
              className="w-full text-center border border-warm-300 py-2.5 font-medium text-[13px] text-charcoal flex items-center justify-center gap-2 hover:bg-warm-50 rounded-lg"
            >
              <PhoneCall className="w-4 h-4 text-gold" />
              <span>Hotline: {settings.hotline || '0906.499.279'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
