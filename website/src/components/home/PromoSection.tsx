import Link from "next/link";
import { productPaths } from "@/features/products";

export function PromoSection() {
  return (
    <section className="flex flex-col bg-[#f4f0eb] lg:flex-row lg:h-[450px]">
      <div className="relative h-[280px] w-full lg:h-full lg:flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Le Jardin d'Or Solstice Collection"
          className="absolute inset-0 object-cover size-full"
          src="/images/home/promo.png"
        />
      </div>
      <div className="flex flex-col gap-5 justify-center px-6 py-12 lg:flex-1 lg:gap-6 lg:p-16">
        <p className="text-[11px] font-bold text-[#c5a880] uppercase tracking-widest">
          The Summer Solstice
        </p>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[38px] leading-[1.1] text-[#1a1a1a] lg:text-[54px]">
          Le Jardin d&apos;Or Solstice Collection
        </h2>
        <p className="text-[14px] font-normal leading-[1.6] text-[#605a54]">
          Our highly anticipated limited reserve capturing the fleeting scent of
          summer dusk. Formulated with night-blooming cereus and sun-warmed clay.
        </p>
        <Link
          href={productPaths.list}
          className="inline-flex self-start items-center bg-[#1a1a1a] px-8 py-4 rounded-[4px] text-[12px] font-bold text-white uppercase tracking-wide"
        >
          Secure the Bottle
        </Link>
      </div>
    </section>
  );
}
