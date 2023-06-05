import { 
    Box, 
    Button, 
    Container, 
    Grid, 
    TextField 
} from '@mui/material';
import React from 'react';
import axios from 'axios'

type LoginType = {
    nickname: String;
    password: String;
}

export const LoginForm = () => {
    const [loginData, setLoginData] = React.useState<LoginType>({
        nickname: "",
        password: ""
    })

    const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const [formErrors, setFormErrors] = React.useState<any>({})

    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(loginData)
        try {
            const response = await axios.post('http://localhost:3000/user/login', loginData)
        } catch (error){
            setFormErrors({});
            console.log('login error: ', error)
            if (error.response && error.response.data && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
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
                sx={{ minHeight: "100vh" }}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField 
                        name="nickname"
                        margin="normal"
                        type="text"
                        fullWidth 
                        label="User name" 
                        sx={{ mt: 2, mb: 1.5 }} 
                        required
                        onChange={dataLogin}
                    />
                    <TextField 
                        name="password"
                        margin="normal" 
                        type="password"
                        fullWidth 
                        label="Password" 
                        sx={{ mt: 1.5, mb: 1.5 }}  
                        required
                        onChange={dataLogin}
                    />
                    <Button 
                        fullWidth 
                        type='submit'
                        sx={{ mt: 1.5, mb: 3 }}
                        variant='contained'
                        >
                            Login
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
  };