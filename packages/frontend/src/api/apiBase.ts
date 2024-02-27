import axios, { AxiosRequestConfig } from 'axios';
const apiServer = process.env.NEXT_PUBLIC_SERVER_API ?? '';

/**
 * Create AxiosInstance with response interceptor that creates instances of ApiError.
 */
export const createApiClient = (config: AxiosRequestConfig) => {
  const { baseURL, ...rest } = config;
  const url = `${apiServer}${baseURL}`;

  const apiClient = axios.create({
    baseURL: url,
    ...rest,
  });

  apiClient.interceptors.response.use(
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
      } catch (err) {}

      return Promise.reject(error);
    },
  );

  return apiClient;
};

export const createQueryKey = <T extends { [K in keyof T]: K }>(obj: T) => obj;
