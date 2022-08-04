import { RequestOptions } from '../hooks/Axios';

export const useGenericSA = (useGenericBDL) => {
  const { create, update, remove, getById, getAll } = useGenericBDL();

  return {
    create: (options: RequestOptions) => create(options),
    update: (options: RequestOptions) => update(options),
    remove: (options: RequestOptions) => remove(options),
    getById: (options: RequestOptions) => getById(options),
    getAll: (options: RequestOptions) => getAll(options),
  };
};
