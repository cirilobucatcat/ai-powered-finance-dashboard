import Badge from "@/components/Badge";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import { FormInput } from "@/components/FormInput";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import SEO from "@/components/SEO";
import { useLoading } from "@/hooks/loading";
import { listen, save } from "@/services/transactions";
import { ITransaction } from "@/types";
import { formatToCurrency } from "@/utils/helpers";
import { transactionFormSchema, TransactionFormType } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

export default function Transaction() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [searchTerm, setSearch] = useState('');

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormType>({
    resolver: zodResolver(transactionFormSchema),
  });

  const onSubmit: SubmitHandler<TransactionFormType> = async (data) => {
    startLoading();
    save(data)
      .then(() => {
        setIsOpen(false);
        reset();
        toast.success('Transaction saved')
      })
      .finally(stopLoading)
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  useEffect(() => {

    const unsubscribe = listen(setTransactions, { searchTerm: searchTerm });

    return () => unsubscribe();

  }, [searchTerm]);

  return (
    <>
      <SEO title="Transactions" />
      <div>
        <CustomSelect onChange={() => '123'} options={[{ label: 'Opton 1', value: 'option1'}]} />
      </div>
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
              Filter by{" "}
              <span className="font-semibold tracking-tight">
                Transaction Type
              </span>
            </p>
            <select className="rounded-sm border-2 border-electric-lime w-full outline-electric-lime text-slate-50 py-2 px-4 caret-red-500 text-sm">
              <option value="income" className="text-slate-950">
                Income
              </option>
              <option value="expense" className="text-slate-950">
                Expense
              </option>
            </select>
          </div>
          <button
            onClick={() => setIsOpen(true)}
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
            {transactions && transactions.map((transaction) => (<tr key={transaction.id} className="odd:bg-slate-900 odd:hover:bg-slate-800/75 even:bg-slate-950 even:hover:bg-slate-900/75 transition-colors">
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
                  <button className="w-16 rounded-sm text-slate-50 text-sm py-1 shadow bg-linear-to-r from-sky-500 to-blue-500 hover:opacity-80 cursor-pointer">
                    Edit
                  </button>
                  <button className="w-16 rounded-sm text-slate-50 text-sm py-1 shadow bg-linear-to-r from-rose-500 to-red-500 hover:opacity-80 cursor-pointer">
                    Delete
                  </button>
                </div>
              </td>
            </tr>))}
          </tbody>
        </table>
        <Pagination className="ml-auto bg-slate-900" />
        <Modal
          title="Create Transaction"
          isOpen={isOpen}
          size="sm"
          onClose={() => {
            setIsOpen(false);
            reset()
          }}
        >
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name='transaction'
              label="Transaction"
              type="text"
              register={register}
              error={errors.transaction}
              className="w-full"
              placeholder="Enter transaction description"
              containerClass="w-full"
            />
            <FormInput
              name='type'
              label="Type"
              type="text"
              register={register}
              error={errors.type}
              className="w-full"
              containerClass="w-full"
            />
            <FormInput
              name='amount'
              label="Amount"
              type="number"
              register={register}
              error={errors.amount}
              className="w-full"
              placeholder="Enter amout"
              containerClass="w-full"
            />
            <CustomButton
              disabled={isLoading}
              type="submit"
              className="w-full mt-4"
            >
              Submit
            </CustomButton>
          </form>
        </Modal>
      </div>
    </>
  );
}
