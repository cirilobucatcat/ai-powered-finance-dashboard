import { ITransaction } from "@/types";
import CustomButton from "../CustomButton";
import { useLoading } from "@/hooks/loading";
import { deleteTransaction } from "@/services/transactions";
import toast from "react-hot-toast";

type DeletFormProp = {
  dismiss: () => void;
  transactionId?: ITransaction["id"];
};

const DeleteForm = ({ transactionId, dismiss }: DeletFormProp) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleDeleteConfirm = async () => {
    startLoading()
    deleteTransaction(transactionId as string)
      .then(handleSuccessReponse)
      .finally(stopLoading);

    return;
  };

  const handleSuccessReponse = () => {
    dismiss();
    toast.success(`Transaction successfully deleted.`);
  };

  return (
    <div className="text-center space-y-4">
      <p>Are you sure you want to delete this transaction?</p>
      <CustomButton
        onClick={handleDeleteConfirm}
        isLoading={isLoading}
        disabled={(!transactionId) || isLoading}
        className="w-full"
      >
        Confirm
      </CustomButton>
    </div>
  );
};

export default DeleteForm;
