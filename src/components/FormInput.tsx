import { FieldValues } from "react-hook-form";
import { FormInputProps } from "../types/index";
import ErrorMessage from "./ErrorMessage";

export function FormInput<T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  error,
  placeholder,
  className = "",
  containerClass = ''
}: FormInputProps<T>) {
  return (
    <div className={`${containerClass}`}>
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium text-sm text-lime-800">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border-b-2 bg-lime-50 border-lime-800 outline-lime-800 p-3 text-sm ${className}`}
        {...register(name)}
      />
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}
