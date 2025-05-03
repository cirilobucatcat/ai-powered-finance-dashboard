import CustomButton from "@/components/CustomButton";
import { FormInput } from "@/components/FormInput";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import SEO from "@/components/SEO";
import { useLoading } from "@/hooks/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import * as z from "zod";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Please enter a valid email"),
  password: z
    .string({ message: "Password is required" })
    .min(1, "Password must contain at least 1 character(s)"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Transaction() {
  const [isOpen, setIsOpen] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    startLoading();
  };

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
            className="bg-electric-lime px-4 py-2 rounded-sm font-bold uppercase text-sm hover:bg-electric-lime/85 cursor-pointer transition-colors delay-100 tracking-wide"
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
            <tr className="bg-slate-900 transition-colors hover:bg-slate-900/75">
              <td className="py-3 text-slate-50 text-sm" align="center">
                Pumalit hin Chippy
              </td>
              <td className="text-slate-50 text-sm" align="right">
                5
              </td>
              <td align="center">
                <p className="text-red-900 bg-red-50/75 w-fit rounded text-[10px] px-2 py-0.5 uppercase font-bold tracking-tighter">
                  Expense
                </p>
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
            </tr>
            <tr className="bg-slate-950 transition-colors hover:bg-slate-800/75">
              <td className="text-center py-3 text-slate-50 text-sm">
                Nag save kay dili ta rich
              </td>
              <td className="text-end text-slate-50 text-sm">1000</td>
              <td align="center">
                <p className="text-green-900 bg-green-50/75 w-fit rounded text-[10px] px-2 py-0.5 uppercase font-bold tracking-tighter">
                  Income
                </p>
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
            </tr>
          </tbody>
        </table>
        <Pagination className="ml-auto bg-slate-900" />
        <Modal
          title="Create Transaction"
          isOpen={isOpen}
          size="sm"
          onClose={() => setIsOpen(false)}
        >
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="email"
              label="Transaction"
              type="text"
              register={register}
              error={errors.email}
              className="w-full"
              placeholder="Enter transaction description"
              containerClass="w-full"
            />
            <FormInput
              name="email"
              label="Type"
              type="number"
              register={register}
              error={errors.email}
              className="w-full"
              containerClass="w-full"
            />
            <FormInput
              name="email"
              label="Amount"
              type="number"
              register={register}
              error={errors.email}
              className="w-full"
              placeholder="Enter amout"
              containerClass="w-full"
            />
            <CustomButton type="submit" className="w-full mt-4">
              Submit
            </CustomButton>
          </form>
        </Modal>
      </div>
    </>
  );
}
