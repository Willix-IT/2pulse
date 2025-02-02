import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationOptions, UseMutationResults } from "../types/apiTypes";

export function useMutation<Data, Body>({
  url,
  method = "POST",
  onSuccess,
  onError,
}: UseMutationOptions<Data>): UseMutationResults<Data, Body> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const controller = new AbortController();

  const mutation = useCallback(
    async (body: Body) => {
      setIsLoading(true);

      try {
        const config = {
          url,
          method,
          data: body,
          signal: controller.signal,
        };

        const response: AxiosResponse<Data> = await axios(config);

        if (onSuccess) {
          onSuccess(response.data);
        }
        return response;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request Canceled", error.message);
        } else if (onError) {
          onError(error as AxiosError);
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [url, method, onSuccess, onError]
  );

  const abort = useCallback(() => {
    controller.abort();
  }, []);

  return { mutation, isLoading, abort };
}
