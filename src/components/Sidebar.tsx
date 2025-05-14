import { useState } from 'react'
import { MdOutlineDashboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { FaLightbulb, FaMoneyBillTransfer } from 'react-icons/fa6';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

export default function Sidebar() {

    const [show, setShow] = useState(true);

    const navState = {
        'active': 'nav-item group transition-all border-e-4 border-electric-lime text-electric-lime',
        'inactive': 'nav-item group'
    }

    return (
        <div className={`${show ? 'hidden sm:flex w-[300px]' : 'w-[100px]'} bg-slate-800 h-screen flex flex-col transition-all`}>
            {show && <p className="text-electric-lime uppercase font-bold text-2xl font-tomorrow tracking-tight text-center mt-12 mb-8">Finebird</p>}
            <ul className={`${show ? 'mt-4 ml-4' : 'ml-8 mt-32'}`}>
                <NavLink
                    to='/dashboard'
                    title='Dashboard'
                    className={({ isActive }) => (navState[isActive ? 'active' : 'inactive'])}
                >
                    {({ isActive }) => (
                        <div className="flex gap-4">
                            <MdOutlineDashboard className="group-hover:text-electric-lime transition-colors delay-75" size={22} color={`${isActive ? '#CFFF04' : ''}`} />
                            {show && <p className={`text-sm group-hover:text-electric-lime transition-colors delay-75 ${isActive && 'text-electric-lime'}`}>Dashboard</p>}
                        </div>
                    )}
                </NavLink>
                <NavLink
                    to='/transactions'
                    title='Transactions'
                    className={({ isActive }) => (navState[isActive ? 'active' : 'inactive'])}
                >
                    {({ isActive }) => (
                        <div className="flex gap-4">
                            <FaMoneyBillTransfer className="group-hover:text-electric-lime transition-colors delay-75" size={22} color={`${isActive ? '#CFFF04' : ''}`} />
                            {show && <p className={`text-sm group-hover:text-electric-lime transition-colors delay-75 ${isActive && 'text-electric-lime'}`}>Transactions</p>}
                        </div>
                    )}
                </NavLink>
                <NavLink
                    to='/insights'
                    title='Insights'
                    className={({ isActive }) => (navState[isActive ? 'active' : 'inactive'])}
                >
                    {({ isActive }) => (
                        <div className="flex gap-4">
                            <FaLightbulb className="group-hover:text-electric-lime transition-colors delay-75" size={22} color={`${isActive ? '#CFFF04' : ''}`} />
                            {show && <p className={`text-sm group-hover:text-electric-lime transition-colors delay-75 ${isActive && 'text-electric-lime'}`}>Insights</p>}
                        </div>
                    )}
                </NavLink>
            </ul>
            <button
                onClick={() => setShow((val) => !val)}
                className={`bg-slate-950 text-electric-lime flex items-center justify-center rounded-md size-12 cursor-pointer mt-auto mb-4 ${show ? 'ml-auto mr-4' : 'mx-auto'}`}
            >
                {show ? <GoSidebarCollapse size={24} /> : <GoSidebarExpand size={24} />}
            </button>
        </div>
    )
}