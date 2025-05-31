import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from "@/components/ui/toaster";
import CartSideBar from '@/components/cart/CartSideBar';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <CartSideBar />
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
