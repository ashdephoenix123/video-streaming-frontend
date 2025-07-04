import Layout from "@/components/layouts";
import TextField from "@/components/TextField";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <div className="min-h-full lg:px-8 max-w-md mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
            Register your account
          </h2>
        </div>

        <form onSubmit={() => {}} className="space-y-4">
          <TextField
            label="Username"
            name="username"
            // {...register("title")}
            // error={errors.title?.message}
          />
          <TextField
            label="Email"
            name="useremail"
            // {...register("title")}
            // error={errors.title?.message}
          />
          <TextField
            label="Password"
            name="password"
            // {...register("title")}
            // error={errors.title?.message}
          />

          <TextField
            label="Confirm Password"
            name="cpassword"
            // {...register("title")}
            // error={errors.title?.message}
          />

          <button
            type="submit"
            className="px-4 py-2 rounded bg-red-600 block  w-full"
          >
            Sign Up
          </button>
        </form>

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
