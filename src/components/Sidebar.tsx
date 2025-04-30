import { useState } from "react"

export default function Sidebar() {
    const [show, setShow] = useState(true);
    return(
        <div className={`${show ? 'w-[300px]' : 'w-[100px]'} bg-slate-800 h-screen flex flex-col`}>
            {show && <p className="text-electric-lime uppercase font-bold text-2xl font-sour-gummy tracking-wider text-center mt-4">Finebird</p>}
        </div>
    )
}