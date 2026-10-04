import Link from "next/link";
import { productPaths } from "@/features/products";

const ARCHETYPES = [
  { name: "Floral",   notes: "Rose, Jasmine, Neroli",    image: "/images/home/archetype-floral.png"   },
  { name: "Woody",    notes: "Cedarwood, Oud, Santal",   image: "/images/home/archetype-woody.png"    },
  { name: "Oriental", notes: "Amber, Spices, Vanilla",   image: "/images/home/archetype-oriental.png" },
  { name: "Fresh",    notes: "Citrus, Marine, Herbs",    image: "/images/home/archetype-fresh.png"    },
] as const;

export function ScentArchetypesSection() {
  return (
    <section className="flex flex-col gap-10 bg-[#f4f0eb] px-6 py-16 lg:gap-12 lg:p-[80px]">
      <div className="flex flex-col gap-3 items-center text-center">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a] lg:text-[48px]">
          Scent Archetypes
        </h2>
        <p className="text-[12px] font-normal text-[#605a54] uppercase tracking-widest lg:text-[14px]">
          Curate Your Presence By Scent Profile
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {ARCHETYPES.map((a) => (
          <Link
            key={a.name}
            href={`${productPaths.list}?search=${a.name.toLowerCase()}`}
            className="relative flex h-50 flex-col items-start justify-end overflow-hidden hover:scale-110 duration-250 ease-in-out cursor-pointer rounded-lg p-5 lg:h-70 lg:p-6"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 object-cover size-full rounded-[8px]" src={a.image} />
              <div className="absolute inset-0 bg-[rgba(26,26,26,0.4)] rounded-[8px]" />
            </div>
            <div className="relative flex flex-col gap-1">
              <p className="font-[family-name:var(--font-instrument-serif)] text-[22px] text-white lg:text-[28px]">{a.name}</p>
              <p className="text-[10px] font-normal text-[#c5a880] uppercase lg:text-[11px]">{a.notes}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
