import {capitalizeFirstLetter} from './utils';

export const toGenerateConstantsArray = (model: any[], entity: string) => {
  return model.map(curr => {
    const {name, method, route, reducers} = curr;
    return {
      [name]: {
        type: `${entity}_${name}`,
        name: `${name}${capitalizeFirstLetter(entity)}`,
        url: route,
        method,
        reducers,
      },
    };
  });
};

export const toGenerateInitialSate = (attributs: { [x: string]: { default: any; }; }) => {
  return Object.keys(attributs).reduce(
    (acc, curr) => ({...acc, [curr]: attributs[curr].default}),
    {},
  );
};

export default toGenerateConstantsArray;
