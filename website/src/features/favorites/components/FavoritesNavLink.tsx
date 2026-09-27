"use client";

import Link from "next/link";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";

export function FavoritesNavLink() {
  const { count } = useFavorites();

  return (
    <Link
      href="/favorites"
      className="relative inline-flex"
      aria-label={`Favorites, ${count} ${count === 1 ? "item" : "items"}`}
    >
      {/* heart icon — inline SVG so we can style the fill */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex min-w-[16px] h-4 items-center justify-center rounded-full bg-[#c5a880] px-1 text-[9px] leading-none font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
