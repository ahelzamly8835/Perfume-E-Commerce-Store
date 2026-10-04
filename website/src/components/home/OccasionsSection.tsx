import Link from "next/link";
import { productPaths } from "@/features/products";

const OCCASIONS = [
  { title: "Personal Use", subtitle: "Everyday luxury as second skin",                    image: "/images/home/occasion-personal.png" },
  { title: "Wedding",      subtitle: "Immortalize the vows with notes of white jasmine",  image: "/images/home/occasion-wedding.png"  },
  { title: "Gift Sets",    subtitle: "A bespoke gesture of ultimate prestige",             image: "/images/home/occasion-gift.png"     },
  { title: "Birthday",     subtitle: "Vibrant, celebrating a personal revolution",         image: "/images/home/occasion-birthday.png" },
] as const;

export function OccasionsSection() {
  return (
    <section className="flex flex-col gap-10 px-6 py-16 lg:gap-12 lg:px-20 lg:py-[100px]">
      <div className="flex flex-col gap-3 items-center text-center">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a] lg:text-[48px]">
          Occasional Scent Curation
        </h2>
        <p className="text-[12px] font-normal text-[#605a54] uppercase tracking-widest lg:text-[14px]">
          Intentionally Formulated For Significant Moments
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {OCCASIONS.map((o) => (
          <Link key={o.title} href={productPaths.list} className="flex flex-col gap-4">
            <div className="relative h-[160px] w-full overflow-hidden rounded-[6px] lg:h-[240px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.image} alt={o.title} className="absolute inset-0 object-cover size-full rounded-[6px]" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-[family-name:var(--font-instrument-serif)] text-[20px] text-[#1a1a1a] lg:text-[24px]">{o.title}</p>
              <p className="text-[12px] font-normal text-[#605a54] lg:text-[13px]">{o.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
