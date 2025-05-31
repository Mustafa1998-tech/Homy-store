"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { products as allProducts, categories } from '@/lib/placeholder-data';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popularity');
  const [activeFilters, setActiveFilters] = useState<{
    category?: string;
    priceRange?: [number, number];
  }>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  useEffect(() => {
    let productsToDisplay = [...allProducts];

    // Apply search term
    if (searchTerm) {
      productsToDisplay = productsToDisplay.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilters.category) {
      productsToDisplay = productsToDisplay.filter(p => p.category.slug === activeFilters.category);
    }

    // Apply price range filter
    if (activeFilters.priceRange) {
      productsToDisplay = productsToDisplay.filter(
        p => p.price >= activeFilters.priceRange![0] && p.price <= activeFilters.priceRange![1]
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'popularity':
        productsToDisplay.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'price-asc':
        productsToDisplay.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        productsToDisplay.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        productsToDisplay.sort((a,b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        productsToDisplay.sort((a,b) => b.name.localeCompare(a.name));
        break;
    }

    setFilteredProducts(productsToDisplay);
  }, [activeFilters, sortOption, searchTerm]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <ProductFilters
              categories={categories}
              onFilterChange={filters => setActiveFilters(filters)}
              maxPrice={Math.max(...allProducts.map(p => p.price))}
            />
          </aside>

          <main className="flex-1">
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
