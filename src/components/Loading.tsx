import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="w-full h-screen bg-lime-100 flex items-center justify-center">
      <AiOutlineLoading size={40} color="#3d6300" className="animate-spin" />
    </div>
  );
}
