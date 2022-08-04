import constantsAll from '../../data/constants';
import bdl from '../bdl';
import callback from '../metier';

export const generateSA = (constants: any[]) => {
  return constants.reduce((acc: any, curr: any) => {
    const value: any = Object.values(curr)[0];
    const {name, url, method} = value;
    if (!method || !url) {
      return {
        ...acc,
        [name]: (data = {}, getState: any) =>
          callback && callback[name]
            ? callback[name](data, data, getState)
            : data,
      };
    }
    return {
      ...acc,
      [name]: async (data = {}, getState: any, urlPath: any) => {
        const res =
          bdl && typeof bdl[name] === 'function'
            ? await bdl[name](data, urlPath)
            : false;
        return callback && callback[name]
          ? callback[name](res, data, getState)
          : res;
      },
    };
  }, {});
};

const applicatifs = () => {
  return constantsAll.reduce((acc, curr) => {
    const {constants} = curr;
    return {
      ...acc,
      ...generateSA(constants),
    };
  }, {});
};

export default applicatifs();
