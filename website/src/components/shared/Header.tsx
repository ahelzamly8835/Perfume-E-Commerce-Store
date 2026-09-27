"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: productPaths.list, label: "Shop" },
  { href: "/categories", label: "Categories" },
] as const;

const searchFieldClassName =
  "w-full bg-transparent text-[12px] leading-[normal] text-[#1a1a1a] outline-none placeholder:text-[#605a54]";

function SearchForm({
  className,
  onSearched,
}: {
  className: string;
  onSearched?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = pathname === productPaths.list ? (searchParams.get("search") ?? "") : "";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("search") ?? "").trim();
    const params = new URLSearchParams(
      pathname === productPaths.list ? searchParams.toString() : "",
    );

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.delete("page");
    const query = params.toString();
    router.push(query ? `${productPaths.list}?${query}` : productPaths.list);
    onSearched?.();
  }

  return (
    <form action={productPaths.list} method="get" className={className} onSubmit={onSubmit}>
      <img src="/icons/search.svg" alt="" width={14} height={14} />
      <input
        key={search}
        name="search"
        defaultValue={search}
        placeholder="Search fragrances..."
        aria-label="Search fragrances"
        className={searchFieldClassName}
      />
    </form>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]">
      <div className="bg-[#1a1a1a] px-4 py-2.5 text-center lg:py-3">
        <p className="text-[9px] leading-[normal] font-normal text-white uppercase lg:text-[11px] lg:font-semibold">
          <span className="lg:hidden">
            Complimentary gift wrapping over $150
          </span>
          <span className="hidden lg:inline">
            Complimentary signature gift wrapping on all orders above $150
          </span>
        </p>
      </div>
      <div className="relative border-b border-[#ebe6de]">
        <div className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center px-5 lg:h-[90px] lg:px-20">
          <nav className="hidden items-center gap-10 justify-self-start lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[13px] leading-[normal] uppercase ${
                  pathname === link.href
                    ? "font-bold text-[#1a1a1a]"
                    : "font-medium text-[#605a54]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="justify-self-start lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <img src="/icons/menu.svg" alt="" width={22} height={22} />
          </button>
          <Link
            href="/"
            className="font-[family-name:var(--font-instrument-serif)] text-[25px] leading-[normal] text-[#1a1a1a] lg:text-[38px] lg:tracking-[0.18em] lg:-mr-[0.18em]"
          >
            ODORATUS
          </Link>
          <div className="flex items-center justify-self-end gap-7">
            <Suspense
              fallback={
                <div className="hidden w-[200px] items-center gap-2 rounded-full border border-[#ebe6de] px-3 py-2 lg:flex">
                  <img src="/icons/search.svg" alt="" width={14} height={14} />
                  <input
                    name="search"
                    placeholder="Search fragrances..."
                    aria-label="Search fragrances"
                    className={searchFieldClassName}
                  />
                </div>
              }
            >
              <SearchForm className="hidden w-[200px] items-center gap-2 rounded-full border border-[#ebe6de] px-3 py-2 lg:flex" />
            </Suspense>
            <CartNavLink />
          </div>
        </div>
        {menuOpen ? (
          <nav className="absolute inset-x-0 top-full z-20 flex flex-col gap-4 border-b border-[#ebe6de] bg-[#faf8f5] px-5 py-5 lg:hidden">
            <Suspense>
              <SearchForm
                className="flex w-full items-center gap-2 rounded-full border border-[#ebe6de] bg-white px-3 py-2"
                onSearched={() => setMenuOpen(false)}
              />
            </Suspense>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[13px] leading-[normal] uppercase ${
                  pathname === link.href
                    ? "font-bold text-[#1a1a1a]"
                    : "font-medium text-[#605a54]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
