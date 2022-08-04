import { useDispatch } from 'react-redux';
import { breadcrumbRoute } from '../../data/constants/BreadcrumbRoute';

export type AppState = {
  breadcrumb: string;
};

export const enum AppActionType {
  updateBreadcrumb = '[App] Update Breadcrumb',
}

export const appInitialState: AppState = {
  breadcrumb: 'Tableau de bord',
};

export const appReducer = (state = appInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AppActionType.updateBreadcrumb:
      return {
        ...state,
        breadcrumb: breadcrumbRoute[payload],
      };
    default:
      return state;
  }
};

export const useApp = () => {
  const dispatch = useDispatch();
  return {
    updateBreadcrumb: (breadcrumb) =>
      dispatch({ type: AppActionType.updateBreadcrumb, payload: breadcrumb }),
  };
};
