import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useUser } from '../../../hooks/useUser';
import ImageUploader from '../../Images/ImageUploader';
import { Container, Grid, Box, TextField, Button, Avatar, InputLabel, Select, MenuItem, SelectChangeEvent, FormControl, FormHelperText, Typography } from '@mui/material';

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'headChef' | 'chef';
  nickname: string;
  profileImageUrl: string;
};

type ApiResponse = {
  data: { token: string };
};

type ErrorResponse = {
  error: { [key: string]: string };
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
      const response = await axios.put<ApiResponse>(
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
      console.error(error);
      setFormErrors({});
      if (error.response && error.response.data && error.response.data.error) {
        const errorResponse: ErrorResponse = error.response.data;
        setFormErrors(errorResponse.error);
      }
    }
  };

  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string }>(
    {}
  ); 
  
  const handleRoleChange = (event: SelectChangeEvent<'headChef' | 'chef'>) => {
    const value = event.target.value as 'headChef' | 'chef';
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      role: value,
    }));
  };
  

  console.log('userDetails:', userDetails);

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
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
          <Typography variant="h1" mb={3} sx={{ fontSize: 28 }}>User details</Typography>
  
          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
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
            error={!!formErrors.firstName}
            helperText={formErrors.firstName || ''}
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
            error={!!formErrors.lastName}
            helperText={formErrors.lastName || ''}
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
            error={!!formErrors.email}
            helperText={formErrors.email || ''}
          />
  
          <TextField
            id="nickname"
            label="User name"
            sx={{ mt: 2, mb: 1.5 }}
            value={userDetails.nickname}
            onChange={handleChange}
            error={!!formErrors.nickname}
            helperText={formErrors.nickname || ''}
          />
  
          <FormControl
            error={!!formErrors.role}
            sx={{ mt: 2, mb: 1.5, ml: 8, width: '50%', alignItems: 'left' }}
          >
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={userDetails.role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value="chef">Chef</MenuItem>
              <MenuItem value="headChef">Head Chef</MenuItem>
            </Select>
            {formErrors.role && <FormHelperText>{formErrors.role}</FormHelperText>}
          </FormControl>
  
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
}