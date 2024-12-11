'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';

export default function ProductCard({ product, isFavorite: initialIsFavorite, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (newFavoriteStatus) {
      favorites.push(product);
    } else {
      favorites = favorites.filter(fav => fav.id !== product.id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));

    if (onToggleFavorite) {
      onToggleFavorite(product.id, newFavoriteStatus);
    }
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
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
    </div>
  );
}

