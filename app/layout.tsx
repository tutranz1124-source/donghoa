import type { Metadata, Viewport } from 'next';
import { Montserrat, Manrope, Alex_Brush } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#04092b',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://donghoa-property.vercel.app'),
  title: 'Đông Hòa Property | Bất Động Sản Cao Cấp & Kiến Tạo Không Gian Sống',
  description: 'Đông Hòa Property - Đơn vị tư vấn bất động sản cao cấp chọn lọc và cung cấp giải pháp thiết kế, thi công không gian sống chuẩn mực, độc bản.',
  keywords: ['Đông Hòa Property', 'Bất động sản cao cấp', 'Dự án căn hộ hạng sang', 'Biệt thự nghỉ dưỡng', 'Thiết kế thi công trọn gói'],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Đông Hòa Property | Bất Động Sản Cao Cấp & Kiến Tạo Không Gian Sống',
    description: 'Đông Hòa Property - Đơn vị tư vấn bất động sản cao cấp chọn lọc và cung cấp giải pháp thiết kế, thi công không gian sống chuẩn mực, độc bản.',
    url: 'https://donghoa-property.vercel.app',
    siteName: 'Đông Hòa Property',
    images: [
      {
        url: '/uploads/hero_slide_1.png',
        width: 1200,
        height: 630,
        alt: 'Đông Hòa Property',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
};

import FloatingContact from '@/components/FloatingContact';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${montserrat.variable} ${manrope.variable} ${alexBrush.variable} scroll-smooth overflow-x-hidden`}>
      <body className="font-sans antialiased bg-[#f4f1ea] text-[#2d302e] min-h-screen flex flex-col selection:bg-[#c5a26c] selection:text-white overflow-x-hidden w-full relative">
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
