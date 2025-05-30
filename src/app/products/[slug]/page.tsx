
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
import { useState, useEffect } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCartFeedback, setAddedToCartFeedback] = useState(false);

  useEffect(() => {
    const currentProduct = allProducts.find(p => p.slug === slug);
    if (currentProduct) {
      setProduct(currentProduct);
      const related = allProducts.filter(p => p.category.id === currentProduct.category.id && p.id !== currentProduct.id).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [slug]);


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

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCartFeedback(true);
    setTimeout(() => setAddedToCartFeedback(false), 2000); // Reset feedback after 2 seconds
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => window.history.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                data-ai-hint={product.dataAiHint}
              />
            </div>
          </Card>

          <div className="flex flex-col justify-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl lg:text-4xl font-bold">{product.name}</CardTitle>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor((product.popularity || 70) / 20) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">({ (product.popularity || 0) % 13 + 5} reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-foreground/80 leading-relaxed mt-2 mb-4">
                  {product.description}
                </CardDescription>
                <p className="text-3xl font-semibold text-primary mb-6">
                  EGP {product.price.toFixed(2)}
                </p>
                
                <div className="flex items-center space-x-3 mb-6">
                  <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} className="h-8 w-8 rounded-r-none" aria-label="Decrease quantity">
                      -
                    </Button>
                    <input 
                      id="quantity"
                      type="number" 
                      value={quantity} 
                      readOnly 
                      className="w-12 h-8 text-center border-none focus:ring-0 bg-transparent" 
                      aria-label="Current quantity"
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="h-8 w-8 rounded-l-none" aria-label="Increase quantity">
                      +
                    </Button>
                  </div>
                </div>

              </CardContent>
              <CardFooter>
                <Button 
                  size="lg" 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 ease-in-out"
                  onClick={handleAddToCart}
                  disabled={addedToCartFeedback}
                >
                  {addedToCartFeedback ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5 animate-pulse" /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </section>
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
