import { useCallback } from "react";
import axios, { AxiosResponse, type AxiosRequestConfig } from "axios";
import { useErrorStore, useGlobalErrorStore, useLoadingStore} from "../Stores";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type ErrorBody = {
  title: string;
  message?: string;
  type?: string;
};

export type SendRequest = <R = any>(
  method: HttpMethod,
  url: string,
  config?: AxiosRequestConfig,
  body?: any,
  reqId?:string,
  onResponse?:(response : AxiosResponse) => void
) => Promise<R | null>;

export function useRequest() {

  const setGlobalError = useGlobalErrorStore((state) => state.setError);

  const addLoader = useLoadingStore((state) => state.addLoader);
  const deleteLoader = useLoadingStore((state) => state.deleteLoader);

  const addError = useErrorStore((state) => state.addError);
  const deleteError = useErrorStore((state) => state.deleteError);

  const send: SendRequest = useCallback(
    async (method, url, config, body, reqId, onResponse) => {
      if(reqId) {
        addLoader(reqId);
      }

      try {
        const methods = {
          GET: () => axios.get(url, config),
          POST: () => axios.post(url, body, config),
          PUT: () => axios.put(url, body, config),
          DELETE: () => axios.delete(url, config),
          PATCH:() => axios.patch(url, body, config)
        };

        const res = await methods[method]();
        if(reqId) {
          deleteError(reqId);
        }
        onResponse && onResponse(res);
        return res.data as any;

      } catch (err: any) {
        const errorBody: ErrorBody = err.response?.data;

        const message =
          err.code === "ECONNABORTED"
            ? "NETWORK"
            : err.response?.status >= 500
            ? "SERVER_ERROR"
            : errorBody?.type || "UNKNOWN_ERROR";

        if (message === "SERVER_ERROR" || message === "UNKNOWN_ERROR") {
          setGlobalError(errorBody?.title || "Unexpected error", errorBody?.message, errorBody?.type);
        } else if(message == "NETWORK") {
          setGlobalError(errorBody?.title || "Unexpected error", errorBody?.message, errorBody?.type, true);
        } else if(reqId) {
            addError(reqId, errorBody);
          }

        return null;

      } finally {
        deleteLoader(reqId);
      }
    },
    []
  );

  return {send };
}
