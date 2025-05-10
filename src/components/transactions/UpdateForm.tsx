import { ITransaction } from '@/types';

type UpdateFormProp = {
  transaction?: ITransaction;
};
const UpdateForm = ({ transaction }: UpdateFormProp) => {
  return <div>{JSON.stringify(transaction)}</div>;
};

export default UpdateForm;
