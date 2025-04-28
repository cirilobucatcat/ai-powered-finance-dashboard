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
        <label htmlFor={name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border border-blue-500 py-2 px-3 rounded ${className}`}
        {...register(name)}
      />
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}
