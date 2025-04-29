
import AuthHero from "./Auth/Hero";
import { useEffect, useState } from "react";
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterAndLogin() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(user) navigate('/dashboard')
  })

  return (
    <div className='w-full h-screen grid grid-cols-2 gap-2 bg-lime-50 p-6'>
      <AuthHero />
      <div className="col-span-full sm:col-span-1 w-full flex flex-col items-center justify-center bg-white shadow rounded-xl p-6">
        <div className="mb-12 font-open-sans bg-lime-100 py-1 px-2 rounded-lg space-x-4">
          <button onClick={() => setTab('login')} className={`cursor-pointer text-xs py-1 font-semibold ${tab === 'login' ? 'bg-lime-700 text-lime-50' : 'bg-lime-300 text-lime-700'} w-[80px] rounded uppercase tracking-wide`}>Sign in</button>
          <button onClick={() => setTab('register')} className={`cursor-pointer text-xs py-1 font-semibold ${tab === 'register' ? 'bg-lime-700 text-lime-50' : 'bg-lime-300 text-lime-700'} w-[80px] rounded uppercase tracking-wide`}>Register</button>
        </div>
        {tab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
