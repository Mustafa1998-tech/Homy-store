
"use client";

import Image from 'next/image';
import type { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

type CartItemProps = {
  item: CartItemType;
};

export default function CartItemDisplay({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className="flex items-center py-4 border-b last:border-b-0">
      <Link href={`/products/${item.product.slug}`} passHref legacyBehavior>
        <a className="flex-shrink-0">
          <Image
            src={item.product.imageUrl}
            alt={item.product.name}
            width={80}
            height={100}
            className="rounded-md object-cover aspect-[4/5]"
            data-ai-hint={item.product.dataAiHint}
          />
        </a>
      </Link>
      <div className="ml-4 flex-grow">
        <Link href={`/products/${item.product.slug}`} passHref legacyBehavior>
          <a className="hover:text-accent transition-colors">
            <h3 className="text-base font-medium">{item.product.name}</h3>
          </a>
        </Link>
        <p className="text-sm text-muted-foreground">EGP {item.product.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
            className="h-8 w-12 text-center mx-1 border-t border-b focus:ring-0"
            aria-label="Item quantity"
          />
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="ml-4 flex flex-col items-end">
        <p className="text-base font-medium">EGP {(item.product.price * item.quantity).toFixed(2)}</p>
        <Button variant="ghost" size="icon" onClick={handleRemove} className="mt-2 text-muted-foreground hover:text-destructive" aria-label="Remove item">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
