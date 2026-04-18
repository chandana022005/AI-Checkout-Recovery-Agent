export const CheckoutFooter = () => {
  return (
    <footer className="mt-8 pt-6 border-t border-[hsl(var(--checkout-divider))]">
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
        <li><a className="checkout-link">Refund policy</a></li>
        <li><a className="checkout-link">Shipping policy</a></li>
        <li><a className="checkout-link">Privacy policy</a></li>
        <li><a className="checkout-link">Terms of service</a></li>
        <li><a className="checkout-link">Contact information</a></li>
      </ul>
    </footer>
  );
};
