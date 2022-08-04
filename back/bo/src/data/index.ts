/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
const { ownedElements } = require('./Fragment.json');

// @ts-ignore
export const todataTDO = (ownedElements: any[]) => ownedElements.filter((i) => i._type === 'UMLClass')
  .reduce((acc: any, { name, route, attributes, operations, iconBo, role }) => ({
    ...acc,
    [name]: {
      role,
      route,
      attributes: Array.isArray(attributes)
        ? attributes.map(({ name, bo, ...all }) => {
          let entity = {};
          if (all?.type?.$ref) {
            let getAll;
            const {
              name,
              operations,
            } = ownedElements.find(({ _id }) => _id === all?.type?.$ref) || {};
            if (Array.isArray(operations)) {
              getAll = operations.find(({ name }) => name === 'getAll');
            }
            if (getAll) {
              entity = {
                ...getAll,
                name,
              };
            }
          }
          return ({
            ...all,
            entity,
            name,
            key: name,
            columns: bo ? { Header: all.form, defaultCanSort: true } : false,
          });
        })
        : [],
      operations,
      iconBo,
    },
  }), {});

export const dataTDO = todataTDO(ownedElements);
