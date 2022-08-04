import {combineReducers} from 'redux';
import constantsAll from '../../../data/constants';
import {checkTypes} from '../../technique/utils';

export const initialState = {
  isAuth: null,
  token: null,
};

const nextState = (oldState: any, payload: any) => ({
  ...oldState,
  ...payload,
});

const generateReducer =
  (constants: any, initialState: any) =>
  (state = initialState, action: any) => {
    if (action.type === 'users_logout') {
      // for all keys defined in your persistConfig(s)
      return initialState;
    }
    const check = checkTypes(action.type, constants);

    if (check) {
      if (check.reducers) {
        const newEntity = {
          ...state,
          [check.reducers]: action.payload,
          // [entity]: {...state[entity], [check.reducers]: action.payload},
        };
        return newEntity;
      } else {
        return nextState(state, action.payload);
      }
    }
    return state;
  };

export const reducersAll = () => {
  if (!constantsAll) {
    return {};
  }

  return constantsAll.reduce(
    (acc: any, curr) => {
      const {constants, entity, initialState} = curr;
      return {
        ...acc,
        [entity]: generateReducer(constants, initialState),
      };
    },
    {
      location: (state = {current: {}, input: {}}, action: any) => {
        switch (action.type) {
          case 'SET_LOCATION_INPUT':
            return {
              ...state,
              input: action.payload,
            };
          case 'SET_LOCATION_CURRENT':
            return {
              ...state,
              current: action.payload,
            };
          default:
            return state;
        }
      },
      auth: (state = initialState, { type, payload }: any) => {
        switch (type) {
          case 'CONSTANTS.UPDATE_USER':
            return { ...state, ...payload };
          default:
            return state;
        }
      },
      initial: (state = {screen: true}, action: any) => {
        switch (action.type) {
          case 'SET_INITIAL_SCREEN':
            return {
              ...state,
              screen: action.payload,
            };
          default:
            return state;
        }
      },
    },
  );
};

export default combineReducers(reducersAll());
