'use client'

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <p className="text-center text-gray-500">You haven't added any favorites yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          isFavorite={true}
          onToggleFavorite={() => removeFavorite(product.id)}
        />
      ))}
    </div>
  );
}

