import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { serverUrl } from '../config/config';
import store from '../services/redux/store';
import mapDispatchToProps from '../services/redux/mapDispatchToProps';
import mapStateToProps from '../services/redux/mapStateToProps';
import axios from 'axios';

export const CheckAuth = async (dispatch: Dispatch): Promise<void> => {
  // dispatch({
  //   type: 'CONSTANTS.UPDATE_USER',
  //   payload: {
  //     isAuth: true,
  //     user: 'data.user',
  //     token: 'data.token',
  //   },
  // });
  const data: any = await axios.get(`${serverUrl}api/auth`);
  console.log({data});
  if (data && typeof data === 'object') {
    dispatch({
      type: 'CONSTANTS.UPDATE_USER',
      payload: {
        isAuth: true,
        user: data.user,
        token: data.token,
      },
    });
  } else {
    dispatch({
      type: 'CONSTANTS.UPDATE_USER',
      payload: {
        isAuth: false,
      },
    });
  }
};


export const RequestAuth = () => {
  // @ts-ignore
  window.callbackOAuth = (res) => {   
    store.dispatch(CheckAuth);
  };
  // @ts-ignore
  window.callbackOAuthFailure = (content) => {
    // ErrorManager.AuthError();
  };

  window.open(
    `${serverUrl}api/auth/twitch`,
    'Twitch Auth',
    'width=500,height=700',
  );
};

const AuthHome = () => {

  return (
    <div
      style={{
        justifyContent: "center", alignContent: "center",
        alignItems: "center", display: "flex", alignSelf: "center",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <h3 onClick={RequestAuth}>
        Connexion Twitch
      </h3>
    </div>
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthHome);
