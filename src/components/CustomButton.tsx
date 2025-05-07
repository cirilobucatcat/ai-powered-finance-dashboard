import React, { ButtonHTMLAttributes } from "react";
import { AiOutlineLoading } from "react-icons/ai";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
};

const CustomButton = ({
  children,
  className = "",
  isLoading = true,
  ...props
}: CustomButtonProps) => {

  
  return (
    <button
      className={`flex items-center justify-center gap-2 bg-electric-lime hover:bg-electric-lime/75 text-slate-900 transition-colors delay-75 hover:text-slate-800 py-2 rounded-sm uppercase font-bold tracking-wide text-sm cursor-pointer disabled:bg-electric-lime/60 ${className}`}
      disabled={isLoading}      
      {...props}
    >
      {isLoading && <AiOutlineLoading className="animate-spin" size={24} />}
      {children}
    </button>
  );
};

export default CustomButton;
