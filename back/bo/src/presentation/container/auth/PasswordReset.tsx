import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { regexPatterns } from '../../../constraint/validator/RegexPattern';
import { authentification } from '../../../data/constants/Urls';
import { useAuthentificationSA } from '../../../service/applicatif';
import { Button } from '../../component/Button';
import { Input } from '../../component/Input';
import logo from '../../../assets/img/logo.png';
import { ReactComponent as ShowIcon } from '../../../assets/img/show_icon.svg';
import { ReactComponent as HideIcon } from '../../../assets/img/hide_icon.svg';
import { useCustomSnackbar } from '../../../common/hooks/Snackbar';

export const PasswordReset = () => {
  const { search } = useLocation();
  const { register, handleSubmit, errors, getValues, reset } = useForm({ mode: 'onBlur' });
  const [isPasswordSeen, setIsPasswordSeen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [openSnackbar] = useCustomSnackbar();
  const [, resetToken] = search.split('=');
  const { required } = regexPatterns;
  const { verifyResetToken, resetPassword } = useAuthentificationSA();
  const submit = async (data) => {
    try {
      const { password } = data;
      const { id } = user;
      await resetPassword({ body: { id, password } });

      reset();
      openSnackbar(
        'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe',
      );
    } catch (error) {
      openSnackbar(error?.message);
    }
  };

  React.useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await verifyResetToken({
          customUrl: `${authentification.verifyResetToken}/${resetToken}`,
        });
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 bg-grey">
      <div className="rounded-2xl w-full shadow-2xl p-8 flex flex-col bg-white">
        <div className="flex flex-col mb-8 items-center">
          <img src={logo} alt="logo" className="w-24" />
          <p className="title-init text-xl">Réinitialisation mot de passe</p>
        </div>
        {user ? (
          <form
            onSubmit={handleSubmit(submit)}
            className="pass-form max-w-sm flex flex-col self-center"
          >
            <Input
              label="Nouveau mot de passe"
              type={isPasswordSeen ? 'text' : 'password'}
              name="password"
              inputRef={register({
                required,
                minLength: {
                  value: 6,
                  message: 'Le mot de passe doit être constitué au moins de 6 caractères',
                },
              })}
              errors={errors}
              rightIcon={isPasswordSeen ? HideIcon : ShowIcon}
              onRightIconClick={() => setIsPasswordSeen((value) => !value)}
              required
            />
            <Input
              label="Confirmation du nouveau mot de passe"
              name="passwordConfirm"
              type="password"
              errors={errors}
              inputRef={register({
                required,
                validate: {
                  notSame: (value) =>
                    // eslint-disable-next-line operator-linebreak
                    value === getValues('password') ||
                    'La confirmation du mot de passe est différent du mot de passe',
                },
              })}
            />
            <Button type="submit" className="w-full btn-aro">
              Réinitialiser
            </Button>
          </form>
        ) : (
          <p className="text-center">Lien invalide</p>
        )}
      </div>
    </div>
  );
};
