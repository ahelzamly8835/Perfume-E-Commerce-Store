/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { productPaths } from "@/features/products";

const imgFleur =
  "https://www.figma.com/api/mcp/asset/17f8ef3a-1746-449e-a41f-dad90e2d9dbc.png";
const imgSantal =
  "https://www.figma.com/api/mcp/asset/d61bcd09-0103-403d-afa0-ec7e96a33f5a.png";
const imgSol =
  "https://www.figma.com/api/mcp/asset/cbade744-2276-42f7-8f52-28ea97039d8e.png";
const imgNoir =
  "https://www.figma.com/api/mcp/asset/4bcdd989-2cdd-488b-b6a2-76dfcca60475.png";

const PRODUCTS = [
  {
    name: "Fleur de Lune",
    subtitle: "Floral / Jasmine & White Musk",
    price: "$195",
    image: imgFleur,
  },
  {
    name: "Santal Parchment",
    subtitle: "Woody / Sandalwood & Cardamom",
    price: "$220",
    image: imgSantal,
  },
  {
    name: "Sol d'Or",
    subtitle: "Fresh / Bergamot & Sea Salt",
    price: "$185",
    image: imgSol,
  },
  {
    name: "Noir Cocoon",
    subtitle: "Oriental / Tobacco & Amber",
    price: "$240",
    image: imgNoir,
  },
] as const;

export function TrendingSection() {
  return (
    <section className="flex flex-col gap-10 px-6 py-16 lg:gap-12 lg:px-20 lg:py-25">
      {/* header */}
      <div className="flex flex-col gap-3 items-center text-center">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a] lg:text-[48px]">
          Olfactory Signatures
        </h2>
        <p className="text-[12px] font-normal text-[#605a54] uppercase tracking-widest lg:text-[14px]">
          The Currently Highly Coveted Extractions
        </p>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {PRODUCTS.map((product) => (
          <article
            key={product.name}
            className="flex flex-col gap-4 bg-white hover:scale-110 duration-250 cursor-pointer ease-in-out rounded-lg p-3 lg:p-4"
          >
            
            {/* image */}
             <Link
                href={productPaths.list}>
            <div className="relative h-50 w-full rounded-sm overflow-hidden lg:h-80">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 object-cover size-full rounded-[4px]"
              />
            </div>
             </Link>

            {/* details */}
            <div className="flex flex-col gap-3">
              {/* name + price */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1 min-w-">
                  <p className="font-[family-name:var(--font-instrument-serif)] text-[18px] text-[#1a1a1a] truncate lg:text-[22px]">
                    {product.name}
                  </p>
                  <p className="text-[10px] font-normal text-[#c5a880] uppercase truncate lg:text-[11px]">
                    {product.subtitle}
                  </p>
                </div>
                <p className="text-[13px] font-semibold text-[#1a1a1a] shrink-0 lg:text-[15px]">
                  {product.price}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
