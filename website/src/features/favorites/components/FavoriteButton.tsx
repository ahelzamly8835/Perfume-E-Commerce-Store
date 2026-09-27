"use client";

import { useFavoritesStore } from "@/features/favorites/store/favorites.store";
import type { FavoriteItem } from "@/features/favorites/types/favorites.types";
import { cn } from "@/lib/utils/cn";

type FavoriteButtonProps = {
  product: Omit<FavoriteItem, "savedAt">;
  /** "overlay" = positioned absolute فوق الصورة (ProductCard)
   *  "inline"  = زر عادي في الـ layout (ProductDetailsPage) */
  variant?: "overlay" | "inline";
  className?: string;
};

export function FavoriteButton({
  product,
  variant = "overlay",
  className,
}: FavoriteButtonProps) {
  const items = useFavoritesStore((state) => state.items);
  const addItem = useFavoritesStore((state) => state.addItem);
  const removeItem = useFavoritesStore((state) => state.removeItem);

  const isFav = items.some((i) => i.productId === product.productId);

  function toggle() {
    if (isFav) {
      removeItem(product.productId);
    } else {
      addItem(product);
    }
  }

  if (variant === "overlay") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault(); // don't follow parent <Link>
          toggle();
        }}
        aria-label={isFav ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`}
        aria-pressed={isFav}
        className={cn(
          "absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full transition-all",
          isFav
            ? "bg-[#c5a880] shadow-md"
            : "bg-[rgba(255,255,255,0.92)] shadow-[0px_4px_12px_0px_rgba(26,26,26,0.1)] hover:bg-white",
          className,
        )}
      >
        <HeartIcon filled={isFav} />
      </button>
    );
  }

  // inline variant — for product detail page
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isFav ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`}
      aria-pressed={isFav}
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded border transition-all",
        isFav
          ? "border-[#c5a880] bg-[#c5a880]/10 hover:bg-[#c5a880]/20"
          : "border-[#ebe6de] bg-white hover:border-[#c5a880]",
        className,
      )}
    >
      <HeartIcon filled={isFav} size={20} />
    </button>
  );
}

function HeartIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "white" : "none"}
      stroke={filled ? "white" : "#1a1a1a"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
