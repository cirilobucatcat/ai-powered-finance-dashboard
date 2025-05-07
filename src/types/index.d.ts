import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
  prependIcon?: React.ReactNode
  name: Path<T>;
  label?: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  containerClass?: string;
}

export interface ITransaction {
  id: string;
  transaction: string,
  type: 'income' | 'expense',
  amount: number
}