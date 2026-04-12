"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface LabelProps {
  htmlFor: string;
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
      {required && <span className="text-orange ml-1">*</span>}
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
        <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

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
          w-full px-4 py-3 rounded-xl
          bg-navy-dark border text-white text-sm
          placeholder:text-muted/60
          transition-all duration-200
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-400"
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
          w-full px-4 py-3 rounded-xl
          bg-navy-dark border text-white text-sm
          placeholder:text-muted/60
          transition-all duration-200 min-h-[120px]
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-400"
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
          w-full px-4 py-3 rounded-xl
          bg-navy-dark border text-white text-sm
          transition-all duration-200
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-400"
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
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <label
            key={opt}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer
              text-sm font-medium transition-all duration-200
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
            />
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${value === opt ? "border-orange" : "border-muted/60"}
              `}
            >
              {value === opt && (
                <span className="w-2 h-2 rounded-full bg-orange block" />
              )}
            </span>
            {opt}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

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
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
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
        >
          {checked && (
            <svg
              className="w-3 h-3 text-navy"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span className="text-sm text-slate-300 leading-relaxed">{label}</span>
      </label>
    </FieldWrapper>
  );
}
