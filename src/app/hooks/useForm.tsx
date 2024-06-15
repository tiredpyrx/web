"use client";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

function useForm<T>(initialData: T) {
  const [internalData, setInternalData] = useState(initialData);

  const setDataWithKey = (
    key: keyof typeof initialData,
    value: (typeof initialData)[typeof key]
  ) => {
    return setInternalData({ ...internalData, [key]: value });
  };

  const post = async (
    url: string,
    data?: {} | undefined,
    config?: AxiosRequestConfig<{}> | undefined
  ): Promise<AxiosResponse<any, any>> => await axios.post(url, data, config);

  const put = async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> => await axios.put(url, data, config);

  const get = async (
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> => await axios.get(url, config);

  return {
    data: internalData,
    setData: setDataWithKey,
    post,
    put,
    get,
  };
}

export { useForm };
