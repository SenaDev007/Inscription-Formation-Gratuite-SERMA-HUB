"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { AlertCircle, Check } from "lucide-react";

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}

export function Label({ htmlFor, children, required }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-slate-200 mb-1.5"
    >
      {children}
      {required && <span className="text-orange ml-1" aria-hidden="true">*</span>}
    </label>
  );
}

interface FieldWrapperProps {
  error?: string;
  children: React.ReactNode;
}

export function FieldWrapper({ error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1">
      {children}
      {error && (
        <p role="alert" className="text-red-400 text-xs mt-0.5 flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-px" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Input ──────────────────────────────────────── */
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`
          w-full px-3 xs:px-4 py-3 rounded-xl
          bg-navy-dark border text-white
          text-base sm:text-sm
          placeholder:text-muted/60
          transition-all duration-200
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-400/50"
              : "border-orange/20 focus:border-orange/60 focus:ring-2 focus:ring-orange/30"
          }
          focus:outline-none
          ${className}
        `}
      />
    );
  }
);
Input.displayName = "Input";

/* ── Textarea ───────────────────────────────────── */
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={`
          w-full px-3 xs:px-4 py-3 rounded-xl
          bg-navy-dark border text-white
          text-base sm:text-sm
          placeholder:text-muted/60
          transition-all duration-200 min-h-[110px] sm:min-h-[120px]
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-400/50"
              : "border-orange/20 focus:border-orange/60 focus:ring-2 focus:ring-orange/30"
          }
          focus:outline-none
          ${className}
        `}
      />
    );
  }
);
Textarea.displayName = "Textarea";

/* ── Select ─────────────────────────────────────── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={`
          w-full px-3 xs:px-4 py-3 rounded-xl
          bg-navy-dark border text-white
          text-base sm:text-sm
          transition-all duration-200
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-400/50"
              : "border-orange/20 focus:border-orange/60 focus:ring-2 focus:ring-orange/30"
          }
          focus:outline-none
          ${className}
        `}
      >
        {placeholder && (
          <option value="" className="bg-navy-light text-muted">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-navy-light text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);
Select.displayName = "Select";

/* ── RadioGroup ─────────────────────────────────── */
interface RadioGroupProps {
  name: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps) {
  return (
    <FieldWrapper error={error}>
      <div className="flex flex-wrap gap-2 xs:gap-2.5">
        {options.map((opt) => (
          <label
            key={opt}
            className={`
              inline-flex items-center gap-2 px-3 xs:px-4 py-2 xs:py-2.5
              rounded-xl border cursor-pointer
              text-xs xs:text-sm font-medium
              transition-all duration-200 select-none
              min-h-[40px] xs:min-h-[44px]
              ${
                value === opt
                  ? "border-orange bg-orange/10 text-orange"
                  : "border-orange/20 text-muted hover:border-orange/40 hover:text-white"
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="sr-only"
              aria-label={opt}
            />
            <span
              className={`w-3.5 h-3.5 xs:w-4 xs:h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${value === opt ? "border-orange" : "border-muted/60"}
              `}
              aria-hidden="true"
            >
              {value === opt && (
                <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-orange block" />
              )}
            </span>
            <span className="leading-snug">{opt}</span>
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

/* ── Checkbox ───────────────────────────────────── */
interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
  error,
}: CheckboxProps) {
  return (
    <FieldWrapper error={error}>
      <label
        htmlFor={id}
        className="flex items-start gap-3 cursor-pointer group min-h-[44px] py-1"
      >
        <div
          className={`
            mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
            transition-all duration-200
            ${
              checked
                ? "bg-orange border-orange"
                : "border-orange/40 group-hover:border-orange/70"
            }
          `}
          aria-hidden="true"
        >
          {checked && (
            <Check className="w-3 h-3 text-navy" strokeWidth={3} />
          )}
        </div>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span className="text-xs xs:text-sm text-slate-300 leading-relaxed pt-0.5">
          {label}
        </span>
      </label>
    </FieldWrapper>
  );
}
