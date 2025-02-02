import { AxiosError, AxiosResponse } from "axios";

export type HttpMethod = "POST" | "PUT" | "PATCH";

export interface UseMutationOptions<ResponseType> {
  url: string;
  method: HttpMethod;
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: AxiosError) => void;
}

export interface UseMutationResults<ResponseType, RequestType> {
  mutation: (body: RequestType) => Promise<AxiosResponse<ResponseType>>;
  isLoading: boolean;
  abort: () => void;
}
