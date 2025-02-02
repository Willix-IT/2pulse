import { useState, useCallback, useRef } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationOptions, UseMutationResults } from "../types/apiTypes";

export function useMutation<ResponseType, RequestType>({
  url,
  method = "POST",
  onSuccess,
  onError,
}: UseMutationOptions<ResponseType>): UseMutationResults<
  ResponseType,
  RequestType
> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const controllerRef = useRef(new AbortController());

  const mutation = useCallback(
    async (body: RequestType) => {
      setIsLoading(true);

      try {
        const config = {
          url,
          method,
          data: body,
          signal: controllerRef.current.signal,
        };

        const response: AxiosResponse<ResponseType> = await axios(config);

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
        controllerRef.current = new AbortController();
      }
    },
    [url, method, onSuccess, onError]
  );

  const abort = useCallback(() => {
    controllerRef.current.abort();
    console.log("Request Aborted")
  }, []);

  return { mutation, isLoading, abort };
}
