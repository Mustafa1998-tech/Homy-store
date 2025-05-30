
"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from "@/hooks/use-toast";

const TAX_RATE = 0.14; // Example 14% tax rate

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Egypt', // Default to Egypt
  });

  const subtotal = getCartTotal();
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details.",
        variant: "destructive",
      });
      return;
    }
    if (cartItems.length === 0) {
       toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checking out.",
        variant: "destructive",
      });
      router.push('/products');
      return;
    }
    
    console.log('Order submitted:', { formData, cartItems, total });
    // Here you would typically send data to a backend and payment gateway
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push('/order-confirmation'); // Redirect to an order confirmation page
  };

  if (cartItems.length === 0 && subtotal === 0) { // Check if cart was cleared or initially empty
    // Allow a brief moment for router to redirect if cart cleared on successful order
    // Otherwise, if user lands here with empty cart, guide them.
    if(typeof window !== 'undefined' && window.location.pathname === '/checkout'){
         setTimeout(() => {
            if (cartItems.length === 0){ // re-check after timeout
                 router.push('/products');
                 toast({
                    title: "Your cart is empty",
                    description: "Redirecting you to continue shopping.",
                    variant: "default"
                });
            }
        }, 500);
    }
    return (
        <MainLayout>
            <div className="text-center py-20">Loading checkout or redirecting...</div>
        </MainLayout>
    );
  }


  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleSubmitOrder} className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.country} onChange={handleInputChange} disabled />
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between py-2 border-b last:border-none">
                    <div className="flex items-center">
                      <Image src={item.product.imageUrl} alt={item.product.name} width={40} height={50} className="rounded object-cover mr-3" data-ai-hint={item.product.dataAiHint} />
                      <div>
                        <p className="text-sm font-medium truncate w-32">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm">EGP {(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator className="my-3" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>EGP {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>EGP {taxes.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>EGP {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Pay EGP {total.toFixed(2)}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
