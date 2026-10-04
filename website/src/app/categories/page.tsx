/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { productPaths } from "@/features/products";

const ROW_ONE = [
  { name: "Floral",    notes: "Rose, jasmine & neroli",    image: "/images/categories/floral.png"    },
  { name: "Woody",     notes: "Cedarwood, oud & santal",   image: "/images/categories/woody.png"     },
  { name: "Oriental",  notes: "Amber, spices & vanilla",   image: "/images/categories/oriental.png"  },
  { name: "Fresh",     notes: "Citrus, marine & herbs",    image: "/images/categories/fresh.png"     },
] as const;

const ROW_TWO = [
  { name: "Private Reserve",  notes: "Rare materials, singular batches",           image: "/images/categories/private-reserve.png"  },
  { name: "Atelier Oils",     notes: "Concentrated botanical rituals",             image: null                                       },
  { name: "Discovery Sets",   notes: "A passage through the house",                image: "/images/categories/discovery-sets.png"   },
  { name: "Gifts & Occasions",notes: "Considered gestures, beautifully wrapped",   image: "/images/categories/gifts-occasions.png"  },
] as const;

function CategoryCard({ name, notes, image }: { name: string; notes: string; image: string | null }) {
  return (
    <article className="flex flex-[1_0_0] min-w-0 flex-col gap-[18px]">
      <Link
        href={`${productPaths.list}?search=${encodeURIComponent(name.toLowerCase())}`}
        className="group relative flex h-[220px] w-full flex-col items-start justify-end overflow-hidden rounded-[8px] p-5 lg:h-[350px] lg:p-6"
        aria-label={`Explore ${name}`}
      >
        {image ? (
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={image} />
        ) : (
          <div className="absolute inset-0 bg-white" />
        )}

        {/* gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,26,26,0)] from-[20%] to-[rgba(26,26,26,0.4)]" />

        {/* explore affordance — inline SVG بدل Figma URL */}
        <div className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.91)] transition-transform group-hover:scale-110">
          <img alt="" className="size-4" src="/icons/arrow-up-right.svg" />
        </div>
      </Link>

      <div className="flex flex-col gap-1.5">
        <p className="font-[family-name:var(--font-instrument-serif)] text-[22px] text-[#1a1a1a] lg:text-[28px]">{name}</p>
        <p className="text-[10px] font-semibold text-[#c5a880] uppercase lg:text-[11px]">{notes}</p>
      </div>
    </article>
  );
}

export default function CategoriesPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 px-6 py-5 text-[12px] lg:px-20 lg:py-6">
        <Link href="/" className="font-normal text-[#605a54] hover:text-[#1a1a1a] transition-colors">Home</Link>
        <span className="text-[#605a54]">›</span>
        <span className="font-semibold text-[#1a1a1a]">Categories</span>
      </nav>

      <div className="flex flex-col gap-3 px-6 pb-10 lg:px-20 lg:pb-14">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[42px] leading-tight text-[#1a1a1a] lg:text-[64px]">
          Fragrance Categories
        </h1>
        <p className="max-w-[620px] text-[13px] font-normal leading-[1.6] text-[#605a54] lg:text-[14px]">
          Explore the olfactory families, precious concentrations, and considered rituals that shape the Odoratus collection.
        </p>
      </div>

      <div className="flex flex-col gap-10 px-6 pb-20 lg:gap-12 lg:px-20 lg:pb-[110px]">
        <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-row lg:gap-6">
          {ROW_ONE.map((cat) => <CategoryCard key={cat.name} {...cat} />)}
        </div>
        <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-row lg:gap-6">
          {ROW_TWO.map((cat) => <CategoryCard key={cat.name} {...cat} />)}
        </div>
      </div>
    </>
  );
}
