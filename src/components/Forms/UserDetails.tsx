import {
  Container,
  Box,
  TextField,
  Avatar,
  Typography
} from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useUser } from '../../hooks/useUser'

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL

interface UserType {
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
      const token = user ? user.token : ''
      const response = await axios.get(baseUrl + 'user', {
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
      if (error.response?.data?.errors) {
        console.log('Form errors:', error.response.data.errors)
      }
    }
  }
  return (
    <Container className="formContainerDetails">
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="formBoxDetails"
        >
          <Typography className="h1">
            User details
          </Typography>

          <Avatar
            alt="User Avatar"
            src={selectedUser.profileImageUrl}
            className="avatarUser"
          />

          {user && user.role === 'owner' && (
            <>
              <TextField
                id="customerCif"
                label="Customer CIF"
                className="textField"
                defaultValue={userDetails.customerCif}
                InputProps={{
                  readOnly: true
                }}
              />

              <TextField
                id="customerName"
                label="Customer Name"
                className="textField"
                defaultValue={userDetails.customerName}
                InputProps={{
                  readOnly: true
                }}
              />

              <TextField
                id="customerEmail"
                label="Customer email"
                className="textField"
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
            className="textField"
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
            className="textField"
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
            className="textField"
            defaultValue={userDetails.email}
            InputProps={{
              readOnly: true
            }}
          />

          <Box className='formBoxInput'>
            <div className='inputContainer'>
              <TextField
                id="nickname"
                label="User name"
                defaultValue={userDetails.nickname}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='inputContainer'>
              <TextField
                id="role"
                label="Role"
                defaultValue={userDetails.role}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
          </Box>
        </Box>

    </Container>
  )
}
