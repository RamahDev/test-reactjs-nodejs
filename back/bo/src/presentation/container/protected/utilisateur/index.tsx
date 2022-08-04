/* eslint-disable no-unreachable */
import * as React from 'react';

import { useUtilisateurSA } from '../../../../service/applicatif';
import { dataTDO } from '../../../../data';
import { utilisateur as entityUrl } from '../../../../data/constants/Urls';
import { EntityContainer } from '../../../../common/protected';

export const Utilisateur = () => {
  const getInitialValue = async () => {
    try {
      return { role: [
        { id: 'admin', name: 'Admin' },
        { id: 'editor', name: 'Editor' },
        { id: 'user', name: 'User' },
        { id: 'rider', name: 'Rider' },
      ] };
    } catch (error) {
      return {};
    }
  };

  return (
    <EntityContainer
      properties={dataTDO.Utilisateur.attributes}
      useEntitySA={useUtilisateurSA}
      entityUrl={entityUrl}
      defaultSort={{ id: 'name', desc: false }}
      // customFiltre={{ sortField: 'name' }}
      getInitialValue={getInitialValue}
      relation={false}
      currententity="Utilisateur"
    />
  );
};
