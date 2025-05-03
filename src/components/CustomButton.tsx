import React, { ButtonHTMLAttributes } from "react";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const CustomButton = ({
  children,
  className = "",
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className={`bg-electric-lime hover:bg-electric-lime/75 text-slate-900 transition-colors delay-75 hover:text-slate-800 py-2 rounded-sm uppercase font-bold tracking-wide text-sm cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
