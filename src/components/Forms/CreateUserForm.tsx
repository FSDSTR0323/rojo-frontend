import React, { useState } from 'react'
import axios from 'axios'
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
  Typography
} from '@mui/material'
import { useUser } from '../../hooks/useUser'
import ImageUploader from '../Images/ImageUploader'
import './global-form-styles.css'



const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL

type RegisterType = {
  firstName: string
  lastName: string
  nickname: string
  password: string
  email: string
  role: 'headChef' | 'chef'
  profileImageUrl: string
}

type CreateUserFormProps = {
  onUserAdd: (user: any) => void
  onSuccess: () => void
}

type ApiResponse = {
  data: { token: string }
}

type ErrorResponse = {
  error: { [key: string]: string }
}

export const CreateUserForm = ({
  onUserAdd,
  onSuccess
}: CreateUserFormProps) => {
  const { user } = useUser()

  const [registerData, setRegisterData] = useState<RegisterType>({
    firstName: '',
    lastName: '',
    nickname: '',
    password: '',
    email: '',
    role: 'headChef',
    profileImageUrl: ''
  })

  const dataRegister = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name === 'nickname' && formErrors.nickname) {
      setFormErrors((prevErrors) => {
        return {
          ...prevErrors,
          nickname: ''
        }
      })
    }
    setRegisterData({ ...registerData, [name]: value })
  }

  const handleUserImageSelect = (imageUrl: string | null) => {
    setRegisterData({
      ...registerData,
      profileImageUrl: imageUrl ?? ''
    })
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = user ? user.token : '';
      setFormErrors({})
      const response = await axios.post<ApiResponse>(
        baseUrl + 'user',
        { ...registerData },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      onUserAdd(response.data)
      onSuccess()
      handleCloseModal()
    } catch (error) {
      console.error(error)
      setFormErrors({})
      if (error.response && error.response.data && error.response.data.error) {
        const errorResponse = error.response.data as ErrorResponse;
        setFormErrors(errorResponse.error);
      }

    }
  }

  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string }>(
    {}
  )

  const handleRoleChange = (event: SelectChangeEvent<'headChef' | 'chef'>) => {
    const value: 'headChef' | 'chef' = event.target.value as 'headChef' | 'chef'
    setRegisterData({ ...registerData, role: value })
  }

  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="formContainer" 
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          display={isModalOpen ? 'block' : 'none'}
          className="formBox" 
        >
          <Typography variant="h1" mb={3} className="h1"> 
            Create a new user
          </Typography>

          <span className="imageUploaderContainer"> 
            <ImageUploader
              onImageSelect={handleUserImageSelect}
              imageUrl={null}
            />
          </span>

          <TextField
            name="firstName"
            margin="normal"
            type="text"
            fullWidth
            label="Name"
            className="textField" 
            required
            onChange={dataRegister}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName || ''}
          />

          <TextField
            name="lastName"
            margin="normal"
            type="text"
            fullWidth
            label="Surname"
            className="textField" 
            required
            onChange={dataRegister}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName || ''}
          />

          <TextField
            name="nickname"
            margin="normal"
            type="text"
            fullWidth
            label="User Name"
            className="textField" 
            required
            onChange={dataRegister}
            error={!!formErrors.nickname}
            helperText={formErrors.nickname || ''}
          />

          <TextField
            name="password"
            margin="normal"
            type="password"
            fullWidth
            label="Password"
            className="textField" 
            required
            onChange={dataRegister}
            error={!!formErrors.password}
            helperText={formErrors.password || ''}
          />

          <TextField
            name="email"
            margin="normal"
            type="email"
            fullWidth
            label="Email"
            className="textField" 
            onChange={dataRegister}
            error={!!formErrors.email}
            helperText={formErrors.email || ''}
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
            <MenuItem value="headChef">Head Chef</MenuItem>
          </Select>

          <Button
            fullWidth
            type="submit"
            className="button"
            variant="contained"
          >
            Create User
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}
