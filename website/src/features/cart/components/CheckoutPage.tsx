"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { cartPaths } from "@/features/cart/paths";
import { useCart } from "@/features/cart/hooks/useCart";
import type { CartLine } from "@/features/cart/types/cart.types";
import {
  readCheckoutDetails,
  saveCheckoutDetails,
} from "@/features/cart/utils/checkout-details";
import {
  formatCartAmount,
  getCartDelivery,
} from "@/features/cart/utils/cart.utils";
import { cn } from "@/lib/utils/cn";

type PaymentMethod = "card" | "cash";

const fieldClassName =
  "w-full rounded-[4px] border border-[#ebe6de] bg-white px-4 text-[14px] leading-[normal] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]";

const WHATSAPP_ORDER_URL = "https://wa.me/201007974927";

function buildOrderMessage(input: {
  recipientName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  note: string;
  paymentMethod: PaymentMethod;
  lines: CartLine[];
  subtotal: number;
  delivery: number;
  total: number;
}) {
  const items = input.lines
    .map((line) => {
      const options = Object.values(line.selectedOptions)
        .filter(Boolean)
        .join(", ");
      const optionText = options ? ` (${options})` : "";
      return `- ${line.name}${optionText} x${line.quantity} — ${formatCartAmount(line.price * line.quantity)}`;
    })
    .join("\n");

  const note = input.note.trim() || "None";
  const payment =
    input.paymentMethod === "card" ? "Credit / Debit Card" : "Cash on Delivery";

  return [
    "New order from ODORATUS",
    "",
    `Recipient: ${input.recipientName.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Address: ${input.address.trim()}`,
    `City: ${input.city.trim()}`,
    `Postal code: ${input.postalCode.trim()}`,
    `Delivery note: ${note}`,
    `Payment: ${payment}`,
    "",
    "Cart items:",
    items,
    "",
    `Subtotal: ${formatCartAmount(input.subtotal)}`,
    `Delivery: ${formatCartAmount(input.delivery)}`,
    `Total: ${formatCartAmount(input.total)}`,
  ].join("\n");
}

export function CheckoutPage() {
  const { lines, total } = useCart();
  const delivery = getCartDelivery(lines);
  const orderTotal = total + delivery;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [note, setNote] = useState("");
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const saved = readCheckoutDetails();
    if (!saved) {
      return;
    }

    setRecipientName(saved.recipientName);
    setPhone(saved.phone);
    setAddress(saved.address);
    setCity(saved.city);
    setPostalCode(saved.postalCode);
    setNote(saved.note);
    setPaymentMethod(saved.paymentMethod);
  }, []);

  const phoneVerified = phone.trim().length > 0;
  const canPlaceOrder =
    lines.length > 0 &&
    recipientName.trim() &&
    phoneVerified &&
    address.trim() &&
    city.trim() &&
    postalCode.trim();

  return (
    <section className="bg-[#faf8f5] text-[#1a1a1a]">
      <nav aria-label="Breadcrumb" className="px-5 py-4 lg:px-20 lg:py-6">
        <p className="text-[12px] leading-[normal] font-normal text-[#605a54]">
          <Link href="/">Home</Link>
          <span>{" / "}</span>
          <Link href={cartPaths.cart}>Cart</Link>
          <span>{" / "}</span>
          <span>Checkout</span>
        </p>
      </nav>
      <form
        className="flex flex-col items-start gap-9 px-5 pt-4 pb-12 lg:flex-row lg:px-20 lg:pb-[100px]"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canPlaceOrder) {
            return;
          }
          const message = buildOrderMessage({
            recipientName,
            phone,
            address,
            city,
            postalCode,
            note,
            paymentMethod,
            lines,
            subtotal: total,
            delivery,
            total: orderTotal,
          });
          saveCheckoutDetails({
            recipientName,
            phone,
            address,
            city,
            postalCode,
            note,
            paymentMethod,
          });
          setPlaced(true);
          window.open(
            `${WHATSAPP_ORDER_URL}?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-7">
          <div className="flex flex-col gap-2">
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[43px] leading-[normal] text-[#1a1a1a] lg:text-[56px]">
              Checkout
            </h1>
            <p className="text-[14px] leading-[normal] font-normal text-[#605a54]">
              Complete your delivery details to place your order.
            </p>
          </div>
          <div className="flex flex-col gap-[18px]">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[30px] leading-[normal] text-[#1a1a1a]">
              Delivery details
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-[12px] leading-[normal] font-bold text-[#1a1a1a] uppercase">
                  Recipient name
                </span>
                <input
                  required
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                  className={cn(fieldClassName, "h-[52px]")}
                />
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex flex-col gap-2" htmlFor="checkout-phone">
                  <span className="text-[12px] leading-[normal] font-bold text-[#1a1a1a] uppercase">
                    Phone number
                  </span>
                  <input
                    id="checkout-phone"
                    required
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    aria-describedby={
                      phoneVerified ? "phone-verified" : undefined
                    }
                    className={cn(fieldClassName, "h-[52px]")}
                  />
                </label>
                {phoneVerified ? (
                  <p
                    id="phone-verified"
                    className="text-[11px] leading-[normal] font-normal text-[#2f7a55]"
                  >
                    ✓ Phone number verified
                  </p>
                ) : null}
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-[12px] leading-[normal] font-bold text-[#1a1a1a] uppercase">
                  Delivery address
                </span>
                <input
                  required
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className={cn(fieldClassName, "h-[52px]")}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[12px] leading-[normal] font-bold text-[#1a1a1a] uppercase">
                  City
                </span>
                <input
                  required
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className={cn(fieldClassName, "h-[52px]")}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[12px] leading-[normal] font-bold text-[#1a1a1a] uppercase">
                  Postal code
                </span>
                <input
                  required
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  className={cn(fieldClassName, "h-[52px]")}
                />
              </label>
            </div>
          </div>
          <label className="flex w-full flex-col gap-2">
            <span className="text-[12px] leading-[normal] font-bold text-black uppercase">
              Delivery note · optional
            </span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className={cn(fieldClassName, "h-[76px] resize-none p-4")}
            />
          </label>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[400px]">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] leading-[normal] text-[#1a1a1a] lg:text-[36px]">
            Payment
          </h2>
          <div
            className="flex flex-col gap-3"
            role="radiogroup"
            aria-label="Payment method"
          >
            <PaymentOption
              name="Credit / Debit Card"
              selected={paymentMethod === "card"}
              onSelect={() => setPaymentMethod("card")}
            />
            <PaymentOption
              name="Cash on Delivery"
              selected={paymentMethod === "cash"}
              onSelect={() => setPaymentMethod("cash")}
            />
          </div>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] leading-[normal] text-[#1a1a1a] lg:text-[36px]">
            Order Summary
          </h2>
          <div className="flex flex-col gap-5 rounded-lg bg-[#f4f0eb] p-6">
            <SummaryRow label="Subtotal" value={formatCartAmount(total)} />
            <SummaryRow label="Delivery" value={formatCartAmount(delivery)} />
            <div className="h-px w-full bg-[#ebe6de]" />
            <div className="flex flex-col leading-[normal] font-bold text-[#1a1a1a]">
              <p className="text-[13px]">Total</p>
              <p className="text-[20px]">{formatCartAmount(orderTotal)}</p>
            </div>
            <button
              type="submit"
              disabled={!canPlaceOrder || placed}
              className="w-full rounded bg-[#1a1a1a] py-4 text-[13px] leading-[normal] font-bold text-white uppercase disabled:cursor-not-allowed disabled:opacity-40"
            >
              {placed ? "Order placed" : "Place order"}
            </button>
            <p className="text-center text-[10px] leading-[normal] font-normal text-[#605a54] uppercase">
              Secure checkout · Visa · Mastercard · Amex
            </p>
            {placed ? (
              <p className="text-center text-[12px] leading-[normal] text-[#2f7a55]">
                Your order has been placed.
              </p>
            ) : null}
          </div>
        </div>
      </form>
    </section>
  );
}

function PaymentOption({
  name,
  selected,
  onSelect,
}: {
  name: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 rounded-[4px] bg-white p-4",
        selected
          ? "border-2 border-[#1a1a1a]"
          : "border border-[#ebe6de]",
      )}
    >
      <input
        type="radio"
        name="payment-method"
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <img
        src={
          selected
            ? "/icons/radio-selected.svg"
            : "/icons/radio-unselected.svg"
        }
        alt=""
        width={18}
        height={18}
      />
      <span
        className={cn(
          "text-[14px] leading-[normal] text-[#1a1a1a]",
          selected ? "font-semibold" : "font-normal",
        )}
      >
        {name}
      </span>
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col text-[13px] leading-[normal]">
      <p className="font-normal text-[#605a54]">{label}</p>
      <p className="font-bold text-[#1a1a1a]">{value}</p>
    </div>
  );
}
