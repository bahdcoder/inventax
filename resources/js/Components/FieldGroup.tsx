import { Input } from '@/Components/Input';
import React, { InputHTMLAttributes, PropsWithChildren } from 'react';

export interface FieldGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FieldGroup({
  id,
  label,
  error,
  children,
  ...rest
}: PropsWithChildren<FieldGroupProps>) {
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className="text-white mb-4">
        {label}
      </label>

      {children ? children : <Input id={id} {...rest} />}
      {error ? (
        <span className="text-red-500 mt-2 text-sm">{error}</span>
      ) : null}
    </div>
  );
}
