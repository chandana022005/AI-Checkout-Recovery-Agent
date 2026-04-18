import { useEffect, useState } from "react";
import { Product } from "./OrderSummary";

interface PaymentSuccessProps {
  email?: string;
  total: number;
  products: Product[];
  onContinue?: () => void;
}

export const PaymentSuccess = ({ email, total, products, onContinue }: PaymentSuccessProps) => {
  const [orderNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const [show, setShow] = useState(false);

  const subtotal = products.reduce((s, p) => s + p.price * p.qty, 0);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-[hsl(var(--checkout-divider))] bg-white">
        <div className="max-w-[720px] mx-auto px-5 py-5">
          <h1 className="text-[22px] font-medium text-[hsl(var(--checkout-text))] tracking-tight">
            Pragya Store
          </h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-[720px] mx-auto px-5 py-10 lg:py-16">
          <div className="flex items-start gap-5 animate-fade-in">
            <div className="relative shrink-0">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-[hsl(var(--checkout-success))]/30 animate-ring-pulse"
              />
              <div className="relative w-[56px] h-[56px] rounded-full bg-[hsl(var(--checkout-success))] flex items-center justify-center animate-scale-in">
                <svg width="32" height="32" viewBox="0 0 56 56" fill="none" aria-hidden>
                  <circle
                    cx="28"
                    cy="28"
                    r="26"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray="166"
                    strokeDashoffset="166"
                    className="animate-circle-draw"
                  />
                  <path
                    d="M16 29l8 8 16-18"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="48"
                    strokeDashoffset="48"
                    className="animate-check-draw"
                  />
                </svg>
              </div>
            </div>

            <div className="pt-1">
              <p className="text-[13px] text-[hsl(var(--checkout-text-subdued))]">
                Order #{orderNumber}
              </p>
              <h2 className="text-[26px] lg:text-[28px] font-medium text-[hsl(var(--checkout-text))] mt-1 tracking-tight">
                Thank you{email ? `, ${email.split("@")[0]}` : ""}!
              </h2>
            </div>
          </div>

          <section
            className={`mt-8 rounded-[8px] border border-[hsl(var(--checkout-summary-border))] p-6 bg-white transition-all duration-500 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <h3 className="text-[18px] font-medium text-[hsl(var(--checkout-text))] mb-1">
              Your order is confirmed
            </h3>
            <p className="text-[14px] text-[hsl(var(--checkout-text-subdued))]">
              You&apos;ll receive a confirmation email with your order number shortly.
            </p>
          </section>

          <section
            className={`mt-6 rounded-[8px] border border-[hsl(var(--checkout-summary-border))] bg-white overflow-hidden transition-all duration-500 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <div className="p-6">
              <h3 className="text-[16px] font-medium text-[hsl(var(--checkout-text))] mb-4">
                Order summary
              </h3>
              <ul className="space-y-4">
                {products.map((p) => (
                  <SummaryItem
                    key={p.id}
                    image={p.image}
                    name={p.name}
                    variant={p.variant}
                    qty={p.qty}
                    price={p.price * p.qty}
                  />
                ))}
              </ul>
            </div>
            <div className="border-t border-[hsl(var(--checkout-summary-border))] p-6 space-y-2">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Shipping" value="FREE" />
              <div className="pt-3 mt-3 border-t border-[hsl(var(--checkout-summary-border))] flex items-baseline justify-between">
                <span className="text-[16px] text-[hsl(var(--checkout-text))]">Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[12px] text-[hsl(var(--checkout-text-subdued))]">USD</span>
                  <span className="text-[22px] font-semibold text-[hsl(var(--checkout-text))]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div
            className={`mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-500 ${
              show ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "0.7s" }}
          >
            <p className="text-[13px] text-[hsl(var(--checkout-text-subdued))]">
              Need help? <a className="checkout-link">Contact us</a>
            </p>
            <button
              type="button"
              onClick={onContinue}
              className="h-[48px] px-6 bg-primary text-primary-foreground rounded-[5px] text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const SummaryItem = ({
  image,
  name,
  variant,
  qty,
  price,
}: {
  image: string;
  name: string;
  variant: string;
  qty: number;
  price: number;
}) => (
  <li className="flex items-center gap-4">
    <div className="relative shrink-0">
      <div className="w-[56px] h-[56px] rounded-[8px] border border-[hsl(var(--checkout-summary-border))] bg-white overflow-hidden">
        <img src={image} alt={name} width={56} height={56} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1.5 rounded-full bg-[hsl(var(--checkout-badge-bg))] text-white text-[11px] font-medium flex items-center justify-center">
        {qty}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[14px] font-medium text-[hsl(var(--checkout-text))] truncate">{name}</p>
      <p className="text-[13px] text-[hsl(var(--checkout-text-subdued))]">{variant}</p>
    </div>
    <span className="text-[14px] text-[hsl(var(--checkout-text))] font-medium">${price.toFixed(2)}</span>
  </li>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-[14px]">
    <span className="text-[hsl(var(--checkout-text))]">{label}</span>
    <span className="text-[hsl(var(--checkout-text))]">{value}</span>
  </div>
);
