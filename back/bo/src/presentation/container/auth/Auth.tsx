import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Signin } from './Signin';
import { Signup } from './Signup';
import logo from '../../../assets/img/logo.png';
import { Card } from '../../component/Card';
import { RootState } from '../../../redux/ducks';
// import '../../../bovoyage.css';

export const Auth = () => {
  const {
    isLogin,
    credentials: { accessToken },
  } = useSelector(({ auth }: RootState) => auth);
  const history = useHistory();

  React.useEffect(() => {
    if (accessToken) {
      history.replace('/app');
    }
  });

  return (
    <div className=" h-full p-10 items-center justify-between body-background">
      <div className="custom-container">
        <div className="flex flex-col items-left">
          <img className="w-32" alt="Logo FDD" src={logo} />
          <p className="font-bold text-2xl">Back Office</p>
        </div>
        <Card className="w-full">{isLogin ? <Signin /> : <Signup />}</Card>
      </div>
    </div>
  );
};
