/* eslint-disable @next/next/no-img-element */
import type { Product } from "@/features/products/types/product.types";
import {
  formatTaxonomyLabel,
  formatWholePrice,
} from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
  price: number;
};


export function ProductDetails({ product, price }: ProductDetailsProps) {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {product.scentFamily ? (
          <span className="rounded-full bg-[#f2ede4] px-2.5 py-1 text-[11px] leading-[normal] font-semibold text-[#1a1a1a] uppercase">
            Scent Family: {formatTaxonomyLabel(product.scentFamily)}
          </span>
        ) : null}
        {product.occasion ? (
          <span className="rounded-full bg-[#f4f0eb] px-2.5 py-1 text-[11px] leading-[normal] font-semibold text-[#605a54] uppercase">
            Occasion: {formatTaxonomyLabel(product.occasion)}
          </span>
        ) : null}
      </div>
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[36px] leading-[normal] text-[#1a1a1a] sm:text-[48px]">
        {product.name}
      </h1>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="text-[24px] leading-[normal] font-semibold whitespace-nowrap text-[#1a1a1a]">
          {formatWholePrice(price)}
        </p>
        <p className="flex items-center gap-1.5 text-[13px] leading-[normal] font-semibold whitespace-nowrap text-[#10b981]">
          <img src="/icons/dot.svg" alt="" width={8} height={8} />
          Available in Atelier
        </p>
      </div>
    </div>
  );
}
