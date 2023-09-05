import {
  Container,
  Grid,
  Box,
  TextField,
  Avatar,
  Typography
} from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useUser } from '../../../hooks/useUser'

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL

type UserType = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  nickname: string
  profileImageUrl: string
  customerName: string
  customerEmail: string
  customerCif: string
}

export const UserDetails: React.FC<{ selectedUser: UserType }> = ({
  selectedUser
}) => {
  const { user } = useUser()
  const [userDetails, setUserDetails] = React.useState<UserType>({
    ...selectedUser,
    customerCif: '',
    customerName: '',
    customerEmail: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = user.token
      const response = await axios.get(baseUrl + `user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const userData = response.data
      setUserDetails({
        ...userData,
        profileImageUrl: userData.profileImageUrl
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('Form errors:', error.response.data.errors)
      }
    }
  }
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
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#277c27fb'
              }
            },
            '& label.Mui-focused': {
              color: '#277c27fb'
            }
          }}
        >
          <Typography variant="h1" mb={3} sx={{ fontSize: 28 }}>
            User details
          </Typography>

          <Avatar
            alt="User Avatar"
            src={selectedUser.profileImageUrl}
            sx={{ width: 100, height: 100 }}
          />

          {user.role === 'owner' && (
            <>
              <TextField
                id="customerCif"
                label="Customer CIF"
                sx={{ mt: 2, mb: 1.5 }}
                defaultValue={userDetails.customerCif}
                InputProps={{
                  readOnly: true
                }}
              />

              <TextField
                id="customerName"
                label="Customer Name"
                sx={{ mt: 2, mb: 1.5 }}
                defaultValue={userDetails.customerName}
                InputProps={{
                  readOnly: true
                }}
              />

              <TextField
                id="customerEmail"
                label="Customer email"
                sx={{ mt: 2, mb: 1.5 }}
                defaultValue={userDetails.customerEmail}
                InputProps={{
                  readOnly: true
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
            defaultValue={userDetails.firstName}
            InputProps={{
              readOnly: true
            }}
          />

          <TextField
            name="lastName"
            margin="normal"
            type="text"
            fullWidth
            label="Surname"
            sx={{ mt: 2, mb: 1.5 }}
            defaultValue={userDetails.lastName}
            InputProps={{
              readOnly: true
            }}
          />

          <TextField
            name="email"
            margin="normal"
            type="email"
            fullWidth
            label="Email"
            sx={{ mt: 2, mb: 1.5 }}
            defaultValue={userDetails.email}
            InputProps={{
              readOnly: true
            }}
          />

          <TextField
            id="nickname"
            label="User name"
            sx={{ mt: 2, mb: 1.5 }}
            defaultValue={userDetails.nickname}
            InputProps={{
              readOnly: true
            }}
          />

          <TextField
            id="role"
            label="Role"
            sx={{ mt: 2, mb: 1.5, ml: 8, width: '50%', alignItems: 'left' }}
            defaultValue={userDetails.role}
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
      </Grid>
    </Container>
  )
}
