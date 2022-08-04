/* eslint-disable no-unreachable */
import * as React from 'react';

import applicatif from "../../../service/applicatif";
import { dataTDO } from "../../../data";
import { EntityContainer } from "../../../common/protected";

export default Object.keys(dataTDO).reduce((acc, entity) => {
  const { route, attributes } = dataTDO[entity];
  return {
    ...acc,
    [entity]: () => {
      const getInitialValue = async () => {
        let res = {};
        try {
          if (Array.isArray(attributes)) {
            const selects = attributes.filter((attribute) => attribute?.entity?.method);
            if (selects.length > 0) {
              const pResect = await Promise.all(
                // eslint-disable-next-line @typescript-eslint/no-shadow
                selects.map(async ({ entity, name }) => {
                  const { data } = await applicatif[entity.name]().getAll({});
                  if (data?.items) {
                    return { value: data?.items, key: name };
                  }
                  return { key: name, value: [] };
                }),
              );
              // eslint-disable-next-line @typescript-eslint/no-shadow
              res = pResect.reduce((acc, curr) => ({ ...acc, [curr?.key]: curr?.value }), res);
            }
          }
          return res;
        } catch (error) {
          console.log({ error });
          return {};
        }
      };
      return (
        <EntityContainer
          properties={attributes}
          useEntitySA={applicatif[entity]}
          entityUrl={`/api/${route}`}
          defaultSort={{ id: 'name', desc: false }}
          // customFiltre={{ sortField: 'name' }}
          getInitialValue={getInitialValue}
          relation={false}
          currententity={entity}
        />
      );
    },
  };
}, {});
