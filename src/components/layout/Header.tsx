
"use client";

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
  // { href: '/categories/womens-fashion', label: 'Women' }, // Example category links
  // { href: '/categories/mens-fashion', label: 'Men' },
];

export default function Header() {
  const { getCartItemCount, toggleCart } = useCart();
  const cartItemCount = getCartItemCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg text-primary hover:text-accent transition-colors">Homey Store</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-accent text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden mr-2">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-3/4 p-4 pt-10 bg-background">
            <Link href="/" className="mb-6 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
               <span className="font-bold text-xl text-primary">Homey Store</span>
            </Link>
            <nav className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg transition-colors hover:text-accent text-foreground/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
               <Link href="/cart" className="text-lg transition-colors hover:text-accent text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>
                Cart
              </Link>
              <Link href="/login" className="text-lg transition-colors hover:text-accent text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>
                Account
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Mobile Logo (visible when menu is closed) */}
        <div className="md:hidden flex-1 flex justify-center">
          {!isMobileMenuOpen && (
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-lg text-primary">Homey Store</span>
            </Link>
          )}
        </div>


        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <form className="hidden md:flex items-center w-full max-w-xs">
            <Input
              type="search"
              placeholder="Search products..."
              className="h-9 text-sm"
            />
            <Button type="submit" size="icon" variant="ghost" className="ml-1 h-9 w-9">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </form>

          <Button variant="ghost" size="icon" onClick={toggleCart} aria-label="Open cart">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>

          <Link href="/login" passHref legacyBehavior>
            <Button variant="ghost" size="icon" aria-label="User account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
