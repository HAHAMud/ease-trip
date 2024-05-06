import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

export const createService = (config: AxiosRequestConfig) => {
  const { baseURL, ...rest } = config;
  const url = `${baseURL}`;

  const service = axios.create({
    baseURL: url,
    ...rest,
  });

  service.interceptors.request.use((request) => {
    return request;
  });

  service.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!isAxiosError(error)) {
        return Promise.reject(error);
      }

      if (!error.response) {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );

  return service;
};

export const service = createService({
  baseURL: 'http://localhost:4004/api',
});
