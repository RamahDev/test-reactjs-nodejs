import store from '../redux/store';

export default {
  initialScreenUsers: (notIntroScreen: any, _: any, getState: () => { (): any; new(): any; users: any; }) => {
    console.log({notIntroScreen});
    const users = getState && getState() ? getState().users : {};
    return {...users, notIntroScreen};
  },
  listUsers: (res: any, _: any, getState: () => { (): any; new(): any; etablishment: any; }) => {
    if (res) {
      const etablishment =
        getState && getState() ? getState().etablishment : {};
      return {...etablishment, allUsers: res, ...res};
    }
    return {error: true};
  },
  renvoyerCodeUsers: (res: { active: any; message: any; }) => {
    if (res && res.active) {
      return {users: null, signup: null, validation: true};
    }
    return {error: true, users: null, signup: null, message: res?.message};
  },
  validateUsers: (res: { active: any; message: any; }) => {
    if (res && res.active) {
      return {users: null, signup: null, validation: true};
    }
    return {error: true, users: null, signup: null, message: res?.message};
  },
  addAddress: (addressId: { hasOwnProperty: (arg0: string) => any; }, _data: any, getState: () => { (): any; new(): any; users: any; }) => {
    if (addressId && addressId.hasOwnProperty('full')) {
      const users = getState && getState() ? getState().users : {};
      store.dispatch({
        type: 'users_update',
        payload: {
          ...users,
          user: {...users.user, addressId},
          signup: null,
          validation: null,
        },
      });
      return addressId;
    }
    return {error: true};
  },
  loginFbUsers: (res: any) => {
    if (res && res.data && !res.data.token) {
      return {
        ...res.data,
        user: res.data,
        token: null,
        signup: null,
        validation: null,
      };
    } else if (res && res.data && res.data.token) {
      return {
        ...res.data,
        user: res.data,
        token: res.data.token,
        signup: null,
        validation: null,
      };
    } else if (res && res.error && typeof res.error === 'string') {
      return {validation: res.error};
    }
    return {user: null, signup: null, validation: null};
  },
  logoutUsers: () => {
    return {user: null, signup: null, validation: null, token: null};
  },
  signinUsers: (res: { data: { token: any; }; error: any; }, _data: any, getState: () => { (): any; new(): any; users: any; }) => {
    if (res && res.data && res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: res.data.token,
        signup: null,
        validation: null,
      };
    } else if (res && res.error && typeof res.error === 'string') {
      return {validation: res.error, ...res};
    }
    return {user: null, signup: null, validation: null, token: null};
  },
  signupUsers: (res: { _id: any; }, _data: any, _getState: any) => {
    if (res && res._id) {
      return {user: null, validation: null, signup: res};
    }
    return {user: null, signup: null, validation: null, token: null};
  },
  updateUsers: (user: { email: any; }, _data: any, getState: () => { (): any; new(): any; users: any; }) => {
    if (user && user.email) {
      const users = getState && getState() ? getState().users : {};
      return {...users, user, signup: null, validation: null};
    }
    return {error: true};
  },
  getUsers: (res: any, _data: any, getState: () => { (): any; new(): any; users: any; }) => {
    if (res && Array.isArray(res)) {
      const users = getState && getState() ? getState().users : {};
      return {...users, list: res, signup: null, validation: null};
    }
    return {error: true};
  },
  authAppleUsers: (res: { data: { token: any; }; error: any; email: any; }, data: any, getState: () => { (): any; new(): any; users: any; }) => {
    if (res && res.data && !res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: null,
        signup: null,
        validation: null,
      };
    } else if (res && res.data && res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: res.data.token,
        signup: null,
        validation: null,
      };
    } else if (res && res.error && typeof res.error === 'string') {
      return {
        validation: res.error,
        user: {active: false},
        signup: null,
        email: res.email,
      };
    }
    return {
      user: {active: false},
      signup: null,
      validation: null,
      email: res.email,
    };
  },
  loginGmailUsers: (res: { data: { token: any; }; error: any; email: any; }, _data: any, getState: () => { (): any; new(): any; users: any; }) => {
    if (res && res.data && !res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: null,
        signup: null,
        validation: null,
      };
    } else if (res && res.data && res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: res.data.token,
        signup: null,
        validation: null,
      };
    } else if (res && res.error && typeof res.error === 'string') {
      return {validation: res.error};
    }
    return {
      user: {active: false},
      signup: null,
      validation: null,
      email: res.email,
    };
  },
  addFavorites: (favorites: { establishment: any; }) => {
    if (favorites && favorites.establishment) {
      return {listFavorites: favorites.establishment, signup: null};
    }
    return {error: true};
  },
  getAllFavorites: (favorites: { establishment: any; }) => {
    if (favorites && favorites.establishment) {
      return {listFavorites: favorites.establishment, signup: null};
    }
    return {error: true};
  },
  mdpOublierUsers: (mdp: boolean, _data: any, getState: () => { (): any; new(): any; users: any; }) => {
    if (mdp === true) {
      const users = getState && getState() ? getState().users : {};
      return {...users, mdp: true};
    }
    return {error: true};
  },
};
