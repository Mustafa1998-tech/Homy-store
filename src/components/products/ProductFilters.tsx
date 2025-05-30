
"use client";

import { useState, useEffect } from 'react';
import type { Category } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ProductFiltersProps = {
  categories: Category[];
  onFilterChange: (filters: { category?: string; priceRange?: [number, number]; popularity?: boolean }) => void;
  initialPriceRange?: [number, number];
  maxPrice?: number;
};

const DEFAULT_MAX_PRICE = 1000;

export default function ProductFilters({
  categories,
  onFilterChange,
  initialPriceRange,
  maxPrice = DEFAULT_MAX_PRICE
}: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialPriceRange || [0, maxPrice]);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxPrice);

  // Debounce price range changes
  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({ category: selectedCategory, priceRange });
    }, 500);
    return () => clearTimeout(handler);
  }, [priceRange, selectedCategory, onFilterChange]);
  
  // Update currentMaxPrice if maxPrice prop changes
  useEffect(() => {
    setCurrentMaxPrice(maxPrice > 0 ? maxPrice : DEFAULT_MAX_PRICE);
    if (!initialPriceRange) {
        setPriceRange([0, maxPrice > 0 ? maxPrice : DEFAULT_MAX_PRICE]);
    }
  }, [maxPrice, initialPriceRange]);


  const handleCategoryChange = (value: string) => {
    const newCategory = value === 'all' ? undefined : value;
    setSelectedCategory(newCategory);
    onFilterChange({ category: newCategory, priceRange });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const resetFilters = () => {
    setSelectedCategory(undefined);
    setPriceRange([0, currentMaxPrice]);
    onFilterChange({ category: undefined, priceRange: [0, currentMaxPrice] });
  };


  return (
    <Card className="shadow-sm mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="category-filter" className="text-base font-medium mb-2 block">Category</Label>
          <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-filter" className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium mb-2 block">Price Range</Label>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>EGP {priceRange[0]}</span>
            <span>EGP {priceRange[1]}</span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={currentMaxPrice}
            step={10}
            minStepsBetweenThumbs={1}
            className="w-full"
            aria-label="Price range slider"
          />
        </div>
        
        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
