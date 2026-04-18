import { SelectHTMLAttributes, useId, useState } from "react";

interface FloatingSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const FloatingSelect = ({ label, options, className, defaultValue, ...props }: FloatingSelectProps) => {
  const id = useId();
  const [value, setValue] = useState((defaultValue as string) ?? "");
  const floated = value.length > 0;

  return (
    <div className="relative">
      <select
        id={id}
        {...props}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        className={`peer appearance-none w-full h-[52px] pl-3 pr-10 pt-4 pb-1 bg-white border border-[hsl(var(--checkout-input-border))] rounded-[5px] text-[14px] text-[hsl(var(--checkout-text))] focus:outline-none focus:border-[hsl(var(--ring))] focus:ring-2 focus:ring-[hsl(var(--ring))]/30 transition-all cursor-pointer ${className ?? ""}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-3 pointer-events-none transition-all duration-150 text-[hsl(var(--checkout-text-subdued))] ${
          floated ? "top-1.5 text-[11px]" : "top-1/2 -translate-y-1/2 text-[14px]"
        }`}
      >
        {label}
      </label>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[hsl(var(--checkout-text-subdued))]"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
      >
        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
