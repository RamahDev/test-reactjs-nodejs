import * as React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { dataTDO } from '../../../data';
import { LocalStorageKeys } from '../../../data/constants/LocalStorageKeys';
import { useApp } from '../../../redux/ducks/app';
import { initialAuthState, useAuth } from '../../../redux/ducks/auth';
import { Button } from '../../component/Button';
import { UserCircle } from '../../component/icons/UserCircle';
import { SideMenu } from '../../component/SideMenu/SideMenu';
import { TableauBord } from './tableau-bord/TableauBord';
import { Utilisateur } from './utilisateur';

import Screen from ".";

export const Home = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const { updateBreadcrumb } = useApp();
  // const { breadcrumb } = useSelector((state) => state.app);
  const getFullPath = (url) => `${path}${url}`;
  const history = useHistory();
  const { updateCredentials, state } = useAuth();
  const connectedUser = JSON.parse(localStorage.getItem(LocalStorageKeys.credentials));
  // const _campagne:any = JSON.parse(localStorage.getItem('currentCampagne'));
  // const [currentCampagne, setCurrentCampagne] =
  // React.useState((_campagne && _campagne.label) ? _campagne.label : 'Aucune');
  const handleDisconnect = () => {
    localStorage.removeItem(LocalStorageKeys.credentials);
    updateCredentials(initialAuthState.credentials);
    history.replace('/auth');
  };

  React.useEffect(() => {
    updateBreadcrumb(pathname);
  }, [pathname]);

  const role = state?.auth?.credentials?.utilisateur?.role;

  return (
    <div className="h-full flex">
      <SideMenu role={role} />
      <div className="flex flex-col flex-1 bg-gray-50 header-container">
        <div className="flex items-center justify-between px-8 top-header">
          <div className="flex flex-col px-2 py-1">
            <p className="uppercase font-medium text-xl">BACK OFFICE</p>
            <div className="h-1 w-10 bg-green-900 rounded-lg" />
          </div>
          <div className="flex flex-col px-2 py-1">
            {/* <p className="uppercase font-medium text-s">
              campagne en cours:
              {' '}
              {currentCampagne}
            </p> */}
            <div className="h-1 w-10 bg-green-900 rounded-lg" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <p className="text-sm">{connectedUser?.utilisateur?.nom}</p>
              <p className="text-xs text-gray-600">{connectedUser?.utilisateur?.prenom}</p>
            </div>
            <Button
              variant="icon"
              className="my-0"
              menu={[{ label: 'Se déconnecter', onClick: handleDisconnect }]}
            // onClick={handleDisconnect}
            >
              <UserCircle className="w-12 text-gray-400" />
            </Button>
          </div>
        </div>
        <div
          className="overflow-y-auto p-8 rounded-lg bg-white int-page"
          style={{ paddingLeft: 100 }}
        >
          <Switch>
            <Route path={getFullPath('/tableau-bord')}>
              <TableauBord />
            </Route>
            <Route path={getFullPath('/utilisateur')}>
              <Utilisateur />
            </Route>
            {
              // eslint-disable-next-line max-len
              ...Object.keys(dataTDO).filter((entity) => entity && dataTDO[entity]?.role <= role && dataTDO[entity]?.operations?.find(({ method, route }) => method && route)).map((entity) => {
                const { route } = dataTDO[entity];

                return (
                  <Route path={getFullPath(`/${route}`)} key={entity}>
                    { Screen[entity]() }
                    {/* <Categorie /> */}
                  </Route>
                );
              })
            }
            <Route path={getFullPath('')}>
              <Redirect to={getFullPath('/app')} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};
