import axios, { AxiosInstance } from 'axios';
import { commaSeparated } from '../util/paramSerializers';
import Client from './Client';

export type AxiosConfigurer = (axios: AxiosInstance) => AxiosInstance;

export const baseUrl = {
  content: process.env.CONTENT_API_BASE_URL,
  data: process.env.DATA_API_BASE_URL || '/api/data',
  function: process.env.FUNCTION_API_BASE_URL,
};

// EES-704 - revisit to find a better way to configure Clients used in the common project
const configureAxios = (axiosInstance: AxiosInstance) => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.axiosConfigurer) {
    // @ts-ignore
    return window.axiosConfigurer(axiosInstance);
  }

  return axiosInstance;
};

export const contentApi = new Client(
  configureAxios(
    axios.create({
      baseURL: `${baseUrl.content}/`,
      paramsSerializer: commaSeparated,
    }),
  ),
);

export const dataApi = new Client(
  configureAxios(
    axios.create({
      baseURL: `${baseUrl.data}/`,
      paramsSerializer: commaSeparated,
    }),
  ),
);

export const functionApi = new Client(
  configureAxios(
    axios.create({
      baseURL: `${baseUrl.function}/`,
      paramsSerializer: commaSeparated,
    }),
  ),
);
