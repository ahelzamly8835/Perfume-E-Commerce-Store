"use client";

import { useState, type FormEvent } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section className="flex flex-col gap-8 items-center px-6 py-16 lg:gap-8 lg:px-20 lg:py-[100px]">
      {/* titles */}
      <div className="flex flex-col gap-3 items-center text-center max-w-[600px]">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] text-[#1a1a1a] lg:text-[40px]">
          Atelier Chronicles
        </h2>
        <p className="text-[13px] font-normal leading-[1.6] text-[#605a54] lg:text-[14px]">
          Subscribe to receive exclusive access to Private Reserves, launch
          invitations, and seasonal olfactory compositions.
        </p>
      </div>

      {/* input row */}
      {submitted ? (
        <p className="text-[14px] font-semibold text-[#c5a880]">
          Thank you for subscribing.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex gap-3 w-full max-w-[500px] items-stretch"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            className="flex-1 min-w-0 bg-white border border-[#ebe6de] rounded-[4px] px-5 py-4 text-[13px] font-normal text-[#1a1a1a] placeholder:text-[#605a54] outline-none focus:border-[#c5a880] transition-colors"
          />
          <button
            type="submit"
            className="shrink-0 bg-[#1a1a1a] px-8 py-4 rounded-[4px] text-[12px] font-bold text-white uppercase tracking-wide cursor-pointer"
          >
            Join
          </button>
        </form>
      )}
    </section>
  );
}
