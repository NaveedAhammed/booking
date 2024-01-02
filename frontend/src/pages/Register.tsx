import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({
        message: "Registration Success",
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
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-norma flex-1">
          First Name
          <input
            className="border rounded w-full py-2 px-3 font-normal mt-2"
            {...register("firstName", {
              required: "This field is required",
            })}
          />
          {errors?.firstName && (
            <span className="text-red-500 mt-1 inline-block font-medium">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-normal flex-1">
          Last Name
          <input
            className="border rounded w-full py-2 px-3 font-normal mt-2"
            {...register("lastName", {
              required: "This field is required",
            })}
          />
          {errors?.lastName && (
            <span className="text-red-500 mt-1 inline-block font-medium">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-normal flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-2 px-3 font-normal mt-2"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is required";
              } else if (watch("password") !== value) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors?.confirmPassword && (
          <span className="text-red-500 mt-1 inline-block font-medium">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-500 py-2 px-3 rounded-md font-normal text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
