import Badge from '@/components/Badge';
import CustomButton from '@/components/CustomButton';
import CustomSelect from '@/components/CustomSelect';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import SEO from '@/components/SEO';
import CreateOrUpdateForm from '@/components/transactions/CreateOrUpdateForm';
import DeleteForm from '@/components/transactions/DeleteForm';
import { listen } from '@/services/transactions';
import { ITransaction, ModalProps, DataTableColumn, ModalAction } from '@/types';
import { modals } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

export default function Transaction() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState<ModalProps | undefined>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [selectedTransaction, setTransaction] = useState<
    ITransaction | undefined
  >();

  const transctionColumns: DataTableColumn[] = [
    {
      title: 'Transaction',
      key: 'transaction',
      align: 'right',
    },
    {
      title: 'Amount',
      format: 'currency',
      key: 'amount',
      align: 'right',
    },
    {
      title: 'Type',
      key: 'type',
      align: 'center',
      render(row) {
        return <Badge type={row.type} />;
      },
    },
    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render(row) {
        return (
          <div className='flex items-center justify-center gap-2'>
            <button
              onClick={() => handleAction(row, 'update')}
              className='w-16 rounded-sm text-slate-50 text-sm py-1 shadow bg-linear-to-r from-sky-500 to-blue-500 hover:opacity-80 cursor-pointer'
            >
              Edit
            </button>
            <button
              onClick={() => handleAction(row, 'delete')}
              className='w-16 rounded-sm text-slate-50 text-sm py-1 shadow bg-linear-to-r from-rose-500 to-red-500 hover:opacity-80 cursor-pointer'
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const transctionModals: ModalProps[] = (modals.transactions ??
    []) as ModalProps[];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  const handleOnCloseModal = () => {
    setIsOpen(false);
  };

  const openModal = (modalId: string) => {
    setModal(transctionModals.find((modal) => modal.id === modalId));
    setIsOpen(true);
  };

  const handleAction = (
    transaction: ITransaction,
    action: Omit<ModalAction, 'create'>
  ) => {
    setTransaction(transaction);
    openModal(
      action === 'update'
        ? 'update-transaction-modal'
        : 'delete-transaction-modal'
    );
  };

  useEffect(() => {
    const unsubscribe = listen(setTransactions, { searchTerm, filter });
    return () => unsubscribe();
  }, [searchTerm, filter]);

  return (
    <>
      <SEO title='Transactions' />
      <div className='p-6 flex flex-col bg-slate-900 mx-6 mt-36 sm:mt-24 md:mt-24 rounded-lg'>
        <h1 className='text-electric-lime text-2xl uppercase font-bold mb-4'>
          Transactions
        </h1>
        <div className='flex items-end justify-between space-x-4'>
          <div className='relative'>
            <CiSearch
              className='absolute top-2 left-2'
              size={24}
              color='#cfff04'
            />
            <input
              onChange={handleSearch}
              type='text'
              placeholder='Search here'
              className='text-slate-50 text-sm pr-2 pl-8 py-2 placeholder:text-slate-500 border-2 border-electric-lime rounded outline-electric-lime w-xs'
            />
          </div>
          <div>
            <p className='text-electric-lime mb-2 text-sm'>
              Filter by{' '}
              <span className='font-semibold tracking-tight'>
                Transaction Type
              </span>
            </p>
            <CustomSelect
              onChange={(e) => {
                const value = e.target.value;
                setFilter(value);
              }}
              options={[
                {
                  value: '',
                  label: 'All',
                },
                {
                  value: 'income',
                  label: 'Income',
                },
                {
                  value: 'expense',
                  label: 'Expense',
                },
              ]}
            />
          </div>
          <CustomButton
            onClick={() => openModal('create-transaction-modal')}
            className='bg-electric-lime px-4 py-3 rounded-sm font-bold uppercase text-sm hover:bg-electric-lime/85 cursor-pointer transition-colors delay-100 tracking-wide'
          >
            Add Transaction
          </CustomButton>
        </div>
        <DataTable columns={transctionColumns} data={transactions} />
        <Pagination className='ml-auto bg-slate-900' />
        {modal && (
          <Modal
            title={modal?.title ?? 'Modal Title'}
            isOpen={isOpen}
            size='sm'
            onClose={handleOnCloseModal}
          >
            {['update-transaction-modal', 'create-transaction-modal'].includes(
              modal?.id
            ) && (
              <CreateOrUpdateForm
                action={modal.action}
                transaction={selectedTransaction}
                dismiss={() => setIsOpen(false)}
              />
            )}
            {modal?.id === 'delete-transaction-modal' && (
              <DeleteForm
                transactionId={selectedTransaction?.id}
                dismiss={() => setIsOpen(false)}
              />
            )}
          </Modal>
        )}
      </div>
    </>
  );
}
