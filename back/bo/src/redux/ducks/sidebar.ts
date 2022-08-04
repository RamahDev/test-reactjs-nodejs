import { useDispatch } from 'react-redux';
// import { useDemandeAvenantSA } from '../../service/applicatif/DemandeAvenant.sa';
// import { useRendezVousSA } from '../../service/applicatif/RendezVous.sa';

export type SidebarState = {
  notSeenRdv: number;
  notSeenAvenantContrat: number;
};

export const enum SidebarActionType {
  setNotSeenRdv = '[Sidebar] set not seen rdv count',
  setNotSeenAvenantContrat = '[Sidebar] set not seen avenant contrat',
}

export const sidebarInitialState: SidebarState = {
  notSeenRdv: 0,
  notSeenAvenantContrat: 0,
};

export const sidebarReducer = (state = sidebarInitialState, action) => {
  const { type, payload } = action;
  // switch (type) {
  //   case SidebarActionType.setNotSeenRdv:
  //     return { ...state, notSeenRdv: payload };
  //   case SidebarActionType.setNotSeenAvenantContrat:
  //     return { ...state, notSeenAvenantContrat: payload };
  //   default:
  //     return state;
  // }
  return state;
};

export const useSidebar = () => {
  const dispatch = useDispatch();
  // const { countNotSeen } = useRendezVousSA();
  // const { countNotSeen: countNotSeenAvenantContrat } = useDemandeAvenantSA();

  // return {
  //   countNotSeenRdv: async () => {
  //     let payload = 0;
  //     try {
  //       const { data } = await countNotSeen({});

  //       payload = data;
  //     } catch (error) {
  //       // No action
  //     } finally {
  //       dispatch({ payload, type: SidebarActionType.setNotSeenRdv });
  //     }
  //   },
  //   countNotSeenAvenantContrat: async () => {
  //     let payload = 0;
  //     try {
  //       const { data } = await countNotSeenAvenantContrat({});

  //       payload = data;
  //     } catch (error) {
  //       // No action
  //     } finally {
  //       dispatch({ payload, type: SidebarActionType.setNotSeenAvenantContrat });
  //     }
  //   },
  // };

};
