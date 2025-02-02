import { AxiosError, AxiosResponse } from "axios";


export type HttpMethod = 'POST' | 'PUT' | 'PATCH'

export interface UseMutationOptions<Data> {
    url: string;
    method: HttpMethod;
    onSuccess?: (data: Data) => void;
    onError?: (error: AxiosError) => void
}

export interface UseMutationResults<Data, Body> {
    mutation: (body: Body) => Promise<AxiosResponse<Data>>;
    isLoading: boolean;
    abort: () => void;
}