import { Container, Grid, Box, TextField, Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../hooks/useUser';
import ImageUploader from '../../Images/ImageUploader';

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  nickname: string;
  profileImageUrl: string;
};

export const EditUserForm: React.FC<{
  selectedUser: UserType;
  userId: string;
}> = ({ selectedUser, userId }) => {
  const { user } = useUser();
  console.log('selectedUser', selectedUser);
  const [userDetails, setUserDetails] = React.useState<UserType>({
    ...selectedUser,
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUserImageSelect = (image: File) => {
    setImageUrl(URL.createObjectURL(image));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = user.token;
      const response = await axios.put(
        `http://localhost:3000/user/${userId}`,
        { ...userDetails, profileImageUrl: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUserDetails = response.data;
      setUserDetails(updatedUserDetails);
      console.log('Updated userDetails:', updatedUserDetails);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('Form errors:', error.response.data.errors);
      }
    }
  };

  console.log('userDetails:', userDetails);

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
          <h2>User details</h2>

          <div>
            <ImageUploader onImageSelect={handleUserImageSelect} />
          </div>

          <Avatar
            alt="User Avatar"
            src={userDetails.profileImageUrl}
            sx={{ width: 100, height: 100 }}
          />

          <TextField
            name="firstName"
            margin="normal"
            type="text"
            fullWidth
            label="Name"
            sx={{ mt: 2, mb: 1.5 }}
            value={userDetails.firstName}
            onChange={handleChange}
          />

          <TextField
            name="lastName"
            margin="normal"
            type="text"
            fullWidth
            label="Surname"
            sx={{ mt: 2, mb: 1.5 }}
            value={userDetails.lastName}
            onChange={handleChange}
          />

          <TextField
            name="email"
            margin="normal"
            type="email"
            fullWidth
            label="Email"
            sx={{ mt: 2, mb: 1.5 }}
            value={userDetails.email}
            onChange={handleChange}
          />

          <TextField
            id="nickname"
            label="User name"
            sx={{ mt: 2, mb: 1.5 }}
            value={userDetails.nickname}
            onChange={handleChange}
          />

          <TextField
            id="role"
            label="Role"
            sx={{ mt: 2, mb: 1.5, ml: 8, alignItems: 'right' }}
            value={userDetails.role}
            onChange={handleChange}
          />

          <Button fullWidth type="submit" sx={{ mt: 1.5, mb: 3 }} variant="contained">
            Confirm
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};
