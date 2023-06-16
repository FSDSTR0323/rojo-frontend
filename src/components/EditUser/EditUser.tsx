import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios';

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'headchef' | 'chef';
  nickname: string;
  modifiedBy: string;
};

export const EditUserForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = React.useState<UserType>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'headchef',
    nickname: '',
    modifiedBy: '',
  });
  console.log('userid', userId)
  useEffect(() => {
    console.log('l.37', userId)
    const fetchUser = async () => {
      try {
        console.log('userid39', userId);
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clic boton l.63", userId)
    try {
      const a = localStorage.getItem('user');
      const token = JSON.parse(a).token;
      console.log('Token:', token);
      const response = await axios.put(
        `http://localhost:3000/user/${userId}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('Form errors:', error.response.data.errors);
      }
    }
  };

  const handleRoleChange = (event: SelectChangeEvent<'headchef' | 'chef'>) => {
    const value: 'headchef' | 'chef' = event.target.value as
      | 'headchef'
      | 'chef';
    setUser((prevUser) => ({
      ...prevUser,
      role: value,
    }));
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{}}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <h2>Editar usuario</h2>
          <TextField
            name="firstName"
            margin="normal"
            type="text"
            fullWidth
            label="Nombre"
            sx={{ mt: 2, mb: 1.5 }}
            required
            value={user.firstName}
            onChange={handleChange}
          />

          <TextField
            name="lastName"
            margin="normal"
            type="text"
            fullWidth
            label="Apellidos"
            sx={{ mt: 2, mb: 1.5 }}
            required
            value={user.lastName}
            onChange={handleChange}
          />
          <TextField
            name="email"
            margin="normal"
            type="email"
            fullWidth
            label="Email"
            sx={{ mt: 2, mb: 1.5 }}
            required
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            id="Nombre de usuario"
            label="Usuario"
            sx={{ mt: 2, mb: 1.5 }}
            value={user.nickname}
            InputProps={{
              readOnly: true,
            }}
          />

          <InputLabel id="role-label" sx={{ mt: 2, mb: 1.5 }}>
            Rol
          </InputLabel>
          <Select
            name="role"
            margin="dense"
            fullWidth
            labelId="role-label"
            value={user.role}
            onChange={handleRoleChange}
          >
            <MenuItem value="headchef">Head Chef</MenuItem>
            <MenuItem value="chef">Chef</MenuItem>
          </Select>

          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};


