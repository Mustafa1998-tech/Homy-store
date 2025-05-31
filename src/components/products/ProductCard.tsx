"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${product.name} إلى سلة التسوق`,
    });
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Product Image with Hover Zoom */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </Link>

      {/* Quick Actions */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        <button
          className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
          aria-label="أضف للمفضلة"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <span className="text-primary font-bold">{product.price.toFixed(2)} جنيه</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 min-h-[40px]">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <div className="pt-2">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-white gap-2 group/btn"
          >
            <ShoppingCart className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform" />
            أضف للسلة
          </Button>
        </div>
      </div>

      {/* Popularity Badge */}
      {product.popularity >= 90 && (
        <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium transform -rotate-12">
          الأكثر مبيعاً
        </div>
      )}
    </div>
  );
}
