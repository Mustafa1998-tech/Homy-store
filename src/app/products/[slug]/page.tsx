"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { products as allProducts } from '@/lib/placeholder-data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/products/ProductGrid';
import { useState, useEffect, useMemo } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCartFeedback, setAddedToCartFeedback] = useState(false);

  // Memoize product and related products
  const { currentProduct, related } = useMemo(() => {
    const currentProduct = allProducts.find(p => p.slug === slug);
    const related = currentProduct
      ? allProducts
          .filter(p => p.category.id === currentProduct.category.id && p.id !== currentProduct.id)
          .slice(0, 4)
      : [];
    return { currentProduct, related };
  }, [slug]);

  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
      setRelatedProducts(related);
      
      // Preload related product images
      if (typeof window !== 'undefined') {
        related.forEach(product => {
          const img = document.createElement('img');
          img.src = product.imageUrl;
        });
      }
    }
  }, [currentProduct, related]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCartFeedback(true);
      setTimeout(() => setAddedToCartFeedback(false), 2000);
    }
  };

  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">Product not found.</p>
          <Button variant="link" asChild className="mt-4">
            <a href="/products"><ArrowLeft className="mr-2 h-4 w-4" /> Back to products</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              data-ai-hint={product.dataAiHint}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary">EGP {product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < (product.popularity || 0) / 20 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm text-muted-foreground">
                ({Math.round((product.popularity || 0) / 10)} reviews)
              </span>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  variant="outline"
                  size="icon"
                >
                  -
                </Button>
                <span className="text-lg font-medium">{quantity}</span>
                <Button
                  onClick={() => setQuantity(q => q + 1)}
                  variant="outline"
                  size="icon"
                >
                  +
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
                disabled={addedToCartFeedback}
              >
                {addedToCartFeedback ? (
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Added to Cart
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

// This is for generating static paths if you're using SSG for product pages.
// For a fully dynamic app, this might not be needed or would fetch from an API.
export async function generateStaticParams() {
  return allProducts.map(product => ({
    slug: product.slug,
  }));
}

// Helper Label component if not already globally available
const Label = ({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}>
    {children}
  </label>
);
