import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '@mui/material/Button';

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loginError, setLoginError] = useState<string>('');
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post('/api/auth/login', data);
      if (response.status === 200) {
        alert('Zalogowano pomyślnie.');
        const id = response.data.id; 
        router.push(`/logged/${id}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError('Niespodziewany błąd.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Login: </label>
        <input id="username" {...register('username', { required: true })} />
        {errors.username && <span>Login jest wymagany.</span>}
      </div>
      <div>
        <label htmlFor="password">Hasło: </label>
        <input id="password" type="password" {...register('password', { required: true })} />
        {errors.password && <span>Hasło jest wymagane.</span>}
      </div>
      <Button variant="outlined" type="submit">Zaloguj się</Button>
      {loginError && <span>{loginError}</span>}
    </form>
  );
};

export default LoginForm;
