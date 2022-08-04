/* eslint-disable no-unused-expressions */
// import useState hook to create menu collapse state
import * as React from 'react';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
// import react pro sidebar components
import {
  Menu,
  MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader,
} from 'react-pro-sidebar';
// import sidebar css from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css';
import achat from '../../../assets/img/icon_BO/achat.svg';
import controle from '../../../assets/img/icon_BO/controle.svg';
import distribution from '../../../assets/img/icon_BO/distribution.svg';
import calendar from '../../../assets/img/icon_BO/ic_calendar.png';
import inscription from '../../../assets/img/icon_BO/inscription.svg';
import lot from '../../../assets/img/icon_BO/lot.svg';
import parametre from '../../../assets/img/icon_BO/parametre.svg';
import profil from '../../../assets/img/icon_BO/profil.svg';
import { Sidebar } from '../Sidebar';
import './Header.css';

import { dataTDO } from "../../../data";

const icons = {
  parametre,
  calendar,
  achat,
  controle,
  distribution,
  lot,
  profil,
  inscription,
};

// eslint-disable-next-line react/prop-types
export const SideMenu = ({ role }) => {
  // create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);

  const menuIconClick = () => {
    // condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div
        id="header"
        onMouseEnter={() => setMenuCollapse(false)}
        onMouseLeave={() => setMenuCollapse(true)}
      >
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? 'Logo' : 'Big Logo'}</p> */}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {/* {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />} */}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <Sidebar
                collapse={menuCollapse}
                items={[
                  // {
                  //   id: 'Tableau-de-bord',
                  //   title: 'Tableau de bord',
                  //   icon: calendar,
                  //   children: [
                  //     {
                  //       id: 'tableau-bord',
                  //       title: 'Tableau de bord',
                  //       url: '/app',
                  //       icon: '',
                  //     },
                  //   ],
                  // },
                  // eslint-disable-next-line max-len
                  ...Object.keys(dataTDO).filter((entity) => entity && dataTDO[entity]?.role <= role && dataTDO[entity]?.operations?.find(({ method, route }) => method && route)).map((entity) => {
                    const {
                      route, iconBo,
                    } = dataTDO[entity];
                    return (
                      {
                        id: `gestion-${entity}`,
                        title: `Gestion ${entity}`,
                        icon: icons[iconBo] || calendar,
                        children: [
                          {
                            id: `gestion-${entity}`,
                            title: `${entity}`,
                            url: `/app/${route}`,
                            icon: '',
                          },
                        ],
                      });
                  }),
                ]}
              />
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};
