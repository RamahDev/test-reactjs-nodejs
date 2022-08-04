import { useDelete, useGet, usePost, usePut } from '../hooks/Axios';

export const useGenericBDL = (url: string, autre = {}) => ({
  create: usePost(url),
  update: usePut(url),
  remove: useDelete(url),
  getById: useGet(url),
  getAll: useGet(url),
  getByParams: useGet(url),
  inscription: usePost('/api/inscription'),
  ...autre,
});
