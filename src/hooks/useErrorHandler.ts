import { useNavigate } from "@/router";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ApiErrorResponse {
  status: string;
  message: string;
  errorDetails?: string[];
}

const useErrorHandler = (queryKey?: string[]) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const handleError = (
    error: unknown,
    suppressRepeat = false,
    hasShownErrorRef?: React.RefObject<boolean>
  ) => {
    if (suppressRepeat && hasShownErrorRef?.current) return;
    if (suppressRepeat && hasShownErrorRef) hasShownErrorRef.current = true;

    let errorMessage = "Unexpected error di errorHandler";
    let statusCode: number | undefined;

    if (error instanceof AxiosError) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      errorMessage =
        apiError.response?.data.message || apiError.message || errorMessage;
      statusCode = apiError.response?.status;

      switch (statusCode) {
        case 401:
          queryClient.removeQueries({ queryKey: queryKey || ["authUser"] });
          nav("/login");
          toast.error("Sesi habis. Silakan login ulang.", {
            description: "unauthorized",
          });
          resetErrorToast(hasShownErrorRef);
          return;

        case 403:
          nav("/login");
          toast.error(errorMessage, { description: "forbidden" });
          resetErrorToast(hasShownErrorRef);
          return;

        case 422:
          errorMessage =
            apiError.response?.data.errorDetails?.[0] || errorMessage;
          toast.error(errorMessage, { description: "validationError" });
          resetErrorToast(hasShownErrorRef);
          return;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage, { description: "internalServerError" });
    console.error("ErrorHandler Log: ", error);
    resetErrorToast(hasShownErrorRef);
  };

  // Reset agar toast bisa muncul lagi setelah X ms
  const resetErrorToast = (ref?: React.RefObject<boolean>) => {
    if (!ref) return;
    setTimeout(() => {
      ref.current = false;
    }, 1000);
  };

  // 👇 Untuk useQuery
  const useHandleQueryError = (queryResult: {
    error?: unknown;
    status: string;
  }) => {
    const hasShownErrorRef = useRef(false);

    useEffect(() => {
      if (queryResult.status === "error" && queryResult.error) {
        handleError(queryResult.error, true, hasShownErrorRef);
      }
    }, [queryResult.status, queryResult.error]);
  };

  // 👇 Untuk useMutation
  const useHandleMutationError = (mutationResult: {
    error?: unknown;
    status: string;
  }) => {
    const hasShownErrorRef = useRef(false);

    useEffect(() => {
      if (mutationResult.status === "error" && mutationResult.error) {
        handleError(mutationResult.error, true, hasShownErrorRef);
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
