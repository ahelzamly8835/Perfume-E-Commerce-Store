"use client";

import { useFavoritesStore } from "@/features/favorites/store/favorites.store";
import type { FavoriteItem } from "@/features/favorites/types/favorites.types";

export function useFavorites() {
  const items = useFavoritesStore((state) => state.items);
  const addItem = useFavoritesStore((state) => state.addItem);
  const removeItem = useFavoritesStore((state) => state.removeItem);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);

  return {
    items,
    count: items.length,
    addItem,
    removeItem,
    isFavorite,
  };
}
