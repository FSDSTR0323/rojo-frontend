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
import { useUser } from '../../hooks/useUser';

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
  const { user } = useUser()

  const [editedUser, setEditedUser] = React.useState<UserType>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'headchef',
    nickname: '',
    modifiedBy: '',
  });
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        const userData = response.data;
        setEditedUser(userData);
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
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = user.token;
      const response = await axios.put(
        `http://localhost:3000/user/${userId}`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('Form errors:', error.response.data.errors);
      }
    }
  };

  const handleRoleChange = (event: SelectChangeEvent<'headchef' | 'chef'>) => {
    const value: 'headchef' | 'chef' = event.target.value as
      | 'headchef'
      | 'chef';
      setEditedUser((prevUser) => ({
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
        <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px' }}>
          <h2>Editar usuario</h2>
          <TextField
            name="firstName"
            margin="normal"
            type="text"
            fullWidth
            label="Name"
            sx={{ mt: 2, mb: 1.5 }}
            required
            defaultValue={editedUser.firstName}
            onChange={handleChange}
          />

          <TextField
            name="lastName"
            margin="normal"
            type="text"
            fullWidth
            label="Surname"
            sx={{ mt: 2, mb: 1.5 }}
            required
            defaultValue={editedUser.lastName}
            onChange={handleChange}
          />
          <TextField
            name="email"
            margin="normal"
            type="email"
            fullWidth
            label="Email"
            sx={{ mt: 2, mb: 1.5 }}            
            defaultValue={editedUser.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="nickname"
            label="User name"
            sx={{ mt: 2, mb: 1.5 }}
            defaultValue={editedUser.nickname}
            InputProps={{
              readOnly: true,
            }}
          />

          <InputLabel id="role-label" sx={{ mt: 2, mb: 2 }}>
            Rol
          </InputLabel>
          <Select
            name="role"
            margin="dense"
            fullWidth
            labelId="role-label"
            value={editedUser.role}
            onChange={handleRoleChange}
          >
            <MenuItem value="headchef">Head Chef</MenuItem>
            <MenuItem value="chef">Chef</MenuItem>
          </Select>
          

          <Button
            fullWidth
            type="submit"
            sx={{ mt: 1.5 }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};


