/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { regexPatterns } from '../../../constraint/validator/RegexPattern';
import { useAuth } from '../../../redux/ducks/auth';
import { Button } from '../../component/Button';
import { ArrowLeft } from '../../component/icons/ArrowLeft';
import { Input } from '../../component/Input';

export const Signup = () => {
  const { handleSubmit, errors, register, getValues } = useForm({ mode: 'onBlur' });
  const { setLoginStatus } = useAuth();
  const {
    required,
    email: { message: emailErrorMessage, value: emailPattern },
  } = regexPatterns;
  const submit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex items-center mb-16">
        <Button variant="icon" className="my-0" onClick={() => setLoginStatus(true)}>
          <ArrowLeft className="w-8" />
        </Button>
        <p className="text-3xl text-green-900">S'inscrire</p>
      </div>

      <form onSubmit={handleSubmit(submit)}>
        <Input
          name="email"
          label="Adresse email"
          placeholder="abc@example.xyz"
          errors={errors}
          inputRef={register({
            required,
            validate: {
              email: (value) => emailPattern.test(value) || emailErrorMessage,
            },
          })}
        />
        <Input
          name="password"
          label="Mot de passe"
          type="password"
          errors={errors}
          inputRef={register({
            required,
            minLength: {
              message: 'Le mot de passe doit être composé de 8 caractères minimum',
              value: 8,
            },
          })}
        />
        <Input
          name="passwordConfirm"
          label="Confirmation mot de passe"
          type="password"
          errors={errors}
          inputRef={register({
            required,
            validate: {
              notTheSame: (value) =>
                getValues('password') === value || 'Mot de passe non identique',
            },
          })}
        />
        <Button type="submit">Créer compte</Button>
      </form>
    </div>
  );
};
