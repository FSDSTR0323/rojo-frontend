import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Box, TextField, Button, MenuItem, InputLabel, Select, SelectChangeEvent, Snackbar, Alert } from '@mui/material';
import { useUser } from '../../hooks/useUser';
import ImageUploader from '../Images/ImageUploader';

type RegisterType = {
  firstName: string;
  lastName: string;
  nickname: string;
  password: string;
  email: string;
  role: 'headchef' | 'chef';
  profileImage: string;
};

type CreateUserFormProps = {
  onUserAdd: (user: any) => void;
};

export const CreateUserForm = ({ onUserAdd }: CreateUserFormProps) => {
  const { user } = useUser();

  const [registerData, setRegisterData] = useState<RegisterType>({
    firstName: '',
    lastName: '',
    nickname: '',
    password: '',
    email: '',
    role: 'headchef',
    profileImage: '',
  });

  const dataRegister = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const [formErrors, setFormErrors] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUserImageSelect = (image: File) => { 
    setImageUrl(URL.createObjectURL(image));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = user.token;
      const response = await axios.post(
        'http://localhost:3000/user',
        { ...registerData, profileImageUrl: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsSnackbarOpen(true);
      onUserAdd(response.data);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setFormErrors({});
      if (error.response && error.response.data && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      }
    }
  };

  const handleRoleChange = (event: SelectChangeEvent<'headchef' | 'chef'>) => {
    const value: 'headchef' | 'chef' = event.target.value as
      | 'headchef'
      | 'chef';
    setRegisterData({ ...registerData, role: value });
  };

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          display={isModalOpen ? 'block' : 'none'}
        >
          <h2>Create a new user</h2>

          <div>          
            <ImageUploader onImageSelect={handleUserImageSelect} />          
          </div>

          <TextField
            name="firstName"
            margin="normal"
            type="text"
            fullWidth
            label="Name"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataRegister}
          />

          <TextField
            name="lastName"
            margin="normal"
            type="text"
            fullWidth
            label="Surname"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataRegister}
          />

          <TextField
            name="nickname"
            margin="normal"
            type="text"
            fullWidth
            label="User Name"
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
            label="Password"
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
            sx={{ mt: 2, mb: 1.5 }}
            error={!!formErrors.email}
            helperText={formErrors.email}
            onChange={dataRegister}
          />

          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            margin="dense"
            fullWidth
            value={registerData.role}
            onChange={handleRoleChange}
          >
            <MenuItem value="chef">Chef</MenuItem>
            <MenuItem value="headchef">Head Chef</MenuItem>
          </Select>

          <Button
            fullWidth
            type="submit"
            sx={{ mt: 1.5, mb: 3 }}
            variant="contained"
          >
            Create User
          </Button>
        </Box>
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        sx={{
          width: '300px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          User successfully created
        </Alert>
      </Snackbar>
    </Container>
  );
};
