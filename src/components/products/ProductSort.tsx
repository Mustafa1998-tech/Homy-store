
"use client";

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

type ProductSortProps = {
  onSortChange: (sortOption: SortOption) => void;
  currentSort: SortOption;
};

export default function ProductSort({ onSortChange, currentSort }: ProductSortProps) {
  return (
    <div className="flex items-center space-x-2 mb-6 justify-end">
      <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
      <Label htmlFor="sort-products" className="text-sm font-medium">Sort by:</Label>
      <Select value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger id="sort-products" className="w-[180px] h-9 text-sm">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popularity">Popularity</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="name-asc">Name: A to Z</SelectItem>
          <SelectItem value="name-desc">Name: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
