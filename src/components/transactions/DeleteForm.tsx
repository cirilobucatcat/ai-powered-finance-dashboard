import { ITransaction } from '@/types';
import CustomButton from '../CustomButton';

type DeletFormProp = {
  transactionId?: ITransaction['id'];
};

const DeleteForm = ({ transactionId }: DeletFormProp) => {
  return (
    <div className="text-center">
      Are you sure you want to delete this transction?
      <CustomButton className="w-full" disabled={!transactionId}>
        Confirm
      </CustomButton>
    </div>
  );
};

export default DeleteForm;
