import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoKeyOutline } from 'react-icons/io5';
import { useLoading } from '@/hooks/loading';
import { FormInput } from '@/components/FormInput';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import CustomButton from '@/components/CustomButton';

const loginSchema = z.object({
    email: z
        .string({ message: 'Email is required' })
        .email('Please enter a valid email'),
    password: z
        .string({ message: 'Password is required' })
        .min(1, 'Password must contain at least 1 character(s)'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const { isLoading, startLoading, stopLoading } = useLoading();
    const { login } = useAuth();

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        startLoading();
        const { email, password } = data;
        await signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                login(user.user)
                navigate('/dashboard')
            })
            .catch((error: FirebaseError) => {
                console.log(error.code)
            })
            .finally(() => stopLoading())
    };
    
    return (<form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 w-full sm:px-0 sm:w-1/2 h-3/4 flex flex-col items-center justify-start gap-4 font-open-sans"
    >
        <div className="text-center sm:text-start w-full">
            <h1 className="text-md sm:text-xl uppercase font-bold text-electric-lime">
                Sign in to your account
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">Enter your credentials to view all insights</p>
        </div>
        
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

        <CustomButton
            isLoading={isLoading}
            type="submit"
            disabled={isLoading}
            className="bg-electric-lime flex justify-center items-center text-slate-900 w-full text-sm p-3 rounded disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
        >
            {isLoading ? 'Logging in...': 'Login'}
        </CustomButton>
    </form>)
}