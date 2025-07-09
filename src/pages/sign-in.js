import Layout from "@/components/layouts";
import TextField from "@/components/TextField";
import { constants } from "@/constants";
import { loginSchema } from "@/schema/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

const SignIn = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    const { password, email } = data;
    const body = JSON.stringify({ email, password });

    const res = await axios.post(constants.apiURL + "/user/login", body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.statusText != "OK") {
      console.log("signin failed");
    } else {
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/account");
    }
  };

  return (
    <>
      <div className="min-h-full py-12 lg:px-8 max-w-md mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="Email"
              name="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <TextField
              label="Password"
              name="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Link
              href="/forgot-password"
              className="text-neutral-400 text-xs mt-2 block text-right hover:underline"
            >
              Forgot password?
            </Link>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-red-600 block  w-full"
            >
              Sign In
            </button>
          </form>
        </FormProvider>
        <p className="text-neutral-400 text-xs mt-6 text-center">
          Don&apos;t have an account?
          <Link href="/register" className="ml-2 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

SignIn.getLayout = function getLayout(page) {
  return <Layout variant="clean">{page}</Layout>;
};

export default SignIn;
