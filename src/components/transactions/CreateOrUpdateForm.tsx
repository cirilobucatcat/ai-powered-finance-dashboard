import { useEffect } from 'react';
import { FormInput } from '../FormInput';
import CustomButton from '../CustomButton';
import { transactionFormSchema, TransactionFormType } from '@/validators';
import { SubmitHandler, useForm } from 'react-hook-form';
import { save, update } from '@/services/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoading } from '@/hooks/loading';
import toast from 'react-hot-toast';
import { ITransaction, ModalAction } from '@/types';

type CreateOrUpdateFormProp = {
  dismiss: () => void,
  transaction?: ITransaction
  action: Omit<ModalAction, 'delete'>
}

const CreateOrUpdateForm = ({ dismiss, transaction, action }: CreateOrUpdateFormProp) => {
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
    if(action === 'create') {
      save(data)
        .then(handleSuccessReponse)
        .finally(stopLoading);
      return
    } 

    if(action === 'update') {
      update(transaction?.id as string, data)
        .then(handleSuccessReponse)
        .finally(stopLoading)
        
      return
    }
  };

  const handleSuccessReponse = () => {
    dismiss();
    reset();
    toast.success(`Transaction successfully ${action}d.`)
  }

  useEffect(() => {
    
    if(action === 'update' && transaction) {
      setValue('transaction', transaction.transaction);
      setValue('type', transaction.type, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      setValue('transactionAt', transaction.transactionAt);
      setValue('category', transaction.category);
      setValue('amount', String(transaction.amount));
    }

  }, []);

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
        selectOptions={[
          { label: 'Income', value: 'income' },
          { label: 'Expense', value: 'expense' },
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
        placeholder="Enter amount"
        containerClass="w-full"
      />
      <FormInput
        name="category"
        label="Category"
        type="text"
        register={register}
        error={errors.category}
        className="w-full"
        placeholder="Enter category"
        containerClass="w-full"
      />
      <FormInput
        name="transactionAt"
        label="Date"
        type="date"
        register={register}
        error={errors.transactionAt}
        className="w-full"
        containerClass="w-full"
      />
      <CustomButton 
        isLoading={isLoading}
        disabled={isLoading} 
        type="submit" 
        className="w-full mt-4"
      >
        Submit
      </CustomButton>
    </form>
  );
};

export default CreateOrUpdateForm;
