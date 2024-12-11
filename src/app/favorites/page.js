import FavoritesList from '@/components/FavoritesList';

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favorites</h1>
      <FavoritesList />
    </div>
  );
}

