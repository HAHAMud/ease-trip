import axios, { AxiosRequestConfig } from 'axios';
import { getStorageItem } from '@/utils';

const apiServer = process.env.NEXT_PUBLIC_SERVER_API ?? '';

/**
 * Create AxiosInstance with response interceptor that creates instances of ApiError.
 */
export const createClient = (config: AxiosRequestConfig) => {
  const { baseURL, ...rest } = config;
  const url = `${apiServer}${baseURL}`;

  const client = axios.create({
    baseURL: url,
    ...rest,
  });

  client.interceptors.request.use((request) => {
    const token = getStorageItem('ez-token');

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  }
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }

      if (!error.response) {
        return Promise.reject(error);
      }

      try {
        return Promise.reject(error);
      } catch (err) { }

      return Promise.reject(error);
    },
  );

  return client;
};

export const createQueryKey = <T extends { [K in keyof T]: K }>(obj: T) => obj;
