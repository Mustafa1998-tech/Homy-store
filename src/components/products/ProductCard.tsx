
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation if card itself is a link
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className={cn("overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group", className)}>
      <Link href={`/products/${product.slug}`} passHref legacyBehavior>
        <a className="block">
          <CardHeader className="p-0">
            <div className="aspect-[3/4] relative w-full overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={product.dataAiHint}
              />
            </div>
          </CardHeader>
        </a>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.slug}`} passHref legacyBehavior>
          <a>
            <CardTitle className="text-lg font-semibold hover:text-accent transition-colors truncate">{product.name}</CardTitle>
          </a>
        </Link>
        <CardDescription className="mt-1 text-sm text-muted-foreground h-10 overflow-hidden text-ellipsis">
          {product.description}
        </CardDescription>
        <p className="mt-2 text-base font-bold text-primary">
          EGP {product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors" 
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
