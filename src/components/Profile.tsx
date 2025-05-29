import { useAuth } from '@/context/AuthContext'
import Popover from './Popover'
import { PiCaretDown } from "react-icons/pi";
import { GoGear, GoSignOut  } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, logout } = useAuth()
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await logout()
            .then(() => {
                navigate('/')
            })
    }

    return (<div className="z-100 sticky top-0 right-2 h-20 sm:right-4 flex flex-row-reverse items-center gap-2 py-4 px-4 bg-slate-800">
        <div className="hidden md:flex items-center justify-center gap-x-4">
            <Popover
                contentClass='!left-[-200%]'
                content={
                    <div
                        className='bg-slate-950 !w-64 p-2 rounded-md'
                    >
                        <div className='bg-slate-900 py-2 px-4'>
                            <p className="text-slate-100 text-sm font-bold uppercase">{user?.displayName}</p>
                            <p className="text-slate-400 text-xs">@username</p>
                        </div>

                        <div className='flex flex-col gap-y-4 my-4 px-4 rounded-md'>
                            <div className='w-full text-electric-lime flex flex-row items-center justify-start gap-x-2'>
                                <div className='size-6 flex items-center justify-center bg-electric-lime rounded-full'>
                                    <GoGear color='#000' />
                                </div>
                                <p className='text-xs text-slate-50'>Profile Settings</p>
                            </div>
                            <div role='button' onClick={() => handleSignOut()} className='w-full text-electric-lime flex flex-row items-center justify-start gap-x-2 cursor-pointer'>
                                <div className='size-6 flex items-center justify-center bg-electric-lime rounded-full'>
                                    <GoSignOut color='#000' />
                                </div>
                                <p className='text-xs text-slate-50'>Logout</p>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className='relative cursor-pointer group'>
                    <img
                        src="https://scontent.fmnl25-5.fna.fbcdn.net/v/t39.30808-1/471162208_2094423670994215_4901615143098007225_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEBUguxxgqfxYv3omw9_zy8cReVGGgysdFxF5UYaDKx0btYH4L9woPf0erLX4B-LrAm-bHdUfvEX_f1jrUgsIaZ&_nc_ohc=rr47v5SKNx0Q7kNvwEcKaSQ&_nc_oc=AdmPWC-LHKMVO6IjGiY1yYcunyCuTeIAH5zSELJACdbv-DSz8Uw_SR1LM2yppdZ-Z7g&_nc_zt=24&_nc_ht=scontent.fmnl25-5.fna&_nc_gid=MxKW7eP3hNmZvMd7iAJlGA&oh=00_AfLB0bG7mYOQuyu2rcKzItzKctXY4LpNjzxRBrSsCLhraA&oe=683DC25A"
                        className="rounded-full border-2 border-electric-lime group-hover:border-electric-lime/80 group-hover:transition-all"
                        alt="Profile pic"
                    />
                    <PiCaretDown 
                        className='absolute bottom-0 right-[-5%] bg-electric-lime group-hover:bg-electric-lime/80 rounded-full group-hover:transition-all' 
                        color='#000' 
                        size={18} 
                    />
                </div>
            </Popover>
        </div>
    </div>)
}