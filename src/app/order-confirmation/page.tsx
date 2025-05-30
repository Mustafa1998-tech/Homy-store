
"use client";

import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="mx-auto bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit mb-4">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl font-bold">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
              You will receive an email confirmation shortly with your order details.
            </CardDescription>
            <div className="space-y-3">
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <Link href="/account/orders">View Order History</Link> 
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
