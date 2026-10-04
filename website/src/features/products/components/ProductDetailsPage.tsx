"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { memo, useEffect, useMemo, useState, type ReactNode } from "react";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import {
  ProductOptions,
  type VolumeGroup,
} from "@/features/products/components/ProductOptions";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useProducts } from "@/features/products/hooks/useProducts";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import { cn } from "@/lib/utils/cn";
import { resolveProductImages } from "@/features/products/utils/product.utils";

const VOLUME_PRESETS = [
  { id: "30 ml", label: "30 ml", ratio: 140 / 220 },
  { id: "50 ml", label: "50 ml", ratio: 180 / 220 },
  { id: "100 ml", label: "100 ml", ratio: 1 },
] as const;

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  unitPrice: number;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

function volumeGroups(product: Product): VolumeGroup[] {
  const configured = product.options.filter((option) => option.values.length > 0);

  if (configured.length > 0) {
    return configured.map((option) => ({
      id: option.id,
      label: /size|volume/i.test(option.name) ? "Select Volume" : option.name,
      choices: option.values.map((value) => ({
        id: value,
        label: value,
        price: product.price,
      })),
    }));
  }

  return [
    {
      id: "volume",
      label: "Select Volume",
      choices: VOLUME_PRESETS.map((preset) => ({
        id: preset.id,
        label: preset.label,
        price: Math.round(product.price * preset.ratio),
      })),
    },
  ];
}

function ProductBreadcrumb({ name }: { name: string }) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: productPaths.list },
    { label: "Fragrances", href: productPaths.list },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 px-4 py-6 sm:px-6 md:px-10 lg:px-20"
    >
      {crumbs.map((crumb) => (
        <span key={crumb.label} className="flex items-center gap-2">
          <Link
            href={crumb.href}
            className="text-[12px] leading-[normal] font-normal whitespace-nowrap text-[#605a54]"
          >
            {crumb.label}
          </Link>
          <img src="/icons/chevron-right.svg" alt="" width={10} height={10} />
        </span>
      ))}
      <span className="text-[12px] leading-[normal] font-semibold whitespace-nowrap text-[#1a1a1a]">
        {name}
      </span>
    </nav>
  );
}

function GiftWrapSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Complimentary signature gift wrapping"
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full",
        enabled ? "bg-[#c5a880]" : "bg-[#ebe6de]",
      )}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white",
          enabled ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}

const RelatedProducts = memo(function RelatedProducts({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) {
  return (
    <section className="flex flex-col items-start gap-8 bg-[#f4f0eb] px-4 py-16 sm:px-6 md:px-10 lg:gap-12 lg:px-20 lg:py-[100px]">
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <h2 className="w-full font-[family-name:var(--font-instrument-serif)] text-[36px] leading-[normal] text-[#1a1a1a] sm:text-[48px]">
          Olfactory Companions
        </h2>
        <p className="w-full text-[14px] leading-[normal] font-normal text-[#605a54]">
          FRAGRANCES OF SYNONYMOUS SOPHISTICATION
        </p>
      </div>
      {isLoading ? (
        <p className="text-sm text-[#605a54]">Loading fragrances...</p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </section>
  );
});

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const relatedQuery = useProducts({ page: 1, pageSize: 50 });
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    {},
  );
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(true);

  useEffect(() => {
    setSelectedOptions({});
    setQuantity(1);
    setGiftWrap(true);
  }, [productId]);

  const groups = useMemo(
    () => (product ? volumeGroups(product) : []),
    [product],
  );

  const resolvedOptions = useMemo(() => {
    return Object.fromEntries(
      groups.map((group) => [
        group.id,
        selectedOptions[group.id] ??
          group.choices[group.choices.length - 1]?.id ??
          "",
      ]),
    );
  }, [groups, selectedOptions]);

  const unitPrice = useMemo(() => {
    const group = groups[0];
    const choice = group?.choices.find(
      (item) => item.id === resolvedOptions[group.id],
    );
    return choice?.price ?? product?.price ?? 0;
  }, [groups, product?.price, resolvedOptions]);

  const cartOptions = useMemo(() => {
    const options = Object.fromEntries(
      groups.map((group) => {
        const choice = group.choices.find(
          (item) => item.id === resolvedOptions[group.id],
        );
        return [group.label, choice?.label ?? resolvedOptions[group.id]];
      }),
    );

    if (giftWrap) {
      options.Wrapping = "Signature gift wrapping";
    }

    return options;
  }, [giftWrap, groups, resolvedOptions]);

  const catalog = relatedQuery.data?.items;
  const related = useMemo(() => {
    const items = catalog ?? [];
    const companionIds = [
      "fleur-de-lune",
      "noir-cocoon",
      "sol-dor",
      "rose-absolute",
    ];
    const companions = companionIds
      .filter((id) => id !== productId)
      .map((id) => items.find((item) => item.id === id))
      .filter((item): item is Product => Boolean(item));

    return [
      ...companions,
      ...items.filter(
        (item) =>
          item.id !== productId &&
          !companions.some((companion) => companion.id === item.id),
      ),
    ].slice(0, 4);
  }, [catalog, productId]);

  if (productQuery.isLoading) {
    return (
      <p className="px-4 py-10 text-sm text-[#605a54] lg:px-20">
        Loading product...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="px-4 py-10 text-sm text-[#605a54] lg:px-20">
        Product not found.
      </p>
    );
  }

  return (
    <article className="bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumb name={product.name} />
      <div className="flex flex-col items-start gap-10 px-4 pb-16 sm:px-6 md:px-10 lg:flex-row lg:gap-16 lg:px-20 lg:pb-[100px]">
        <ProductImages product={product} />
        <div className="flex w-full shrink-0 flex-col items-start gap-8 lg:w-[560px]">
          <ProductDetails product={product} price={unitPrice} />
          <div className="h-px w-full bg-[#ebe6de]" />
          <ProductOptions
            groups={groups}
            selected={resolvedOptions}
            onChange={(groupId, choiceId) =>
              setSelectedOptions((current) => ({
                ...current,
                [groupId]: choiceId,
              }))
            }
          />
          <div className="flex w-full items-center justify-between gap-4 rounded-md bg-[#f4f0eb] p-5">
            <div className="flex max-w-[380px] flex-col items-start gap-1">
              <p className="text-[13px] leading-[normal] font-semibold text-[#1a1a1a]">
                Complimentary Signature Gift Wrapping
              </p>
              <p className="text-[12px] leading-[normal] font-normal text-[#605a54]">
                Encased in linen paper box with custom wax seal stamp.
              </p>
            </div>
            <GiftWrapSwitch enabled={giftWrap} onChange={setGiftWrap} />
          </div>
          <div className="flex w-full items-center gap-4">
            <div className="flex shrink-0 items-center rounded border border-[#ebe6de]">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="inline-flex h-12 w-11 cursor-pointer items-center justify-center text-[16px] leading-none font-normal text-[#605a54] disabled:opacity-40"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
              >
                -
              </button>
              <span className="min-w-4 text-center text-[14px] leading-[normal] font-semibold text-[#1a1a1a]">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="inline-flex h-12 w-11 cursor-pointer items-center justify-center text-[16px] leading-none font-normal text-[#605a54]"
                onClick={() => setQuantity((current) => current + 1)}
              >
                +
              </button>
            </div>
            <div className="min-w-0 flex-1">
              {actions?.({
                product,
                selectedOptions: cartOptions,
                quantity,
                unitPrice,
              })}
            </div>
            <FavoriteButton
              variant="inline"
              product={{
                id: product.id,
                productId: product.id,
                name: product.name,
                subtitle: product.notes ?? "",
                price: unitPrice,
                image: resolveProductImages(product)[0] ?? "",
              }}
            />
          </div>
          <div className="h-px w-full bg-[#ebe6de]" />
          <div className="flex w-full flex-col items-start gap-5">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[28px] leading-[normal] text-[#1a1a1a] sm:text-[32px]">
              Scent Anatomy
            </h2>
            <p className="text-[14px] leading-[1.6] font-normal text-[#605a54]">
              {product.description}
            </p>
            {product.notes ? (
              <div className="flex w-full flex-col gap-3">
                <div className="flex flex-col gap-1 border-b border-[#ebe6de] py-2 sm:flex-row sm:items-start sm:justify-between">
                  <p className="text-[12px] leading-[normal] font-bold text-[#1a1a1a] uppercase">
                    Notes
                  </p>
                  <p className="text-[13px] leading-[normal] font-normal text-[#605a54] sm:text-right">
                    {product.notes}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <RelatedProducts products={related} isLoading={relatedQuery.isLoading} />
    </article>
  );
}
