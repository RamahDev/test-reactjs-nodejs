import { useDispatch, useStore } from 'react-redux';
import { LocalStorageKeys } from '../../data/constants/LocalStorageKeys';
import { useAuthentificationSA } from '../../service/applicatif';
// import { useAuthentificationSA } from '../../service/applicatif/Authentification.sa';

export type AuthState = {
  isLogin: boolean;
  credentials: {
    accessToken: string;
    refreshToken: string;
    email: string;
    nom: string;
    prenom: string;
  };
};

export const enum AuthActionType {
  setIsLogin = '[Auth] Set login status',
  updateCredentials = '[Auth] Update credentials',
}

export const initialAuthState: AuthState = {
  isLogin: true,
  credentials: {
    accessToken: '',
    email: '',
    nom: '',
    prenom: '',
    refreshToken: '',
  },
};

export const authReducer = (state = initialAuthState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.setIsLogin:
      return {
        ...state,
        isLogin: payload,
      };
    case AuthActionType.updateCredentials:
      return {
        ...state,
        credentials: payload,
      };
    default:
      return state;
  }
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const { signin } = useAuthentificationSA();

  return {
    state: useStore().getState(),
    setLoginStatus: (payload) => dispatch({ payload, type: AuthActionType.setIsLogin }),
    updateCredentials: (payload) => dispatch({ payload, type: AuthActionType.updateCredentials }),
    signin: async (body) => {
      try {
        const { data: payload } = await signin({ body });
        // const payload = {
        //   accessToken: 'token',
        //   email: 'mail',
        //   nom: 'nom',
        //   prenom: 'prenom',
        //   refreshToken: '',
        //   ...body,
        // };

        localStorage.setItem(LocalStorageKeys.credentials, JSON.stringify(payload));

        dispatch({
          payload,
          type: AuthActionType.updateCredentials,
        });

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    signout: () => {
      localStorage.removeItem(LocalStorageKeys.credentials);

      dispatch({
        type: AuthActionType.updateCredentials,
        payload: initialAuthState.credentials,
      });
    },
  };
};
