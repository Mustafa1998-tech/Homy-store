
"use client";

import { useState, useEffect, useMemo } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import ProductSort, { type SortOption } from '@/components/products/ProductSort';
import { products as allProducts, categories as allCategories } from '@/lib/placeholder-data';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [activeFilters, setActiveFilters] = useState<{ category?: string; priceRange?: [number, number] }>({});
  const [sortOption, setSortOption] = useState<SortOption>('popularity');
  const [searchTerm, setSearchTerm] = useState('');

  const maxPrice = useMemo(() => {
    return allProducts.reduce((max, p) => (p.price > max ? p.price : max), 0);
  }, []);

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

  const handleFilterChange = (filters: { category?: string; priceRange?: [number, number] }) => {
    setActiveFilters(filters);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-4">
          Our Products
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search all products..."
            className="w-full pl-10 pr-4 py-2 text-base"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters 
            categories={allCategories} 
            onFilterChange={handleFilterChange}
            maxPrice={maxPrice}
            initialPriceRange={[0, maxPrice]}
          />
        </aside>
        <section className="lg:col-span-3">
          <ProductSort onSortChange={setSortOption} currentSort={sortOption} />
          <ProductGrid products={filteredProducts} />
        </section>
      </div>
    </MainLayout>
  );
}
