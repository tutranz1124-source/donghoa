import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Be_Vietnam_Pro, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#060913',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://donghoa-property-one.vercel.app'),
  title: 'Đông Hòa Property | Bất Động Sản Cao Cấp & Kiến Tạo Không Gian Sống',
  description: 'Đông Hòa Property - Đơn vị tư vấn bất động sản cao cấp chọn lọc và cung cấp giải pháp thiết kế, thi công không gian sống chuẩn mực, độc bản.',
  keywords: ['Đông Hòa Property', 'Bất động sản cao cấp', 'Dự án căn hộ hạng sang', 'Biệt thự nghỉ dưỡng', 'Phân phối bất động sản'],
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
    url: 'https://donghoa-property-one.vercel.app',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Đông Hòa Property | Bất Động Sản Cao Cấp',
    description: 'Tư vấn bất động sản cao cấp và đầu tư bền vững.',
    images: ['/uploads/hero_slide_1.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${beVietnam.variable} ${montserrat.variable} scroll-smooth overflow-x-hidden`}
    >
      <body className="font-sans antialiased bg-[#060913] text-white min-h-screen flex flex-col selection:bg-[#C5A880] selection:text-[#060913] overflow-x-hidden w-full relative">
        {children}
      </body>
    </html>
  );
}
