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
  type SelectChangeEvent,
  Typography
} from '@mui/material'
import { useUser } from '../../hooks/useUser'
import ImageUploader from '../Images/ImageUploader'
import './global-form-styles.css'

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL

interface RegisterType {
  firstName: string
  lastName: string
  nickname: string
  password: string
  email: string
  role: 'headChef' | 'chef'
  profileImageUrl: string
}

interface CreateUserFormProps {
  onUserAdd: (user: any) => void
  onSuccess: () => void
}

interface ApiResponse {
  data: { token: string }
}

interface ErrorResponse {
  error: Record<string, string>
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
    if (name === 'nickname' && (formErrors.nickname.length > 0)) {
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
      const token = (user != null) ? user.token : ''
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
      if (error.response?.data?.error) {
        const errorResponse = error.response.data as ErrorResponse
        setFormErrors(errorResponse.error)
      }
    }
  }

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>(
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
          <Typography className="h1">
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
            label="Name"
            className="textField"
            required
            onChange={dataRegister}
            error={!(formErrors.firstName.length === 0)}
            helperText={(formErrors.firstName.length > 0) || ''}
          />

          <TextField
            name="lastName"
            margin="normal"
            type="text"
            label="Surname"
            className="textField"
            required
            onChange={dataRegister}
            error={!(formErrors.lastName.length === 0)}
            helperText={(formErrors.lastName.length > 0) || ''}
          />

          <TextField
            name="nickname"
            margin="normal"
            type="text"
            label="User Name"
            className="textField"
            required
            onChange={dataRegister}
            error={!(formErrors.nickname.length === 0)}
            helperText={(formErrors.nickname.length > 0) || ''}
          />

          <TextField
            name="password"
            margin="normal"
            type="password"
            label="Password"
            className="textField"
            required
            onChange={dataRegister}
            error={!(formErrors.password.length === 0)}
            helperText={(formErrors.password.length > 0) || ''}
          />

          <TextField
            name="email"
            margin="normal"
            type="email"
            label="Email"
            className="textField"
            onChange={dataRegister}
            error={!(formErrors.email.length === 0)}
            helperText={(formErrors.email.length > 0) || ''}
          />

          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            margin="dense"
            className='selectField'
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
