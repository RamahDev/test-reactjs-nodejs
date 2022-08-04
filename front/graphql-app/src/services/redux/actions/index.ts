import constantsAll from '../../../data/constants';
import applicatif from '../../applicatif';

const action =
  (data = {}, callBack, type, name, url) =>
  async (dispatch, getState) => {
    const payload =
      applicatif && typeof applicatif[name] === 'function'
        ? await applicatif[name](data, getState, url)
        : null;
    callBack && typeof callBack === 'function' && (await callBack(payload));
    return payload && !payload.error ? dispatch({type, payload}) : null;
  };

export const generateActions = constants =>
  constants.reduce((acc, curr) => {
    const {type, name}: any = Object.values(curr)[0];
    return {
      ...acc,
      [name]: (data = {}, callBack, url) =>
        action(data, callBack, type, name, url),
    };
  }, {});

export const constatnsToActions = (constantsToAction = []) =>
  constantsToAction.reduce((acc, curr) => {
    const {constants} = curr;
    return {
      ...acc,
      ...generateActions(constants),
    };
  }, {});

export const mapDispatchToProps = constantsToAction => dispatch => {
  return Object.keys(constatnsToActions(constantsToAction)).reduce(
    (acc, curr) => {
      return {
        ...acc,
        [curr]: (payload, cb, url) =>
          dispatch(
            constatnsToActions(constantsToAction)[curr](payload, cb, url),
          ),
      };
    },
    {
      setLocationInput: (payload: any) =>
        dispatch({type: 'SET_LOCATION_INPUT', payload}),
      setLocationCurrent: (payload: any) =>
        dispatch({type: 'SET_LOCATION_CURRENT', payload}),
      initialScreenUsers: (payload: any) =>
        dispatch({type: 'SET_INITIAL_SCREEN', payload}),
    },
  );
};

export default mapDispatchToProps(constantsAll);
