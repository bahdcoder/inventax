import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type="button"
      className={clsx(
        'rounded-3xl px-4 py-2.5 text-sm font-semibold transition ease-in-out shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-green-500',
        {
          ' bg-dark-green-500 text-dark-green-900 hover:bg-dark-green-500/90 ':
            variant === 'primary',
          ' bg-dark-green-400 text-white font-bold': variant === 'secondary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
