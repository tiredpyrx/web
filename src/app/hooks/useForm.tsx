"use client";

import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useState } from "react";

interface UseFormUtilites {
  data: UseFormData;
  setData: UseFormSetDataByKey;
  post: UseFormPost;
  put: UseFormPut;
  get: UseFormGet;
}

type UseFormData = { [key: string]: any };

type UseFormSetDataByKey = (
  key: keyof UseFormData,
  value: UseFormData[typeof key]
) => void;

type UseFormPost = (
  url: string,
  data?: {} | undefined,
  config?: AxiosRequestConfig<{}> | undefined
) => Promise<AxiosResponse<any, any>>;

type UseFormPut = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any> | undefined
) => Promise<AxiosResponse<any, any>>;

type UseFormGet = (
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => Promise<AxiosResponse<any, any>>;

/**
 * Use dynamic form data with additional utilites
 * @param {UseFormInitialData} initialData Object that represents the data's inital value
 */
function useForm(initialData: UseFormData): UseFormUtilites {
  const [internalData, setInternalData] = useState(initialData);

  const setDataByKey: UseFormSetDataByKey = (key, value) => {
    return setInternalData({ ...internalData, [key]: value });
  };

  const post: UseFormPost = async (url, data?, config?) =>
    await axios.post(url, data, config);

  const put: UseFormPut = async (url, data, config) =>
    await axios.put(url, data, config);

  const get: UseFormGet = async (url, config) => await axios.get(url, config);

  return {
    data: internalData,
    setData: setDataByKey,
    post,
    put,
    get,
  };
}

export {
  useForm,
  type UseFormUtilites,
  type UseFormData,
  type UseFormSetDataByKey,
  type UseFormPost,
  type UseFormPut,
  type UseFormGet,
};
