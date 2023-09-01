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
import '../../config/i18n';

import { useTranslation } from 'react-i18next';

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL;

type LoginType = {
  nickname: string;
  password: string;
  token: string;
};

type ApiResponse = {
  data: { token: string };
};

type ErrorResponse = {
  error: { [key: string]: string };
};

export const LoginForm = () => {
  const data = useUser();
  const navigate = useNavigate();
  const { setUser } = data;
  const { t, i18n } = useTranslation();
  const [loginData, setLoginData] = React.useState<LoginType>({
    nickname: '',
    password: '',
    token: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: ApiResponse = await axios.post(
        baseUrl + 'user/login',
        loginData
      );
      const token = response.data.token;

      const responseUser: any = await axios.get(baseUrl + 'user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userLocal = {
        token,
        info: responseUser.data,
        isLoggedIn: true,
      };
      setUser(userLocal);
      window.localStorage.setItem('user', JSON.stringify(userLocal));
      navigate(DASHBOARD);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorResponse: ErrorResponse = error.response.data;
        setFormErrors(errorResponse.error);
      }
    }
  };

  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string }>(
    {}
  );

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: '70vh',
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#277c27fb',
            },
          },
          '& label.Mui-focused': {
            color: '#277c27fb',
          },
        }}
      >
        <Typography variant="h1" mb={3} sx={{ fontSize: 28 }}>
          {t('sign_in')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="nickname"
            margin="normal"
            type="text"
            fullWidth
            label={t('user_name')}
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={handleChange}
            error={!!formErrors.nickname}
            helperText={formErrors.nickname || ''}
          />
          <TextField
            name="password"
            margin="normal"
            type="password"
            fullWidth
            label={t('password')}
            sx={{ mt: 1.5, mb: 1.5 }}
            required
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password || ''}
          />
          <Button
            fullWidth
            type="submit"
            sx={{
              mt: 1.5,
              mb: 3,
              backgroundColor: '#277c27fb',
              '&:hover': {
                backgroundColor: '#277c27cf',
              },
            }}
            variant="contained"
          >
            {t('sign_in')}
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};
