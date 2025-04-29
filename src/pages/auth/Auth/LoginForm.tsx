import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { FormInput } from "../../../components/FormInput";
import { useLoading } from "../../../hooks/loading";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";

const loginSchema = z.object({
    email: z
        .string({ message: "Email is required" })
        .email("Please enter a valid email"),
    password: z
        .string({ message: "Password is required" })
        .min(1, "Password must contain at least 1 character(s)"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const { isLoading, startLoading, stopLoading } = useLoading();

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
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
                Sign in to your account
            </h1>
            <p className="text-xs sm:text-sm text-lime-700">Enter your credentials to view all insights</p>
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
            className="bg-lime-800 text-white w-full py-2 px-3 rounded disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
        >
            {isLoading ? "Loading..." : "Login"}
        </button>
    </form>)
}