import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useCustomSnackbar } from '../../../common/hooks/Snackbar';

import { regexPatterns } from '../../../constraint/validator/RegexPattern';
import { useAuth } from '../../../redux/ducks/auth';
import { Button } from '../../component/Button';
import { Input } from '../../component/Input';

export const Signin = () => {
  const { handleSubmit, errors, register, setValue } = useForm({ mode: 'onBlur' });
  const { signin } = useAuth();
  const [openSnackbar] = useCustomSnackbar();
  const [loading, setLoading] = React.useState(false);
  const { required } = regexPatterns;
  const submit = async (data) => {
    setLoading(true);
    try {
      await signin(data);
    } catch (error) {
      openSnackbar(error?.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setValue('email', 'fullstackadmin@gmail.com');
    setValue('password', 'admin@fullstack');
  }, []);

  return (
    <div className="form-container">
      <h2 className="text-black mb-8">Se connecter</h2>

      <form onSubmit={handleSubmit(submit)} className="flex flex-col form-auth">
        <Input
          // value='andoom@gmail.com'
          name="email"
          label="Identifiant"
          placeholder="Votre adresse mail"
          errors={errors}
          inputRef={register({ required })}
          required
        />
        <Input
          // value='123@andoom'
          name="password"
          label="Mot de passe"
          type="password"
          errors={errors}
          inputRef={register({ required })}
          required
        />

        <Button type="submit" className="w-full" loading={loading}>
          Se connecter
        </Button>
      </form>
    </div>
  );
};
