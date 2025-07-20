import { useNavigate } from "@/router";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ApiErrorResponse {
  status: string;
  message: string;
  errorDetails?: string[];
}

const useErrorHandler = (queryKey?: string[]) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const handleError = (error: unknown) => {
    let errorMessage = "Unexpected error di errorHandler";
    let statusCode: number | undefined;

    if (error instanceof AxiosError) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      errorMessage =
        apiError.response?.data.message || apiError.message || errorMessage;
      statusCode = apiError.response?.status;

      if (statusCode === 401) {
        queryClient.removeQueries({ queryKey: queryKey || ["authUser"] });
        nav("/onboarding");
        toast.error("Session expired. Please login again");
        return;
      }

      if (statusCode === 422) {
        errorMessage = apiError.response?.data.errorDetails![0] as string;
        toast.error(errorMessage);
        return;
      }
    } else if (error instanceof Error) {
      // error ummum
      errorMessage = error.message;
      return;
    }

    toast.error(errorMessage);
    console.error("Error: ", error);
  };

  // keknya yg di bwh2 ini ga bakal kepake :v
  const useHandleQueryError = (queryResult: {
    error?: unknown;
    status: string;
  }) => {
    useEffect(() => {
      if (queryResult.status === "error" && queryResult.error) {
        handleError(queryResult.error);
      }
    }, [queryResult.status, queryResult.error]);
  };

  const useHandleMutationError = (mutationResult: {
    error?: unknown;
    status: string;
  }) => {
    useEffect(() => {
      if (mutationResult.status === "error" && mutationResult.error) {
        handleError(mutationResult.error);
      }
    }, [mutationResult.status, mutationResult.error]);
  };

  return {
    useHandleQueryError,
    useHandleMutationError,
    handleError,
  };
};

export default useErrorHandler;
