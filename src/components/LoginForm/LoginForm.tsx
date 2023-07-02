import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD } from '../../config/routes';

type LoginType = {
  nickname: String;
  password: String;
  token: String;
};
type ApiResponse = {
  data: { token: string };
};

type ApiResponseUser = {
  data: {
    email: String;
    nikname: String;
    permissions: [String];
    role: String;
  };
};

export const LoginForm = () => {
  const data = useUser();
  const navigate = useNavigate();
  const { user, setUser } = data;
  const [loginData, setLoginData] = React.useState<LoginType>({
    nickname: '',
    password: '',
    token: '',
  });

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const [formErrors, setFormErrors] = React.useState<any>({});

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    // console.log('LoginForm, loginData:', loginData);
    try {
      const response: ApiResponse = await axios.post(
        'http://localhost:3000/user/login',
        loginData
      );
      // console.log('LoginForm response:', response);
      const token = response.data.token;

      const responseUser: ApiResponseUser = await axios.get(
        'http://localhost:3000/user',
        { headers: { Authorization: `Bearer ${response.data.token}` } }
      );
      const userLocal = { token, info: responseUser.data, isLoggedIn: true };
      setUser(userLocal);
      // console.log('loginform, user', user);
      // console.log('LoginForm responseUsersList:', responseUser);
      // console.log('LoginForm response:', response);
      window.localStorage.setItem('user', JSON.stringify(userLocal));
      navigate(DASHBOARD);
    } catch (error) {
      setFormErrors({});
      // console.log('login error: ', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        pt={4}
        sx={{ minHeight: '70vh' }}
      >
        <Typography variant="h1" mb={3} sx={{ fontSize: 28 }}>
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="nickname"
            margin="normal"
            type="text"
            fullWidth
            label="User name"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataLogin}
          />
          <TextField
            name="password"
            margin="normal"
            type="password"
            fullWidth
            label="Password"
            sx={{ mt: 1.5, mb: 1.5 }}
            required
            onChange={dataLogin}
          />
          <Button
            fullWidth
            type="submit"
            sx={{ mt: 1.5, mb: 3 }}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};
