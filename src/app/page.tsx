"use client";
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { products as allProducts } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

// Get a selection of products for the homepage (e.g., first 8 or most popular)
const featuredProducts = allProducts
  .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
  .slice(0, 8);

// Category images mapping with optimized image URLs
const categoryImages: Record<string, string> = {
  'womens-fashion': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&q=80&w=800',
  'mens-fashion': 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&q=80&w=800',
  'kids-baby': 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&q=80&w=800',
  'home-living': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&q=80&w=800',
  'beauty-health': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&q=80&w=800',
};

// Preload images for better performance
const preloadImages = () => {
  if (typeof window !== 'undefined') {
    Object.values(categoryImages).forEach(url => {
      const img = document.createElement('img');
      img.src = url;
    });
  }
};

useEffect(() => {
  preloadImages();
}, []);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage(): ReactNode {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              أناقتك تبدأ من هنا
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              اكتشف أحدث صيحات الموضة وأجمل التصاميم العصرية بأسعار مناسبة
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3 bg-white text-primary rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                تسوق الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">الفئات المميزة</h2>
            <p className="text-gray-600">اختر من بين مجموعة متنوعة من الفئات</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['womens-fashion', 'mens-fashion', 'kids-baby'].map((category, index) => (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="relative group overflow-hidden rounded-lg"
              >
                <Link href={`/products?category=${category}`}>
                  <div className="aspect-[4/5] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={categoryImages[category]}
                      alt={category}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                      <h3 className="text-xl font-semibold mb-2">
                        {category === 'womens-fashion' ? 'أزياء نسائية' :
                         category === 'mens-fashion' ? 'أزياء رجالية' :
                         'ملابس أطفال'}
                      </h3>
                      <p className="text-sm text-white/80">تسوق الآن</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">منتجات مميزة</h2>
            <p className="text-gray-600">اكتشف أفضل منتجاتنا وأكثرها مبيعاً</p>
          </motion.div>

          <ProductGrid products={featuredProducts} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              عرض جميع المنتجات
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
