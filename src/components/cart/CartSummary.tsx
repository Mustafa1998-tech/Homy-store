
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';

const TAX_RATE = 0.14; // Example 14% tax rate

export default function CartSummary() {
  const { getCartTotal, clearCart, setIsCartOpen } = useCart();
  const subtotal = getCartTotal();
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + taxes;

  const handleCheckout = () => {
    setIsCartOpen(false); // Close sidebar if open
  };

  return (
    <div className="p-4 bg-secondary/30 dark:bg-secondary/10 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>EGP {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes ({(TAX_RATE * 100).toFixed(0)}%)</span>
          <span>EGP {taxes.toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>EGP {total.toFixed(2)}</span>
        </div>
      </div>
      <Button asChild size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleCheckout}>
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
      <Button variant="outline" className="w-full mt-2" onClick={clearCart}>
        Clear Cart
      </Button>
    </div>
  );
}
