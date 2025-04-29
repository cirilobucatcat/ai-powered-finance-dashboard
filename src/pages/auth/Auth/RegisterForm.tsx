import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { FormInput } from "../../../components/FormInput";
import { useLoading } from "../../../hooks/loading";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

const registerSchema = z.object({
    full_name: z.string({ message: "Full Name is required" })
        .min(1, "Password must contain at least 1 character(s)"),
    email: z
        .string({ message: "Email is required" })
        .email("Please enter a valid email"),
    password: z
        .string({ message: "Password is required" })
        .min(1, "Password must contain at least 1 character(s)"),
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

    const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
        try {
            startLoading();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(data);
        } finally {
            stopLoading();
        }
    };
    return (<form
        onSubmit={handleSubmit(onSubmit)}
        className="px-3 sm:px-0 sm:w-1/2 h-3/4 flex flex-col items-center justify-start gap-4 font-open-sans"
    >
        <div className="text-center sm:text-start w-full">
            <h1 className="text-md sm:text-xl uppercase font-bold text-lime-800">
                Sign up to <span className="font-sour-gummy uppercase tracking-widest">Finebird</span>
            </h1>
            <p className="text-xs sm:text-sm text-lime-700">Start your financial journey with us</p>
        </div>

        <FormInput
            name="full_name"
            label="Full Name"
            register={register}
            error={errors.full_name}
            className="w-full"
            placeholder="Enter your full name"
            containerClass="w-full"
            prependIcon={<FaRegUser color="#3d6300" size={18} />}
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
            prependIcon={<MdOutlineAlternateEmail color="#3d6300" size={20} />}
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
            prependIcon={<IoKeyOutline color="#3d6300" size={20} />}
        />

        <button
            type="submit"
            disabled={isLoading}
            className="bg-lime-800 flex justify-center items-center text-white w-full text-sm py-3 rounded disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
        >
            {isLoading ? <AiOutlineLoading className="animate-spin" size={20}/> : "Register"}
        </button>
    </form>)
}