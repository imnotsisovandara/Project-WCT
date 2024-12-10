'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`Product ${product.id} ${isFavorite ? 'removed from' : 'added to'} favorites`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image 
        src={product.imageUrl} 
        alt={product.name} 
        width={300} 
        height={300} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold">${Number(product.price).toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleFavorite}
          className={`mt-2 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

