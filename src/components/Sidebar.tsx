import { useState } from "react"
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
    const [show, setShow] = useState(true);
    const { user } = useAuth();

    const navState = {
        'active': 'nav-item group transition-all border-e-4 border-electric-lime text-electric-lime',
        'inactive': 'nav-item group'
    }

    return (
        <div className={`${show ? 'hidden sm:flex w-[300px]' : 'w-[100px]'} bg-slate-800 h-screen flex flex-col`}>
            {show && <p className="text-electric-lime uppercase font-bold text-2xl font-sour-gummy tracking-wider text-center mt-12 mb-8">Finebird</p>}

            <ul className="ml-4">
                <NavLink
                    to='/dashboard'
                    className={({ isActive }) => (navState[isActive ? 'active' : 'inactive'])}
                >
                    {({ isActive }) => (
                        <div className="flex gap-4">
                            <MdOutlineDashboard className="group-hover:text-electric-lime transition-colors delay-75" size={22} color={`${isActive ? '#CFFF04' : ''}`} />
                            <p className={`text-sm group-hover:text-electric-lime transition-colors delay-75 ${isActive && 'text-electric-lime'}`}>Dashboard</p>
                        </div>
                    )}
                </NavLink>
                <li>
                    <NavLink
                        to='/transactions'
                        className={({ isActive }) => (navState[isActive ? 'active' : 'inactive'])}
                    >
                        {({ isActive }) => (
                            <div className="flex gap-4">
                                <FaMoneyBillTransfer className="group-hover:text-electric-lime transition-colors delay-75" size={22} color={`${isActive ? '#CFFF04' : ''}`} />
                                <p className={`text-sm group-hover:text-electric-lime transition-colors delay-75 ${isActive && 'text-electric-lime'}`}>Transactions</p>
                            </div>
                        )}
                    </NavLink>
                </li>
            </ul>
            <button className="cursor-pointer mt-auto mb-4 bg-electric-lime rounded-s-full rounded-e-full text-sm uppercase text-slate-900 font-bold py-2 mx-4">
                Add Card
            </button>
        </div>
    )
}