import { useState } from "react";

export interface Product {
  id: number;
  name: string;
  variant: string;
  price: number;
  qty: number;
  image: string;
}

interface OrderSummaryProps {
  products: Product[];
  shippingCost: number;
}

export const OrderSummary = ({ products, shippingCost }: OrderSummaryProps) => {
  const [discount, setDiscount] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const subtotal = products.reduce((s, p) => s + p.price * p.qty, 0);
  const total = subtotal + shippingCost;

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="lg:hidden w-full flex items-center justify-between py-2 -my-2"
      >
        <div className="flex items-center gap-2 text-[hsl(var(--checkout-link))] text-[14px]">
          <CartIcon />
          <span>{mobileOpen ? "Hide" : "Show"} order summary</span>
          <svg
            className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-[18px] font-semibold text-[hsl(var(--checkout-text))]">
          ₹{total.toFixed(2)}
        </span>
      </button>

      <div className={`${mobileOpen ? "block mt-4" : "hidden"} lg:block`}>
        <ul className="space-y-4">
          {products.map((p) => (
            <li key={p.id} className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-[64px] h-[64px] rounded-[8px] border border-[hsl(var(--checkout-summary-border))] bg-white overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1.5 rounded-full bg-[hsl(var(--checkout-badge-bg))] text-white text-[12px] font-medium flex items-center justify-center">
                  {p.qty}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-[hsl(var(--checkout-text))] truncate">{p.name}</p>
                <p className="text-[13px] text-[hsl(var(--checkout-text-subdued))]">{p.variant}</p>
              </div>
              <span className="text-[14px] text-[hsl(var(--checkout-text))] font-medium">
                ₹{(p.price * p.qty).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 mt-6">
          <input
            type="text"
            placeholder="Discount code or gift card"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="flex-1 h-[42px] px-3 bg-white border border-[hsl(var(--checkout-input-border))] rounded-[5px] text-[14px] text-[hsl(var(--checkout-text))] placeholder:text-[hsl(var(--checkout-text-subdued))] focus:outline-none focus:border-[hsl(var(--ring))] focus:ring-2 focus:ring-[hsl(var(--ring))]/30"
          />
          <button
            type="button"
            disabled={!discount}
            className="px-5 h-[42px] rounded-[5px] bg-[hsl(var(--checkout-summary-border))] text-[hsl(var(--checkout-text-subdued))] text-[14px] font-medium hover:bg-[hsl(var(--border))] disabled:cursor-not-allowed transition-colors"
          >
            Apply
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-[hsl(var(--checkout-summary-border))] space-y-2">
          <Row label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />
          <Row label="Shipping" value={shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`} />
        </div>

        <div className="mt-4 pt-4 border-t border-[hsl(var(--checkout-summary-border))] flex items-baseline justify-between">
          <span className="text-[16px] text-[hsl(var(--checkout-text))]">Total</span>
          <div className="flex items-baseline gap-2">
            <span className="text-[12px] text-[hsl(var(--checkout-text-subdued))]">INR</span>
            <span className="text-[24px] font-semibold text-[hsl(var(--checkout-text))]">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-[14px]">
    <span className="text-[hsl(var(--checkout-text))]">{label}</span>
    <span className="text-[hsl(var(--checkout-text))]">{value}</span>
  </div>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M3 4h2l1.5 9h9L17 6H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="16.5" r="1" fill="currentColor" />
    <circle cx="14" cy="16.5" r="1" fill="currentColor" />
  </svg>
);
