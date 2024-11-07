import React, { Children, isValidElement, PropsWithChildren } from 'react';
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ children, ...props }: InputProps) {
  const hasIcon = Children.toArray(children).some(
    child => isValidElement(child) && child.type === Input.Icon,
  );

  return (
    <div className="flex w-full items-center rounded-lg border-none relative">
      {children}
      <input
        className={`w-full h-12 bg-dark-green-900 border border-dark-green-300 focus:outline-none focus:ring-2 transition ease-linear focus:ring-dark-green-500 focus:border-transparent text-white rounded-lg ${hasIcon ? 'pl-12' : 'pl-4'}`}
        {...props}
      />
    </div>
  );
}

Input.Icon = function InputIcon({ children }: PropsWithChildren<{}>) {
  return <div className="absolute left-4">{children}</div>;
};
