import Layout from "@/components/layouts";
import TextField from "@/components/TextField";
import Link from "next/link";

const SignIn = () => {
  return (
    <>
      <div className="min-h-full py-12 lg:px-8 max-w-md mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={() => {}} className="space-y-4">
          <TextField
            label="Email"
            name="useremail"
            // {...register("title")}
            // error={errors.title?.message}
          />
          <TextField
            label="Password"
            name="userpassword"
            // {...register("title")}
            // error={errors.title?.message}
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
