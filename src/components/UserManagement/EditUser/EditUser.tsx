import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../hooks/useUser';
import ImageUploader from '../../Images/ImageUploader';
import { Container, Grid, Box, TextField, Button, Avatar } from '@mui/material';

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
  onClose: () => void;
}> = ({ selectedUser, userId, onClose }) => {
  const { user } = useUser();
  console.log('selectedUser', selectedUser);
  const [userDetails, setUserDetails] = useState<UserType>({
    ...selectedUser,
  });
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const [showAvatar, setShowAvatar] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('Field changed:', name, value);
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    const updateProfileImage = () => {
      const profileImage = document.getElementById('profile-image') as HTMLImageElement;
      if (profileImage) {
        profileImage.src = userDetails.profileImageUrl || selectedUser.profileImageUrl;
      }
    };

    updateProfileImage();
  }, [userDetails.profileImageUrl, selectedUser.profileImageUrl]);

  useEffect(() => {
    setUserDetails({ ...selectedUser });
    setIsNewImageSelected(false);
  }, [selectedUser]);

  const handleUserImageSelect = (image: string) => {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      profileImageUrl: image,
    }));
    setIsNewImageSelected(true);
    setShowAvatar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = user.token;
      console.log('Updating user:', userDetails);
      const response = await axios.put(
        `http://localhost:3000/user/${userId}`,
        { ...userDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUserDetails = { ...selectedUser, ...response.data };
      console.log('Updated userDetails:', updatedUserDetails);
      setUserDetails(updatedUserDetails);
      

      onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('Form errors:', error.response.data.errors);
      }
    }
  };

  console.log('userDetails:', userDetails);

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{}}>
        <Box component="form" onSubmit={handleSubmit}>
          <h2>User details</h2>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {showAvatar && !isNewImageSelected && (
              <Box sx={{ width: '50%', height: 100 }}>
                <Avatar
                  id="profile-image"
                  alt="User Avatar"
                  src={userDetails.profileImageUrl || selectedUser.profileImageUrl}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
            )}
            <Box sx={{ width: isNewImageSelected ? '50%' : '100%' }}>
              <ImageUploader onImageSelect={handleUserImageSelect} imageUrl={null} />
            </Box>
          </Box>

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

          <Button
            fullWidth
            type="submit"
            sx={{
              mt: 1.5,
              mb: 3,
              backgroundColor: "#277c27fb",
              "&:hover": {
                backgroundColor: "#277c27cf",
              },
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};
