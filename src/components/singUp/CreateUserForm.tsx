import { Container, Grid, Box, TextField, Button, MenuItem, InputLabel, Select, SelectChangeEvent  } from '@mui/material';
import React from 'react';
import axios from 'axios';


type RegisterType = {
  firstName: string;
  lastName: string;
  nickname: string;
  password: string;
  email: string;
  role: 'headchef' | 'chef';
};

export const CreateUserForm = ({ }) => {
  const [registerData, setRegisterData] = React.useState<RegisterType>({
    firstName: '',
    lastName: '',
    nickname: '',
    password: '',
    email: '',
    role: 'headchef',
  });

  const dataRegister = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const [formErrors, setFormErrors] = React.useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await axios.post('http://localhost:3000/user', registerData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setFormErrors({});
      if (error.response && error.response.data && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      }
    }
  };
  

  const handleRoleChange = (event: SelectChangeEvent<'headchef' | 'chef'>) => {
    const value: 'headchef' | 'chef' = event.target.value as 'headchef' | 'chef';
    setRegisterData({ ...registerData, role: value });
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
            <h2>Crear nuevo usuario</h2>
            <TextField
                name="firstName"
                margin="normal"
                type="text"
                fullWidth
                label="Nombre"
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={dataRegister}
            />

            <TextField
                name="lastName"
                margin="normal"
                type="text"
                fullWidth
                label="Apellidos"
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={dataRegister}
            />

            <TextField
                name="nickname"
                margin="normal"
                type="text"
                fullWidth
                label="Nombre de usuario"
                sx={{ mt: 2, mb: 1.5 }}
                required
                error={!!formErrors.nickname}
                helperText={formErrors.nickname}
                onChange={dataRegister}
            />

            <TextField
                name="password"
                margin="normal"
                type="password"
                fullWidth
                label="Contraseña"
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={dataRegister}
            />

            <TextField 
                name="email"
                margin="normal"
                type="email"
                fullWidth
                label="Email"
                sx={{ mt:2, mb:1.5 }}
                error={!!formErrors.email}
                helperText={formErrors.email}
                onChange={dataRegister}
            />

            <InputLabel id="role-label">Rol</InputLabel>
            <Select
                labelId="role-label"
                name="role"
                margin="dense"
                fullWidth
                value={registerData.role}
                onChange={handleRoleChange}
            >
                <MenuItem value="chef">Cocinero</MenuItem>
                <MenuItem value="headchef">Jefe de Cocina</MenuItem>
            </Select>

            <Button 
                fullWidth 
                type="submit" 
                sx={{ mt: 1.5, mb: 3 }} 
                variant="contained"
                >
                Crear usuario
            </Button>
            </Box>
        </Grid>
    </Container>
  );
};

