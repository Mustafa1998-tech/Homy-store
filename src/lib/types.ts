
export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  slug: string;
  popularity?: number; // Optional: 0-100
  dataAiHint?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: Date;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: any; // Define more detailed address type if needed
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  address?: string; // Optional
  // Potentially more fields like phone number, etc.
};
