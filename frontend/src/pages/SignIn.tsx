import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({
        message: "Sign in Successful!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({
        message: err.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-normal flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-2 px-3 font-normal mt-2"
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors?.email && (
          <span className="text-red-500 mt-1 inline-block font-medium">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-normal flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-2 px-3 font-normal mt-2"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters",
            },
          })}
        />
        {errors?.password && (
          <span className="text-red-500 mt-1 inline-block font-medium">
            {errors.password.message}
          </span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-500 py-2 px-3 rounded-md font-normal text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
