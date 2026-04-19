import { useState } from "react";
import { FloatingInput } from "./FloatingInput";
import { FloatingSelect } from "./FloatingSelect";

interface CheckoutFormProps {
  onSuccess: (email: string) => void;
  onTyping?: () => void;
  shippingCost: number;
  onShippingTypeChange: (type: "standard" | "express") => void;
}

export const CheckoutForm = ({ onSuccess, onTyping, shippingCost, onShippingTypeChange }: CheckoutFormProps) => {
  const [shippingType, setShippingType] = useState<"standard" | "express">("standard");
  const [emailNews, setEmailNews] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [textOffers, setTextOffers] = useState(false);
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setTimeout(() => onSuccess(email || "guest@example.com"), 900);
  };

  const handleExpress = () => {
    if (processing) return;
    setProcessing(true);
    setTimeout(() => onSuccess(email || "guest@example.com"), 700);
  };

  return (
    <form className="space-y-8" onSubmit={handlePay} onKeyDown={onTyping}>
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[hsl(var(--checkout-divider))]" />
          <span className="text-[13px] text-[hsl(var(--checkout-text-subdued))]">Express checkout</span>
          <div className="flex-1 h-px bg-[hsl(var(--checkout-divider))]" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={handleExpress}
            disabled={processing}
            className="h-[45px] rounded-[5px] flex items-center justify-center font-semibold text-white text-[14px] hover:opacity-90 transition-opacity disabled:opacity-60"
            style={{ backgroundColor: "#5433FF" }}
          >
            <span>shop</span>
            <span className="font-bold ml-0.5">Pay</span>
          </button>
          <button
            type="button"
            onClick={handleExpress}
            disabled={processing}
            className="h-[45px] rounded-[5px] flex items-center justify-center font-semibold text-white text-[14px] hover:opacity-90 transition-opacity disabled:opacity-60"
            style={{ backgroundColor: "#FFC439" }}
          >
            <span style={{ color: "#003087" }} className="font-bold italic">Pay</span>
            <span style={{ color: "#009CDE" }} className="font-bold italic">Pal</span>
          </button>
          <button
            type="button"
            onClick={handleExpress}
            disabled={processing}
            className="h-[45px] rounded-[5px] flex items-center justify-center font-semibold text-white text-[14px] hover:opacity-90 transition-opacity bg-black disabled:opacity-60"
          >
            <span className="text-[18px]">G</span>
            <span className="ml-1">Pay</span>
          </button>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-px bg-[hsl(var(--checkout-divider))]" />
          <span className="text-[13px] text-[hsl(var(--checkout-text-subdued))]">OR</span>
          <div className="flex-1 h-px bg-[hsl(var(--checkout-divider))]" />
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-[18px] font-medium text-[hsl(var(--checkout-text))]">Contact</h2>
          <p className="text-[13px] text-[hsl(var(--checkout-text-subdued))]">
            Have an account? <a className="checkout-link">Log in</a>
          </p>
        </div>
        <FloatingInput
          label="Email or mobile phone number"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        />
        <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={emailNews}
            onChange={(e) => setEmailNews(e.target.checked)}
            className="w-[18px] h-[18px] rounded-[3px] border border-[hsl(var(--checkout-input-border))] accent-black cursor-pointer"
          />
          <span className="text-[14px] text-[hsl(var(--checkout-text))]">Email me with news and offers</span>
        </label>
      </section>

      <section>
        <h2 className="text-[18px] font-medium text-[hsl(var(--checkout-text))] mb-3">Delivery</h2>

        <div className="space-y-3">
          <FloatingSelect
            label="Country/Region"
            defaultValue="US"
            options={[
              { value: "US", label: "United States" },
              { value: "CA", label: "Canada" },
              { value: "GB", label: "United Kingdom" },
              { value: "AU", label: "Australia" },
              { value: "DE", label: "Germany" },
              { value: "FR", label: "France" },
              { value: "IN", label: "India" },
            ]}
          />

          <div className="grid grid-cols-2 gap-3">
            <FloatingInput label="First name" autoComplete="given-name" />
            <FloatingInput label="Last name" autoComplete="family-name" />
          </div>

          <FloatingInput label="Address" autoComplete="street-address" />
          <FloatingInput label="Apartment, suite, etc. (optional)" autoComplete="address-line2" />

          <div className="grid grid-cols-3 gap-3">
            <FloatingInput label="City" autoComplete="address-level2" />
            <FloatingSelect
              label="State"
              defaultValue=""
              options={[
                { value: "", label: "" },
                { value: "CA", label: "California" },
                { value: "NY", label: "New York" },
                { value: "TX", label: "Texas" },
                { value: "FL", label: "Florida" },
                { value: "WA", label: "Washington" },
              ]}
            />
            <FloatingInput label="ZIP code" autoComplete="postal-code" />
          </div>

          <FloatingInput label="Phone" type="tel" autoComplete="tel" />
        </div>

        <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="w-[18px] h-[18px] rounded-[3px] border border-[hsl(var(--checkout-input-border))] accent-black cursor-pointer"
          />
          <span className="text-[14px] text-[hsl(var(--checkout-text))]">Save this information for next time</span>
        </label>

        <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={textOffers}
            onChange={(e) => setTextOffers(e.target.checked)}
            className="w-[18px] h-[18px] rounded-[3px] border border-[hsl(var(--checkout-input-border))] accent-black cursor-pointer"
          />
          <span className="text-[14px] text-[hsl(var(--checkout-text))]">Text me with news and offers</span>
        </label>
      </section>

      <section>
        <h2 className="text-[18px] font-medium text-[hsl(var(--checkout-text))] mb-3">Shipping method</h2>
        <div className="border border-[hsl(var(--checkout-input-border))] rounded-[5px] overflow-hidden">
          <label className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${shippingType === "standard" ? "bg-[hsl(var(--checkout-summary-bg))]" : "bg-white"}`}>
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="shipping" 
                checked={shippingType === "standard"}
                onChange={() => {
                  setShippingType("standard");
                  onShippingTypeChange("standard");
                }}
                className="w-[18px] h-[18px] accent-black" 
              />
              <span className="text-[14px] text-[hsl(var(--checkout-text))]">Standard</span>
            </div>
            <span className="text-[14px] font-medium text-[hsl(var(--checkout-text))]">
              {shippingType === "standard" && shippingCost === 0 ? "FREE" : "₹15.00"}
            </span>
          </label>
          <label className={`flex items-center justify-between p-4 border-t border-[hsl(var(--checkout-divider))] cursor-pointer transition-colors ${shippingType === "express" ? "bg-[hsl(var(--checkout-summary-bg))]" : "bg-white"}`}>
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="shipping" 
                checked={shippingType === "express"}
                onChange={() => {
                  setShippingType("express");
                  onShippingTypeChange("express");
                }}
                className="w-[18px] h-[18px] accent-black" 
              />
              <span className="text-[14px] text-[hsl(var(--checkout-text))]">Express (1-2 business days)</span>
            </div>
            <span className="text-[14px] font-medium text-[hsl(var(--checkout-text))]">
              {shippingType === "express" && shippingCost === 0 ? "FREE" : "₹30.00"}
            </span>
          </label>
        </div>
      </section>

      <section>
        <h2 className="text-[18px] font-medium text-[hsl(var(--checkout-text))] mb-1">Payment</h2>
        <p className="text-[13px] text-[hsl(var(--checkout-text-subdued))] mb-3">
          All transactions are secure and encrypted.
        </p>

        <div className="border border-[hsl(var(--checkout-input-border))] rounded-[5px] overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-[hsl(var(--checkout-summary-bg))]">
            <div className="flex items-center gap-3">
              <input type="radio" name="payment" defaultChecked className="w-[18px] h-[18px] accent-black" />
              <span className="text-[14px] text-[hsl(var(--checkout-text))]">Credit card</span>
            </div>
            <div className="flex items-center gap-1">
              <CardLogo color="#1A1F71" text="VISA" />
              <CardLogo color="#EB001B" text="MC" />
              <CardLogo color="#006FCF" text="AMEX" />
              <span className="text-[11px] text-[hsl(var(--checkout-text-subdued))] ml-1">+4</span>
            </div>
          </div>
          <div className="p-4 space-y-3 border-t border-[hsl(var(--checkout-divider))]">
            <FloatingInput label="Card number" />
            <div className="grid grid-cols-2 gap-3">
              <FloatingInput label="Expiration date (MM / YY)" />
              <FloatingInput label="Security code" />
            </div>
            <FloatingInput label="Name on card" />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={processing}
        className="w-full h-[55px] bg-primary text-primary-foreground rounded-[5px] text-[16px] font-medium hover:opacity-90 active:opacity-80 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <span className="w-[18px] h-[18px] rounded-full border-2 border-white/40 border-t-white animate-spin" />
            <span>Processing…</span>
          </>
        ) : (
          "Pay now"
        )}
      </button>
    </form>
  );
};

const CardLogo = ({ color, text }: { color: string; text: string }) => (
  <div
    className="h-[22px] px-1.5 rounded-[3px] flex items-center justify-center text-white text-[9px] font-bold"
    style={{ backgroundColor: color }}
  >
    {text}
  </div>
);
