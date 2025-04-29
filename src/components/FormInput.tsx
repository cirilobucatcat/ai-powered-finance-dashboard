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
        <label htmlFor={name} className="block mb-1 font-medium text-sm text-lime-800">
          {label}
        </label>
      )}
      {prependIcon && <div className="absolute top-[36px] left-2 bottom-[12px]">{prependIcon}</div> }
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border-b-2 bg-lime-50 border-lime-800 outline-lime-800 p-3 text-sm ${className} ${prependIcon ? 'pl-8' : 'px-3'}`}
        {...register(name)}
      />
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}
