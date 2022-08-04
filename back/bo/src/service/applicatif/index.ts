import bdl, {
  useAuthentificationBDL,
  useCategorieBDL,
  useUtilisateurBDL,
  useNotificationBDL,
} from '../bdl';

import { dataTDO } from "../../data";

export const useUtilisateurSA = () => ({ ...useUtilisateurBDL() });
export const useCategorieSA = () => ({ ...useCategorieBDL() });
export const useAuthentificationSA = () => ({ ...useAuthentificationBDL() });
export const useNotificationSA = () => ({ ...useNotificationBDL() });

export default Object.keys(dataTDO).reduce((acc, entity) => ({
  ...acc,
  [entity]: () => ({ ...bdl[entity]() }),
}), {});
