import { useGenericBDL } from '../../common/service/Generic.bdl';
import { useGet, usePost, usePut } from '../../common/hooks/Axios';
import { authentification, utilisateur, categorie, notification } from '../../data/constants/Urls';

import { dataTDO } from "../../data";

export const useCategorieBDL = () => useGenericBDL(categorie.baseApi);
export const useNotificationBDL = () => useGenericBDL(notification.baseApi);

export const useAuthentificationBDL = () => ({
  signin: usePost(authentification.baseApi),
  verifyResetToken: useGet(''),
  resetPassword: usePut(authentification.resetPassword),
});

export const useUtilisateurBDL = () => ({
  ...useGenericBDL(utilisateur.baseApi),
  create: usePost(utilisateur.inscription),
});

export default Object.keys(dataTDO).reduce((acc, entity) => {
  const { route } = dataTDO[entity];
  return {
    ...acc,
    [entity]: () => useGenericBDL(`/api/${route}`),
  };
}, {});
