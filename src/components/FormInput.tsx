import { FieldValues } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { FormInputProps } from "@/types";

export function FormInput<T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  error,
  placeholder,
  className = "",
  containerClass = '',
  prependIcon
}: FormInputProps<T>) {
  return (
    <div className={`relative ${containerClass}`}>
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium text-sm text-electric-lime">
          {label}
        </label>
      )}
      {prependIcon && <div className="absolute top-[36px] left-2 bottom-[12px]">{prependIcon}</div> }
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border-2 rounded-sm bg-slate-800 border-electric-lime outline-electric-lime text-slate-50 p-3 text-sm ${className} ${prependIcon ? 'pl-8' : 'px-3'}`}
        {...register(name)}
      />
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}
