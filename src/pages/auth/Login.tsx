import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import ErrorMessage from "../../components/ErrorMessage";
import { FormInput } from "../../components/FormInput";
import { useLoading } from "../../hooks/loading";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Please enter a valid email"),
  password: z
    .string({ message: "Password is required" })
    .min(1, "Password must contain at least 1 character(s)"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
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

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[400px] h-1/2 flex flex-col shadow rounded py-6 px-18 items-center justify-center gap-4"
      >
        <h1 className="text-xl uppercase font-bold tracking-wider">
          Login your account
        </h1>
        <FormInput
          name="email"
          label="Email"
          type="email"
          register={register}
          error={errors.email}
          className="w-full"
          placeholder="Enter your email"
          containerClass="w-full"
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
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white w-full py-2 px-3 rounded dark:text-blue-500 disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
