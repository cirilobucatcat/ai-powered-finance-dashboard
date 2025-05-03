import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  title?: string;
  children: React.ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  size = "md",
  children,
  title,
}: ModalProps) => {
  const sizeVariants = {
    xs: "max-w-xs",
    sm: "max-w-sm sm:max-h-2xl md:max-h-2xl xl:max-h-xl",
    md: "max-w-md md:max-h-3/4 lg:max-h-[200px]",
    lg: "max-w-lg max-h-3/4",
    xl: "max-w-xl max-h-3/4",
    "2xl": "max-w-2xl max-h-3/4",
  } satisfies Record<NonNullable<ModalProps["size"]>, string>;

  const sizeVariant = sizeVariants[size];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          ></div>

          <div
            className={`relative bg-slate-950 text-slate-50 rounded-lg shadow-lg p-6 w-full animate-fade-in-up overflow-y-auto max-h-full custom-scrollbar ${sizeVariant}`}
          >
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
            {title && (
              <h2 className="mb-4 text-md font-bold text-electric-lime uppercase">
                {title}
              </h2>
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
