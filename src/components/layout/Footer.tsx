import { Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const phoneNumber = "+201157374628";
  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{phoneNumber}</span>
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                href="/products"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                All Products
              </Link>
              <Link 
                href="/cart"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-lg mb-4">About Homey Store</h3>
            <p className="text-muted-foreground">
              Your premier destination for fashion and lifestyle products in Egypt.
            </p>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Homey Store (Homey مصر). All rights reserved.</p>
          <p className="mt-1">Inspired by modern e-commerce, built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
