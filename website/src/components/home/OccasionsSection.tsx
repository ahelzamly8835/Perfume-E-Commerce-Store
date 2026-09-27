/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { productPaths } from "@/features/products";

const imgPersonal =
  "https://www.figma.com/api/mcp/asset/9cc0f5e8-3105-42c5-8eef-dc672125d94a.png";
const imgWedding =
  "https://www.figma.com/api/mcp/asset/1790ce94-1029-440c-b8f2-8213a7f2d6ae.png";
const imgGift =
  "https://www.figma.com/api/mcp/asset/d29d7bb8-6a3e-4fc2-8f94-7be54922ed8d.png";
const imgBirthday =
  "https://www.figma.com/api/mcp/asset/b5e3fa2d-d478-4744-a6c8-cd9f3fc10f33.png";

const OCCASIONS = [
  {
    title: "Personal Use",
    subtitle: "Everyday luxury as second skin",
    image: imgPersonal,
  },
  {
    title: "Wedding",
    subtitle: "Immortalize the vows with notes of white jasmine",
    image: imgWedding,
  },
  {
    title: "Gift Sets",
    subtitle: "A bespoke gesture of ultimate prestige",
    image: imgGift,
  },
  {
    title: "Birthday",
    subtitle: "Vibrant, celebrating a personal revolution",
    image: imgBirthday,
  },
] as const;

export function OccasionsSection() {
  return (
    <section className="flex flex-col gap-10 px-6 py-16 lg:gap-12 lg:px-20 lg:py-[100px]">
      {/* header */}
      <div className="flex flex-col gap-3 items-center text-center">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a] lg:text-[48px]">
          Occasional Scent Curation
        </h2>
        <p className="text-[12px] font-normal text-[#605a54] uppercase tracking-widest lg:text-[14px]">
          Intentionally Formulated For Significant Moments
        </p>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {OCCASIONS.map((occasion) => (
          <Link
            key={occasion.title}
            href={productPaths.list}
            className="flex flex-col gap-4"
          >
            {/* image */}
            <div className="relative h-40 w-full overflow-hidden rounded-md lg:h-60">
              <img
                src={occasion.image}
                alt={occasion.title}
                className="absolute inset-0 object-cover size-full rounded-md"
              />
            </div>

            {/* text */}
            <div className="flex flex-col gap-1 ">
              <p className="font-[family-name:var(--font-instrument-serif)] text-[20px] text-[#1a1a1a] lg:text-[24px]">
                {occasion.title}
              </p>
              <p className="text-[12px] font-normal text-[#605a54] lg:text-[13px]">
                {occasion.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
