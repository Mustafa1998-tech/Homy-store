import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'Homey Store - متجر هومي',
  description: 'وجهتك الأولى للموضة ومنتجات اللايفستايل في مصر',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${tajawal.variable} font-sans bg-gray-50`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
