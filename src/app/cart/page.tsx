
"use client";

import MainLayout from '@/components/layout/MainLayout';
import CartItemDisplay from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-10 bg-card p-8 rounded-lg shadow">
            <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <p className="text-xl text-muted-foreground mb-4">Your cart is currently empty.</p>
            <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-card p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
              {cartItems.map(item => (
                <CartItemDisplay key={item.product.id} item={item} />
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="sticky top-24"> {/* Make summary sticky */}
                <CartSummary />
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
