import { useAuth } from "@/context/AuthContext"

export default function Profile() {
    const { user } = useAuth()
    return (<div className="z-100 absolute right-2 sm:right-4 top-4 flex flex-row-reverse items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 mx-4 rounded-lg">
        <img
            src="https://placehold.co/46x46"
            className="rounded-full border-2 border-electric-lime"
            alt="Profile pic"
        />
        <div className="hidden md:block ">
            <p className="text-slate-100 text-sm font-bold uppercase">{user?.displayName}</p>
            <p className="text-slate-400 text-xs">@username</p>
        </div>
    </div>)
}