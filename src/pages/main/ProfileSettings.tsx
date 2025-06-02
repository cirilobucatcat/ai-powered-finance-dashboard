import { FormInput } from '@/components/FormInput';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

import * as z from 'zod';

const loginSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email('Please enter a valid email'),
  password: z
    .string({ message: 'Password is required' })
    .min(1, 'Password must contain at least 1 character(s)'),
});

type LoginSchema = z.infer<typeof loginSchema>;

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    console.log(data)
  }

  return (
    <>
      <SEO title='Profile Settings' />
      <div className='text-slate-50 p-10 text-justify flex items-center justify-center'>
        <div className='w-3/4 bg-slate-900 rounded-md p-6'>
          <h3 className='text-electric-lime font-bold text-2xl uppercase'>Profile Settings</h3>
        </div>
      </div>
    </>
  )
}

export default ProfileSettings