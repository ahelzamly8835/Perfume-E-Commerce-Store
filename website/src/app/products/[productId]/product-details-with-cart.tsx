"use client";

import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";
import {
  formatWholePrice,
  resolveProductImages,
} from "@/features/products/utils/product.utils";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={({ product, selectedOptions, quantity, unitPrice }) => (
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={unitPrice}
          image={resolveProductImages(product)[0]}
          selectedOptions={selectedOptions}
          quantity={quantity}
          label={`Add to Cart / ${formatWholePrice(unitPrice)}`}
          className="flex w-full items-center justify-center rounded bg-[#1a1a1a] hover:bg-[#000000] py-4 text-[13px] leading-[normal] font-bold text-white uppercase cursor-pointer"
        />
      )}
    />
  );
}
