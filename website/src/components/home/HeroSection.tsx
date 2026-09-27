/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { productPaths } from "@/features/products";

const heroImg =
  "https://www.figma.com/api/mcp/asset/00ed0182-1c31-4f04-9b06-db030ae7afd0.png";

export function HeroSection() {
  return (
    <section
      className="relative flex h-[500px] w-full items-end justify-start pb-12 px-6 lg:h-[680px] lg:pb-20 lg:px-20"
      aria-label="Hero"
    >
      {/* background image + overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover size-full"
          src={heroImg}
        />
        <div className="absolute inset-0 bg-[rgba(26,26,26,0.3)]" />
      </div>

      {/* content */}
      <div className="relative flex flex-col gap-5 lg:gap-6 w-full max-w-[520px] lg:max-w-[580px]">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[52px] leading-none text-white lg:text-[80px]">
          Narrative In A Glass
        </h1>
        <p className="text-[14px] leading-[1.6] font-normal text-white opacity-90 lg:text-[16px]">
          Ethereal extractions designed to evoke memory, stillness, and elegant
          presence. Crafted with deliberate restraint in our Parisian studio.
        </p>
        <Link
          href={productPaths.list}
          className="inline-flex self-start items-center bg-[#c5a880] px-8 py-4 rounded-[4px] text-[11px] font-bold text-white uppercase tracking-wide lg:px-10 lg:py-[18px] lg:text-[12px]"
        >
          Explore The Collections
        </Link>
      </div>
    </section>
  );
}
