import Link from "next/link";
import { productPaths } from "@/features/products";

const imgFloral =
  "https://www.figma.com/api/mcp/asset/73d77ab0-3127-4df9-9b65-1ee95e03a40f.png";
const imgWoody =
  "https://www.figma.com/api/mcp/asset/3de84de1-08ea-4a53-8566-c6da54b9254c.png";
const imgOriental =
  "https://www.figma.com/api/mcp/asset/04c84022-277c-4f32-8cea-7c4bbb1704be.png";
const imgFresh =
  "https://www.figma.com/api/mcp/asset/b3f9d45d-667a-4305-9175-1712b72a1e99.png";

const ARCHETYPES = [
  { name: "Floral", notes: "Rose, Jasmine, Neroli", image: imgFloral },
  { name: "Woody", notes: "Cedarwood, Oud, Santal", image: imgWoody },
  { name: "Oriental", notes: "Amber, Spices, Vanilla", image: imgOriental },
  { name: "Fresh", notes: "Citrus, Marine, Herbs", image: imgFresh },
] as const;

export function ScentArchetypesSection() {
  return (
    <section className="flex flex-col gap-10 bg-[#f4f0eb] px-6 py-16 lg:gap-12 lg:p-20">
      <div className="flex flex-col gap-3 items-center text-center">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a] lg:text-[48px]">
          Scent Archetypes
        </h2>
        <p className="text-[12px] font-normal text-[#605a54] uppercase tracking-widest lg:text-[14px]">
          Curate Your Presence By Scent Profile
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {ARCHETYPES.map((archetype) => (
          <Link
            key={archetype.name}
            href={`${productPaths.list}?search=${archetype.name.toLowerCase()}`}
            className="relative flex h-50 flex-col items-start justify-end overflow-hidden hover:scale-110 duration-250 cursor-pointer ease-in-out rounded-lg p-5 lg:h-70 lg:p-6"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-lg">
              <img
                alt=""
                className="absolute inset-0 object-cover size-full rounded-lg"
                src={archetype.image}
              />
              <div className="absolute inset-0 bg-[rgba(26,26,26,0.4)] rounded-lg" />
            </div>
            <div className="relative flex flex-col gap-1">
              <p className="font-[family-name:var(--font-instrument-serif)] text-[22px] text-white lg:text-[28px]">
                {archetype.name}
              </p>
              <p className="text-[10px] font-normal text-[#c5a880] uppercase lg:text-[11px]">
                {archetype.notes}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
