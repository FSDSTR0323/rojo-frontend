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
import './global-form-styles.css'

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL

interface RegisterType {
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
    <Container maxWidth="xl" sx={{ padding: '0px !important', marginBottom: 10 }}>
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
          className="formBox"
        >
          <Typography className="h1">
            Tax data
          </Typography>

          <TextField
            name="firstName"
            fullWidth
            type="text"
            label="Name"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <TextField
            name="lastName"
            margin="normal"
            type="text"
            label="Last Name"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <TextField
            name="email"
            margin="normal"
            type="email"
            label="Email"
            className="textFieldXL"
            required
            error={!!formErrors.email}
            helperText={formErrors.email}
            onChange={dataRegister}
          />
          <TextField
            name="phone"
            margin="normal"
            type="text"
            label="Phone Number"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <TextField
            name="customerName"
            margin="normal"
            type="text"
            label="Restaurant Name"
            className="textFieldXL"
            required
            error={!!formErrors.customerName}
            helperText={formErrors.customerName}
            onChange={dataRegister}
          />
          <TextField
            name="customerAddress"
            margin="normal"
            type="text"
            label="Complete Address"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <TextField
            name="cp"
            margin="normal"
            type="text"
            label="Postal Code"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <TextField
            name="city"
            margin="normal"
            type="text"
            label="City"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <TextField
            name="province"
            margin="normal"
            type="text"
            label="Province"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <TextField
            name="customerCif"
            margin="normal"
            type="text"
            label="CIF"
            className="textFieldXL"
            required
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            error={!!formErrors.customerCif}
            helperText={formErrors.customerCif}
            onChange={dataRegister}
          />
          <TextField
            name="iban"
            margin="normal"
            type="text"
            label="IBAN"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <Typography className="h1">
            User Data
          </Typography>
          <TextField
            name="nickname"
            margin="normal"
            type="text"
            label="Username"
            className="textFieldXL"
            required
            error={!!formErrors.nickname}
            helperText={formErrors.nickname}
            onChange={dataRegister}
          />
          <TextField
            name="password"
            margin="normal"
            type="password"
            label="Password"
            className="textFieldXL"
            required
            onChange={dataRegister}
          />
          <Button
            fullWidth
            type="submit"
            className="button"
            variant="contained"
          >
            Register
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}
