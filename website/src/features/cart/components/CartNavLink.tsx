"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink() {
  const { quantity } = useCart();

  return (
    <Link
      href={cartPaths.cart}
      className="relative inline-flex"
      aria-label={`Cart, ${quantity} ${quantity === 1 ? "item" : "items"}`}
    >
      <img src="/icons/shopping-bag.svg" alt="" width={20} height={20} />
      <span className="absolute -top-1.5 -right-1.5 flex min-w-[16px] h-4 items-center justify-center rounded-full bg-[#c5a880] px-1 text-[9px] leading-none font-bold text-white">
        {quantity}
      </span>
    </Link>
  );
}
