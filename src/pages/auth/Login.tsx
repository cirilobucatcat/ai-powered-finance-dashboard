import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import ErrorMessage from "../../components/ErrorMessage";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Please enter a valid email"),
  password: z.string({ message: "Password is required" })
    .min(1, 'Password must contain at least 1 character(s)'),
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
  const onSubmit: SubmitHandler<LoginSchema> = (data) => console.log(data);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[400px] h-1/2 flex flex-col shadow rounded py-6 px-18 items-center justify-center gap-4"
      >
        <input
          {...register("email")}
          type="text"
          name="email"
          className="w-full border border-blue-500 py-2 px-3 rounded"
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
        
        <input
          {...register("password")}
          type="password"
          name="password"
          className="w-full border border-blue-500 py-2 px-3 rounded"
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 px-3 rounded dark:text-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
