import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material'
import React from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL

type RegisterType = {
  firstName: string
  lastName: string
  email: string
  phone: string
  customerName: string
  customerAddress: string
  cp: string
  city: string
  province: string
  customerCif: string
  iban: string
  nickname: string
  password: string
  role: string
}

export const OwnerForm = () => {
  const [registerData, setRegisterData] = React.useState<RegisterType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    customerName: '',
    customerAddress: '',
    cp: '',
    city: '',
    province: '',
    customerCif: '',
    iban: '',
    nickname: '',
    password: '',
    role: 'owner'
  })

  const styles = {
    '> h2': {
      fontSize: '2em'
    }
  }

  const dataRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const [formErrors, setFormErrors] = React.useState<any>({})

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(baseUrl + 'user/register', registerData)
    } catch (error) {
      console.error(error)
      setFormErrors({})
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors)
      }
    }
  }

  return (
    <Container maxWidth="xl" sx={{ padding: '0px !important' }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box component="form" onSubmit={handleSubmit} sx={styles}>
          <Typography variant="h2">Tax data</Typography>
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
            label="Last Name"
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
            required
            error={!!formErrors.email}
            helperText={formErrors.email}
            onChange={dataRegister}
          />
          <TextField
            name="phone"
            margin="normal"
            type="text"
            fullWidth
            label="Phone Number"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataRegister}
          />
          <TextField
            name="customerName"
            margin="normal"
            type="text"
            fullWidth
            label="Restaurant Name"
            sx={{ mt: 2, mb: 1.5 }}
            required
            error={!!formErrors.customerName}
            helperText={formErrors.customerName}
            onChange={dataRegister}
          />
          <TextField
            name="customerAddress"
            margin="normal"
            type="text"
            fullWidth
            label="Complete Address"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataRegister}
          />
          <TextField
            name="cp"
            margin="normal"
            type="text"
            fullWidth
            label="Postal Code"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataRegister}
          />
          <TextField
            name="city"
            margin="normal"
            type="text"
            fullWidth
            label="City"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataRegister}
          />
          <TextField
            name="province"
            margin="normal"
            type="text"
            fullWidth
            label="Province"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataRegister}
          />
          <TextField
            name="customerCif"
            margin="normal"
            type="text"
            fullWidth
            label="CIF"
            sx={{ mt: 2, mb: 1.5 }}
            required
            error={!!formErrors.customerCif}
            helperText={formErrors.customerCif}
            onChange={dataRegister}
          />
          <TextField
            name="iban"
            margin="normal"
            type="text"
            fullWidth
            label="IBAN"
            sx={{ mt: 2, mb: 1.5 }}
            required
            onChange={dataRegister}
          />
          <Typography variant="h2" sx={{ mt: '1em' }}>
            User Data
          </Typography>
          <TextField
            name="nickname"
            margin="normal"
            type="text"
            fullWidth
            label="Username"
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
          <Button
            fullWidth
            type="submit"
            sx={{ mt: '1.5em', mb: 3 }}
            variant="contained"
          >
            Register
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}
