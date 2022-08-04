import axios from 'axios';
import { configs } from '../../data/constants/Configs';

import { LocalStorageKeys } from '../../data/constants/LocalStorageKeys';

export type RequestOptions = {
  body?: any;
  params?: object;
  customUrl?: string;
  customHeader?: object;
  id?: string;
};

const { baseApiUrl } = configs;

export const useRequest = (url, method) => {
  const credentials = JSON.parse(localStorage.getItem(LocalStorageKeys.credentials) || 'null');
  return async (options: RequestOptions) => {
    const { body, params, customUrl, customHeader = {} } = options;
    let newBody = body; let
      idUrl = '';
    if (method === 'PUT' && body?.id && !body?.password) {
      const { id, ...all } = body;
      newBody = all;
      idUrl = `/partialUpdate/${id}`;
    }
    console.log({ newBody });
    try {
      const result = await axios({
        params,
        method,
        headers: {
          'content-type': 'application/json',
          ...customHeader,
        },
        url: `${baseApiUrl}${customUrl || url}${idUrl}`,
        data: newBody,
        timeout: 30000,
        ...(credentials ? { headers: { Authorization: `Bearer ${credentials.accessToken}` } } : {}),
      });
      const { data } = result;

      return data;
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  };
};

export const usePost = (url) => useRequest(url, 'POST');

export const usePut = (url) => useRequest(url, 'PUT');

export const useGet = (url) => useRequest(url, 'GET');

export const useDelete = (url) => useRequest(url, 'DELETE');

export const useUpload = async (file, upload_preset = 'profil') => {
  const credentials = JSON.parse(localStorage.getItem(LocalStorageKeys.credentials) || 'null');
  try {
    const formData = new FormData();
    formData.append("upload_preset", upload_preset);
    formData.append("file", file);
    const { data } = await axios.post(`${baseApiUrl}/api/upload`, formData, { ...(credentials ? { headers: { Authorization: `Bearer ${credentials.accessToken}` } } : {}) });
    return data?.url || '';
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
};
