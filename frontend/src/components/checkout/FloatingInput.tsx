import { InputHTMLAttributes, useId, useState } from "react";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = ({ label, className, ...props }: FloatingInputProps) => {
  const id = useId();
  const [value, setValue] = useState((props.defaultValue as string) ?? "");
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        {...props}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        placeholder=" "
        className={`peer w-full h-[52px] px-3 pt-4 pb-1 bg-white border border-[hsl(var(--checkout-input-border))] rounded-[5px] text-[14px] text-[hsl(var(--checkout-text))] focus:outline-none focus:border-[hsl(var(--ring))] focus:ring-2 focus:ring-[hsl(var(--ring))]/30 focus:ring-offset-0 transition-all ${className ?? ""}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 pointer-events-none transition-all duration-150 text-[hsl(var(--checkout-text-subdued))] ${
          floated ? "top-1.5 text-[11px]" : "top-1/2 -translate-y-1/2 text-[14px]"
        }`}
      >
        {label}
      </label>
    </div>
  );
};
