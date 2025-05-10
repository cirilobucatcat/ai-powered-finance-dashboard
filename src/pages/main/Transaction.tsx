import Badge from '@/components/Badge';
import CustomSelect from '@/components/CustomSelect';
import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import SEO from '@/components/SEO';
import CreateForm from '@/components/transactions/CreateForm';
import DeleteForm from '@/components/transactions/DeleteForm';
import UpdateForm from '@/components/transactions/UpdateForm';
import { listen } from '@/services/transactions';
import { ITransaction, ModalProps } from '@/types';
import { modals } from '@/utils/constants';
import { formatToCurrency } from '@/utils/helpers';
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
    action: 'update' | 'delete'
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
      <SEO title="Transactions" />
      <div className="p-6 flex flex-col bg-slate-900 mx-6 mt-36 sm:mt-24 md:mt-24 rounded-lg">
        <h1 className="text-electric-lime text-2xl uppercase font-bold mb-4">
          Transctions
        </h1>
        <div className="flex items-end justify-between space-x-4">
          <div className="relative">
            <CiSearch
              className="absolute top-2 left-2"
              size={24}
              color="#cfff04"
            />
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search here"
              className="text-slate-50 text-sm pr-2 pl-8 py-2 placeholder:text-slate-500 border-2 border-electric-lime rounded outline-electric-lime w-xs"
            />
          </div>
          <div>
            <p className="text-electric-lime mb-2 text-sm">
              Filter by{' '}
              <span className="font-semibold tracking-tight">
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
          <button
            onClick={() => openModal('create-transaction-modal')}
            className="bg-electric-lime px-4 py-3 rounded-sm font-bold uppercase text-sm hover:bg-electric-lime/85 cursor-pointer transition-colors delay-100 tracking-wide"
          >
            Add Transaction
          </button>
        </div>
        <table className="text-electric-lime my-10 bg-slate-950 rounded-lg">
          <thead>
            <tr>
              <th className="py-4 text-base tracking-wide uppercase">
                Transaction
              </th>
              <th className="text-base tracking-wide uppercase">Amount</th>
              <th className="text-base tracking-wide uppercase">Type</th>
              <th className="text-base tracking-wide uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="odd:bg-slate-900 odd:hover:bg-slate-800/75 even:bg-slate-950 even:hover:bg-slate-900/75 transition-colors"
                >
                  <td className="py-3 text-slate-50 text-sm" align="center">
                    {transaction.transaction}
                  </td>
                  <td className="text-slate-50 text-sm" align="right">
                    {formatToCurrency(transaction.amount)}
                  </td>
                  <td align="center">
                    <Badge type={transaction.type} />
                  </td>
                  <td align="center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAction(transaction, 'update')}
                        className="w-16 rounded-sm text-slate-50 text-sm py-1 shadow bg-linear-to-r from-sky-500 to-blue-500 hover:opacity-80 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleAction(transaction, 'delete')}
                        className="w-16 rounded-sm text-slate-50 text-sm py-1 shadow bg-linear-to-r from-rose-500 to-red-500 hover:opacity-80 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination className="ml-auto bg-slate-900" />
        {modal && (
          <Modal
            title={modal?.title ?? 'Modal Title'}
            isOpen={isOpen}
            size="sm"
            onClose={handleOnCloseModal}
          >
            {modal?.id === 'create-transaction-modal' && <CreateForm />}
            {modal?.id === 'update-transaction-modal' && (
              <UpdateForm transaction={selectedTransaction} />
            )}
            {modal?.id === 'delete-transaction-modal' && (
              <DeleteForm transactionId={selectedTransaction?.id} />
            )}
          </Modal>
        )}
      </div>
    </>
  );
}
