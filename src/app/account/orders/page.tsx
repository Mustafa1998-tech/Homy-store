
"use client";

import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';
import type { Order } from '@/lib/types'; // Assuming Order type is defined
import { useState, useEffect } from 'react';

// Mock order data
const mockOrders: Order[] = [
  {
    id: 'ORD001',
    items: [
      { product: { id: '1', name: 'Elegant Floral Print Dress', price: 299.99, imageUrl: 'https://placehold.co/60x80.png', category: {id: '1', name: 'Womens', slug: 'womens'}, slug: 'p1', dataAiHint: 'dress' }, quantity: 1 },
      { product: { id: '2', name: 'Casual Striped T-Shirt', price: 149.50, imageUrl: 'https://placehold.co/60x80.png', category: {id: '1', name: 'Womens', slug: 'womens'}, slug: 'p2', dataAiHint: 't-shirt' }, quantity: 2 },
    ],
    totalAmount: 598.99,
    orderDate: new Date('2023-10-26'),
    status: 'Delivered',
    shippingAddress: { street: '123 Nile St', city: 'Cairo', country: 'Egypt' }
  },
  {
    id: 'ORD002',
    items: [
      { product: { id: '3', name: 'Slim Fit Denim Jeans', price: 349.00, imageUrl: 'https://placehold.co/60x80.png', category: {id: '2', name: 'Mens', slug: 'mens'}, slug: 'p3', dataAiHint: 'jeans' }, quantity: 1 },
    ],
    totalAmount: 349.00,
    orderDate: new Date('2023-11-05'),
    status: 'Shipped',
    shippingAddress: { street: '456 Sphinx Ave', city: 'Giza', country: 'Egypt' }
  },
];


export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Order History</h1>
          <Button variant="outline" asChild>
            <Link href="/account"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Account</Link>
          </Button>
        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">No Orders Yet</CardTitle>
              <CardDescription className="mb-6">You haven't placed any orders with us.</CardDescription>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <CardTitle className="text-lg">Order ID: {order.id}</CardTitle>
                    <p className={`text-sm font-medium mt-1 sm:mt-0 px-2 py-0.5 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>{order.status}</p>
                  </div>
                  <CardDescription>
                    Date: {new Date(order.orderDate).toLocaleDateString()} | Total: EGP {order.totalAmount.toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {order.items.map(item => (
                      <li key={item.product.id} className="flex justify-between items-center text-sm">
                        <span>{item.product.name} (x{item.quantity})</span>
                        <span>EGP {(item.product.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="mt-3 p-0 h-auto text-sm">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
