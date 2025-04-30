import SEO from "@/components/SEO";
import { CiSearch } from "react-icons/ci";

export default function Transaction() {
  return (
    <>
      <SEO title="Transactions" />
      <div className="p-6 flex flex-col bg-slate-900 mx-6 mt-36 rounded-lg">
        <h1 className="text-electric-lime text-2xl uppercase font-bold mb-4">
          Transctions
        </h1>
        <div className="flex items-end justify-between">
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
              Filter by <span className="font-semibold tracking-tight">Transaction Type</span>
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
      </div>
    </>
  );
}
