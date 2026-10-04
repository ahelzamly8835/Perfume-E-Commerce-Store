"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { useCart } from "@/features/cart";
import { productPaths } from "@/features/products";

// SVGs inline — no external URLs needed

function timeAgo(savedAt: number): string {
  const diff = Date.now() - savedAt;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Saved today";
  if (days === 1) return "Saved yesterday";
  if (days < 7) return `Saved ${days} days ago`;
  if (days < 14) return "Saved last week";
  return `Saved ${Math.floor(days / 7)} weeks ago`;
}

export default function FavoritesPage() {
  const { items, count, removeItem } = useFavorites();
  const { addItem } = useCart();

  const isEmpty = count === 0;

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 px-6 py-5 text-[12px] lg:px-20 lg:py-6"
      >
        <Link href="/" className="font-normal text-[#605a54] hover:text-[#1a1a1a] transition-colors">
          Home
        </Link>
        <span className="text-[#605a54]">›</span>
        <span className="font-semibold text-[#1a1a1a]">Favorites</span>
      </nav>

      <div className="flex flex-col gap-3 px-6 pb-10 lg:px-20 lg:pb-[42px]">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[42px] leading-tight text-[#1a1a1a] lg:text-[64px]">
            Favorites
          </h1>
          {!isEmpty && (
            <div className="flex items-center gap-2 bg-[#f4f0eb] rounded-full px-3.5 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#c5a880" stroke="none" aria-hidden>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="text-[11px] font-bold text-[#1a1a1a] uppercase">
                {count} saved {count === 1 ? "fragrance" : "fragrances"}
              </span>
            </div>
          )}
        </div>
        <p className="max-w-[650px] text-[13px] font-normal leading-[1.6] text-[#605a54] lg:text-[14px]">
          A considered collection of fragrances to revisit. Your saved
          selections remain here while you refine your olfactory wardrobe.
        </p>
      </div>


      {!isEmpty && (
        <div className="flex flex-col gap-5 px-6 pb-20 lg:px-20 lg:pb-[100px]">

          <div className="flex items-center justify-between border-b border-[#ebe6de] pb-4 text-[11px] uppercase">
            <span className="font-normal text-[#605a54]">Your saved collection</span>
            <span className="font-normal text-[#c5a880]">Complimentary wrapping available</span>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {items.map((item) => (
              <article
                key={item.productId}
                className="flex flex-col gap-4 bg-white rounded-[8px] p-4 shadow-[0px_8px_24px_0px_rgba(26,26,26,0.04)]"
              >

                <div className="relative h-[200px] w-full overflow-hidden rounded-[4px] lg:h-[334px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 object-cover size-full"
                  />

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="absolute right-3.5 top-3.5 cursor-pointer flex items-center gap-1.5 bg-[rgba(255,255,255,0.95)] border border-[#ebe6de] rounded-full px-3 py-2 text-[10px] font-bold text-[#1a1a1a] uppercase shadow-[0px_4px_12px_0px_rgba(26,26,26,0.08)] hover:bg-white transition-colors"
                    aria-label={`Remove ${item.name} from favorites`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Remove
                  </button>
                </div>

                {/* details */}
                <div className="flex flex-col gap-3">
                  {/* name + price */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="font-[family-name:var(--font-instrument-serif)] text-[20px] text-[#1a1a1a] truncate lg:text-[24px]">
                        {item.name}
                      </p>
                      <p className="text-[10px] font-normal text-[#c5a880] uppercase truncate">
                        {item.subtitle}
                      </p>
                    </div>
                    <p className="shrink-0 text-[14px] font-semibold text-[#1a1a1a] lg:text-[15px]">
                      ${item.price}
                    </p>
                  </div>

                  {/* saved time */}
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#c5a880" stroke="none" aria-hidden>
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="text-[11px] font-normal text-[#605a54]">
                      {timeAgo(item.savedAt)}
                    </span>
                  </div>

                  {/* add to cart */}
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                        selectedOptions: {},
                      })
                    }
                    className="flex w-full cursor-pointer items-center justify-center bg-[#1a1a1a] rounded-sm py-3.5 text-[11px] font-bold text-white uppercase hover:bg-[#333] transition-colors"
                  >
                    Add to Cart +
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* empty state */}
      {isEmpty && (
        <div className="bg-[#f4f0eb] px-6 py-16 lg:px-20 lg:py-[72px]">
          <div className="flex flex-col items-center gap-8 bg-white border border-[#ebe6de] rounded-[8px] px-8 py-16 text-center lg:flex-row lg:justify-center lg:gap-10 lg:px-16 lg:py-0 lg:h-[270px] lg:text-left">
            {/* icon */}
            <div className="flex shrink-0 size-24 lg:size-28 items-center justify-center rounded-full bg-[#faf8f5] border border-[#ebe6de]">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#c5a880" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>

            {/* copy */}
            <div className="flex flex-col gap-2.5 max-w-[510px]">
              <p className="text-[10px] font-bold text-[#c5a880] uppercase">Your private edit</p>
              <p className="font-[family-name:var(--font-instrument-serif)] text-[32px] text-[#1a1a1a] lg:text-[40px]">
                Your favorites await
              </p>
              <p className="text-[13px] font-normal leading-[1.6] text-[#605a54] lg:text-[14px]">
                Save fragrances that intrigue you and return whenever the mood
                calls. Tap the heart on any bottle to begin your collection.
              </p>
            </div>

            {/* CTA */}
            <Link
              href={productPaths.list}
              className="inline-flex shrink-0 items-center gap-2.5 bg-[#1a1a1a] rounded-[4px] px-7 py-4 text-[11px] font-bold text-white uppercase hover:bg-[#333] transition-colors"
            >
              Explore fragrances
              <svg width="14" height="14" viewBox="0 0 9 9" fill="none" aria-hidden>
                <path d="M7.6656 7.6656V1H1M7.6656 1L1 7.6656" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
