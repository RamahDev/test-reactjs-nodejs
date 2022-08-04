import {translateResponse} from '../technique/utils';
import api from '../technique/api';
import constantsAll from '../../data/constants';

export const generateBdl = (constants: any) => {
  return constants.reduce((acc: any, curr: any) => {
    const value: any = Object.values(curr)[0];
    const {url, name, method} = value;
    if (!method || !url) {
      return acc;
    }

    return {
      ...acc,
      [name]: async (data = {}, urlID = '') => {
        const response = (await api[method])
          ? await api[method](`${url}${urlID}`, data)
          : data;
        return translateResponse(response);
      },
    };
  }, {});
};

const allBdl: any = () => {
  return constantsAll.reduce((acc, curr) => {
    const {constants} = curr;
    return {
      ...acc,
      ...generateBdl(constants),
    };
  }, {});
};

export default allBdl();
