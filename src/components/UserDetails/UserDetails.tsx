import { Container, Grid, Box, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  nickname: string;
  customerName: string;
  customerEmail: string;
  customerCif: string;
};

export const UserDetails: React.FC<{ userId: string }> = ({ userId }) => {
  const { user } = useUser();

  const [userDetails, setUserDetails] = React.useState<UserType>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    nickname: '',
    customerName: '',
    customerEmail: '',
    customerCif: '',
  });

  useEffect(() => {

    const fetchUser = async () => {
      try {
    
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        const userData = response.data;
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = user.token;
      const response = await axios.get(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setUserDetails(userData);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('Form errors:', error.response.data.errors);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid 
        container direction="column" 
        alignItems="center" 
        justifyContent="center" 
        sx={{}}
        >
            <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px' }}>
            <h2>User details</h2>

            {user.role === 'owner' && (
                <>
                <TextField
                    id="customerCif"
                    label="Customer CIF"
                    sx={{ mt: 2, mb: 1.5 }}
                    defaultValue={userDetails.customerCif}
                    InputProps={{
                    readOnly: true,
                    }}
                />

                <TextField
                    id="customerName"
                    label="Customer Name"
                    sx={{ mt: 2, mb: 1.5 }}
                    defaultValue={userDetails.customerName}
                    InputProps={{
                    readOnly: true,
                    }}
                />

                <TextField
                    id="customerEmail"
                    label="Customer email"
                    sx={{ mt: 2, mb: 1.5 }}
                    defaultValue={userDetails.customerEmail}
                    InputProps={{
                    readOnly: true,
                    }}
                />
                </>
            )}

            <TextField
                name="firstName"
                margin="normal"
                type="text"
                fullWidth
                label="Name"
                sx={{ mt: 2, mb: 1.5 }}
                required
                defaultValue={userDetails.firstName}
                InputProps={{
                readOnly: true,
                }}
            />

            <TextField
                name="lastName"
                margin="normal"
                type="text"
                fullWidth
                label="Surname"
                sx={{ mt: 2, mb: 1.5 }}
                required
                defaultValue={userDetails.lastName}
                InputProps={{
                readOnly: true,
                }}
            />

            <TextField
                name="email"
                margin="normal"
                type="email"
                fullWidth
                label="Email"
                sx={{ mt: 2, mb: 1.5 }}
                required
                defaultValue={userDetails.email}
                InputProps={{
                readOnly: true,
                }}
            />

            <TextField
                id="nickname"
                label="User name"
                sx={{ mt: 2, mb: 1.5 }}
                defaultValue={userDetails.nickname}
                InputProps={{
                readOnly: true,
                }}
            />

            <TextField
                id="role"
                label="Role"
                sx={{ mt: 2, mb: 1.5 }}
                defaultValue={userDetails.role}
                InputProps={{
                readOnly: true,
                }}
            />
            </Box>
      </Grid>
    </Container>
  );
};
