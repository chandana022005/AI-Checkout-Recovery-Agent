export const CheckoutHeader = () => {
  return (
    <header className="hidden lg:block mb-8">
      <h1 className="text-[28px] font-medium text-[hsl(var(--checkout-text))] tracking-tight">
        Pragya Store
      </h1>
      <nav aria-label="Breadcrumb" className="mt-4">
        <ol className="flex items-center gap-2 text-[13px] text-[hsl(var(--checkout-text-subdued))]">
          <li>
            <a className="checkout-link">Cart</a>
          </li>
          <li>
            <ChevronRight />
          </li>
          <li>Information</li>
          <li>
            <ChevronRight />
          </li>
          <li>Shipping</li>
          <li>
            <ChevronRight />
          </li>
          <li>
            <a className="checkout-link">Payment</a>
          </li>
        </ol>
      </nav>
    </header>
  );
};

const ChevronRight = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
