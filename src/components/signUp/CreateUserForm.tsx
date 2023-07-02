import React, { useState } from 'react';
import axios from 'axios';
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
  Snackbar,
  Alert,
} from '@mui/material';
import { useUser } from '../../hooks/useUser';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type RegisterType = {
  firstName: string;
  lastName: string;
  nickname: string;
  password: string;
  email: string;
  role: 'headchef' | 'chef';
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
  });

  const dataRegister = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const [formErrors, setFormErrors] = useState<any>({});

  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');

  const mediaType = 'image';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const [buttonText, setButtonText] = useState('Upload Image');

  const handleFileUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Food_Informer');
        formData.append('cloud_name', 'dzfvt7rrp');

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dzfvt7rrp/${mediaType}/upload`,
          formData
        );

        const imageUrl = response.data.url;
        setUrl(imageUrl);
        setIsImageUploaded(true);
        setButtonText('Successful upload!');
        console.log('Image uploaded:', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = user.token;
      const response = await axios.post(
        'http://localhost:3000/user',
        { ...registerData, profileImageUrl: url },
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

  const [isImageUploaded, setIsImageUploaded] = useState(false);

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

          <InputLabel htmlFor="image-upload">
            <Button
              component="span"
              variant="contained"
              onClick={handleFileUpload}
              sx={{ mt: 1, mb: 3 }}
            >
              {isImageUploaded ? <CheckCircleIcon sx={{ mr: 1 }} /> : null}
              {buttonText}
            </Button>
          </InputLabel>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

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
