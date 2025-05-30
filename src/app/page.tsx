
"use client";
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { products as allProducts } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Get a selection of products for the homepage (e.g., first 8 or most popular)
const featuredProducts = allProducts.sort((a,b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 8);

export default function HomePage() {
  return (
    <MainLayout>
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-rose-50 via-blush-50 to-purple-50 dark:from-rose-900/30 dark:via-blush-900/30 dark:to-purple-900/30 rounded-lg shadow-inner mb-12">
        <div className="container mx-auto px-4">
           <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Promotional Banner"
            width={1200}
            height={400}
            className="rounded-lg mb-8 object-cover aspect-[3/1] w-full"
            data-ai-hint="fashion lifestyle"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
            Welcome to Homey Store
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover the latest trends in fashion, right here in Egypt. Quality products, amazing prices.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <Link href="/products">View More</Link>
          </Button>
        </div>
      </section>
      
      {/* Example Categories Section */}
      <section className="py-12 bg-secondary/30 dark:bg-secondary/10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {allProducts.slice(0,5).map(p => p.category).filter((c,i,self) => i === self.findIndex(s => s.id === c.id)).map(category => (
            <Link key={category.id} href={`/products?category=${category.slug}`} passHref>
              <div className="block p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <h3 className="font-semibold text-lg text-primary">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
