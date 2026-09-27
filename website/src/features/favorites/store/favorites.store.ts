"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FavoriteItem } from "@/features/favorites/types/favorites.types";

type FavoritesStore = {
  items: FavoriteItem[];
  addItem: (item: Omit<FavoriteItem, "savedAt">) => void;
  removeItem: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId);
          if (exists) return state;
          return {
            items: [...state.items, { ...item, savedAt: Date.now() }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      isFavorite: (productId) =>
        get().items.some((i) => i.productId === productId),
    }),
    {
      name: "odoratus-favorites",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);
