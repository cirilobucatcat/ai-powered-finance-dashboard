import { ModalProps } from '@/types';
import { ToasterProps } from 'react-hot-toast';

export const customToasterProps: ToasterProps = {
  position: 'top-center',
  toastOptions: {
    className: '',
    style: {
      backgroundColor: '#0f172b',
      color: '#cfff04',
      borderRadius: '0.5rem',
    },
  },
};

export const modals: Record<string, ModalProps[]> = {
  transactions: [
    {
      title: 'Create Transaction',
      id: 'create-transaction-modal',
    },
    {
      title: 'Update Transaction',
      id: 'update-transaction-modal',
    },
    {
      title: 'Delete Transaction',
      id: 'delete-transaction-modal',
    },
  ],
};
