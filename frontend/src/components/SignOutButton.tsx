import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Signed Out!",
        type: "SUCCESS",
      });
    },
    onError: (err: Error) => {
      showToast({
        message: err.message,
        type: "ERROR",
      });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center text-blue-500 bg-white px-3 py-2 font-medium rounded-sm border border-blue-500 hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
