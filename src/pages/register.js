import Layout from "@/components/layouts";
import TextField from "@/components/TextField";
import { constants } from "@/constants";
import { registerSchema } from "@/schema/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

const Register = () => {
  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  console.log(errors);

  const onSubmit = async (data) => {
    console.log(data);
    const { cpassword, ...rest } = data;

    const res = await fetch(constants.apiURL + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });

    const jsonRes = await res.json();
    console.log(jsonRes);
  };

  return (
    <>
      <div className="min-h-full lg:px-8 max-w-md mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
            Register your account
          </h2>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="Username"
              name="username"
              {...register("username")}
              error={errors.username?.message}
            />
            <TextField
              label="Email"
              name="useremail"
              {...register("email")}
              error={errors.email?.message}
            />
            <TextField
              label="Password"
              name="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              name="cpassword"
              {...register("cpassword")}
              error={errors.cpassword?.message}
            />

            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className="px-4 py-2 rounded bg-red-600 disabled:bg-neutral-800 block w-full cursor-pointer disabled:cursor-not-allowed"
            >
              Sign Up
            </button>
          </form>
        </FormProvider>

        <p className="text-neutral-400 text-xs mt-6 text-right">
          Already have an account?
          <Link href="/sign-in" className="ml-2 underline">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

Register.getLayout = function getLayout(page) {
  return <Layout variant="clean">{page}</Layout>;
};

export default Register;
