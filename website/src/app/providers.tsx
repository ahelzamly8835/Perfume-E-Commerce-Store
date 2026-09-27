"use client";

import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { CartToast } from "@/features/cart/components/CartToast";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useFavoritesStore } from "@/features/favorites/store/favorites.store";
import { createQueryClient } from "@/lib/api/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useFavoritesStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <CartToast />
    </QueryClientProvider>
  );
}
