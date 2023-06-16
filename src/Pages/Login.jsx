import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD } from '../config/routes';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { useUser } from '../hooks/useUser';

export const Login = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate(DASHBOARD);
    }
  }, [user]);

  return (
    <>
      <LoginForm />
    </>
  );
};
