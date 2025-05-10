import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  SelectHTMLAttributes,
} from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

type OptionProps = {
  value: string;
  label: string;
};

export type FormInputProps<T extends FieldValues> = {
  prependIcon?: React.ReactNode;
  name: Path<T>;
  label?: string;
  type?: HTMLInputTypeAttribute | 'select';
  register: UseFormRegister<T>;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  containerClass?: string;
  onSelectChange?: CustomSelectProps['onChange'];
  selectOptions?: OptionProps[];
};

export type CustomSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: OptionProps[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  placeholderValue?: {
    label: string;
    value: string;
  };
};

export interface ITransaction {
  id: string;
  transaction: string;
  type: 'income' | 'expense';
  amount: number;
  userId: string;
}

export type ModalAction = 'create' | 'update' | 'delete';

export type ModalProps = {
  title: string;
  id: string;
  action: ModalAction
};
