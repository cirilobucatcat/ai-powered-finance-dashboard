import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  SelectHTMLAttributes,
  TableHTMLAttributes,
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
  transactionAt: string;
  amount: number;
  category: string;
  userId: string;
  createdAt?: Date
}

export type ModalAction = 'create' | 'update' | 'delete';

export type ModalProps = {
  title: string;
  id: string;
  action: ModalAction;
};

export type DataTableColumn = {
  title: string;
  key: string;
  format?: 'currency' | 'date';
  align?: 'left' | 'center' | 'right' | 'justify' | 'char';
  render?: (data: TData) => string | React.ReactNode;
};

export type DataTableProp<TData> = TableHTMLAttributes<HTMLTableElement> & {
  columns: DataTableColumn[];
  data: TData[];
};

type IncomeVsExpense = {
  year: number | string;
  totalExpense: number;
  totalIncome: number;
}

type MonthlyComparison = Omit<IncomeVsExpense, 'year'> & {
  month: string;
  totalSavings: number
}

export type DashboardCountData = {
  monthIncome: number;
  monthExpense: number;
  monthSaving: number;
  incomeVsExpense: IncomeVsExpense[],
  monthlyComparison: MonthlyComparison[]
  spendingByCategory: {
    category: string,
    amount: number
  }[],
  transactions: ITransaction[]
};
