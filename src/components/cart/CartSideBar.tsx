"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/contexts/CartContext";
import CartItemDisplay from "./CartItem";
import CartSummary from "./CartSummary";
import Link from 'next/link';
import { ShoppingCart, X } from "lucide-react";

export default function CartSideBar() {
  const { cart, isCartOpen, setIsCartOpen, getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-semibold">Your Cart ({itemCount})</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Your cart is empty.</p>
            <p className="text-sm text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <SheetClose asChild>
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href="/products">Start Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow p-6 pr-3">
              <div className="space-y-4">
                {cart.map(item => (
                  <CartItemDisplay key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="p-6 border-t bg-background">
              <CartSummary />
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
