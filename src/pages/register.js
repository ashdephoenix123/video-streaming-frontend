import Layout from "@/components/layouts";
import TextField from "@/components/TextField";
import { constants } from "@/constants";
import { registerSchema } from "@/schema/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { getCookie } from "cookies-next/server";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const { cpassword, ...rest } = data;
    const body = JSON.stringify(rest);

    try {
      const res = await axios.post(constants.apiURL + "/user/register", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        reset();
        toast.success("Registered successfully, Please sign in.");
        router.push("/sign-in");
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong!";
      toast.error(message);
    }
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

export async function getServerSideProps({ req, res }) {
  try {
    const token = await getCookie("token", { req, res });

    if (token) {
      return {
        redirect: {
          destination: "/account",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: { error: messages.error },
    };
  }
}
