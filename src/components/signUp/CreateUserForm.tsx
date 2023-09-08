import { React, useState } from 'react'
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
  Typography,
  type SelectChangeEvent
} from '@mui/material'
import { useUser } from '../../hooks/useUser'
import ImageUploader from '../Images/ImageUploader'

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
      const token = user.token
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
        const errorResponse: ErrorResponse = error.response.data
        setFormErrors(errorResponse.error)
      }
    }
  }

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

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
        sx={{}}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          display={isModalOpen ? 'block' : 'none'}
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
            Create a new user
          </Typography>

          <span>
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
            sx={{ mt: 2, mb: 1.5 }}
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
            sx={{ mt: 2, mb: 1.5 }}
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
            sx={{ mt: 2, mb: 1.5 }}
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
            sx={{ mt: 2, mb: 1.5 }}
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
            sx={{ mt: 2, mb: 1.5 }}
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
            sx={{
              mt: 1.5,
              mb: 3,
              backgroundColor: '#277c27fb',
              '&:hover': {
                backgroundColor: '#277c27cf'
              }
            }}
            variant="contained"
          >
            Create User
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}
