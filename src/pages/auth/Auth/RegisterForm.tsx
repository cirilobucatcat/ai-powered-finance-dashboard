import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoKeyOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { useLoading } from '@/hooks/loading';
import { FormInput } from '@/components/FormInput';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
    full_name: z.string({ message: 'Full Name is required' })
        .min(1, 'Password must contain at least 1 character(s)'),
    email: z
        .string({ message: 'Email is required' })
        .email('Please enter a valid email'),
    password: z
        .string({ message: 'Password is required' })
        .min(1, 'Password must contain at least 1 character(s)'),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const { isLoading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {

        const { full_name, email, password } = data;
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        
        startLoading();
        await updateProfile(user, { displayName: full_name })
            .then(() => navigate('dashboard'))
            .finally(() => stopLoading());

    };
    return (<form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 w-full sm:px-0 sm:w-1/2 h-3/4 flex flex-col items-center justify-start gap-4 font-open-sans"
    >
        <div className="text-center sm:text-start w-full">
            <h1 className="text-md sm:text-xl uppercase font-bold text-electric-lime">
                Register to <span className="font-tomorrow uppercase tracking-widest">Finebird</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">Start your financial journey with us</p>
        </div>

        <FormInput
            name="full_name"
            label="Full Name"
            type='text'
            register={register}
            error={errors.full_name}
            className="w-full"
            placeholder="Enter your full name"
            containerClass="w-full"
            prependIcon={<FaRegUser color="#cfff04" size={18} />}
        />

        <FormInput
            name="email"
            label="Email"
            type="email"
            register={register}
            error={errors.email}
            className="w-full"
            placeholder="Enter your email"
            containerClass="w-full"
            prependIcon={<MdOutlineAlternateEmail color="#cfff04" size={20} />}
        />

        <FormInput
            name="password"
            label="Password"
            type="password"
            register={register}
            error={errors.password}
            className="w-full"
            placeholder="Enter your password"
            containerClass="w-full"
            prependIcon={<IoKeyOutline color="#cfff04" size={20} />}
        />

        <button
            type="submit"
            disabled={isLoading}
            className="bg-electric-lime flex justify-center items-center text-slate-900 w-full text-sm py-3 rounded disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
        >
            {isLoading ? <AiOutlineLoading className="animate-spin" size={20}/> : 'Register'}
        </button>
    </form>)
}