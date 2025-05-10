import React from 'react';
import { FormInput } from '../FormInput';
import CustomButton from '../CustomButton';
import { transactionFormSchema, TransactionFormType } from '@/validators';
import { SubmitHandler, useForm } from 'react-hook-form';
import { save } from '@/services/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoading } from '@/hooks/loading';
import toast from 'react-hot-toast';

const CreateForm = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormType>({
    resolver: zodResolver(transactionFormSchema),
  });
  
  const onSubmit: SubmitHandler<TransactionFormType> = async (data) => {
    startLoading();
    save(data)
      .then(handleSuccessReponse)
      .finally(stopLoading);
  };

  const handleSuccessReponse = () => {
    // setIsOpen(false);
    reset();
    toast.success('Transaction saved');
  }
  const handleTransactionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as 'income' | 'expense';
    setValue('type', value);
  };
  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="transaction"
        label="Transaction"
        type="text"
        register={register}
        error={errors.transaction}
        className="w-full"
        placeholder="Enter transaction description"
        containerClass="w-full"
      />
      <FormInput
        name="type"
        label="Type"
        type="select"
        register={register}
        error={errors.type}
        onSelectChange={handleTransactionTypeChange}
        selectOptions={[
          {
            label: 'Income',
            value: 'income',
          },
          {
            label: 'Expense',
            value: 'expense',
          },
        ]}
        className="w-full"
        containerClass="w-full"
      />
      <FormInput
        name="amount"
        label="Amount"
        type="number"
        register={register}
        error={errors.amount}
        className="w-full"
        placeholder="Enter amout"
        containerClass="w-full"
      />
      <CustomButton disabled={isLoading} type="submit" className="w-full mt-4">
        Submit
      </CustomButton>
    </form>
  );
};

export default CreateForm;
