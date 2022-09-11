import axios, { AxiosRequestHeaders } from 'axios';
import { AuthResponse } from '../../models/redux';
import { BASE_URL } from '../config/endpoints';

import { GET_STORAGE_ITEM } from './storage';

const item = GET_STORAGE_ITEM('user') as AuthResponse;

const headers: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
  Authorization: item ? `Bearer ${item?.token}` : '',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
};

const errorr = {
  code: 'INTERNAL_ERROR',
  message: 'Something went wrong. Please check your internet connection or contact our support.',
  status: 503,
  data: {},
};

interface apiParams extends apiVariables {
  method: string;
}
interface apiVariables {
  url: string;
  variables?: any;
}
const api = (api: apiParams) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASE_URL}${api.url}`,
      method: api.method,
      headers: headers,
      params: api.method === 'get' ? api.variables : undefined,
      data: api.method !== 'get' ? api.variables : undefined,
      withCredentials: true,
    }).then(
      (response) => {
        resolve(response?.data);
      },
      (error) => {
        if (error.message) {
          reject(error?.response?.data);
        } else {
          reject(errorr);
        }
      },
    );
  });
};

export default {
  get: (args: apiVariables) => api({ method: 'get', url: args.url, variables: args.variables }),
  post: (args: apiVariables) => api({ method: 'post', url: args.url, variables: args.variables }),
  put: (args: apiVariables) => api({ method: 'put', url: args.url, variables: args.variables }),
  patch: (args: apiVariables) => api({ method: 'patch', url: args.url, variables: args.variables }),
  delete: (args: apiVariables) =>
    api({ method: 'delete', url: args.url, variables: args.variables }),
};
