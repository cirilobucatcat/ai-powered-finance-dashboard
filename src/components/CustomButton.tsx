import React, { ButtonHTMLAttributes } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  children,
  className = '',
  disabled,
  isLoading,
  ...props
}: CustomButtonProps) => {

  return (
    <button
      className={`bg-electric-lime px-3 flex items-center justify-center gap-2 hover:bg-electric-lime/75 text-slate-950 transition-colors delay-75 hover:text-slate-800 py-3 rounded-sm uppercase font-bold tracking-wide text-sm cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      {...props}
    >
      {isLoading && <AiOutlineLoading size={18} color="#0f172b " className="animate-spin" />}
      {children}
    </button>
  );
};

export default CustomButton;
