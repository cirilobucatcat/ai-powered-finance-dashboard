import { AiOutlineLoading } from 'react-icons/ai';

export default function Loading() {
  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center">
      <AiOutlineLoading size={60} color="#CFFF04" className="animate-spin" />
    </div>
  );
}
