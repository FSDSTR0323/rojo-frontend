import { Container, Grid, Box, TextField, Button } from '@mui/material';
import React from 'react';

type RegisterType={
    firstName: String;
    lastName: String;
    email:  String;
    phone: String;
    address: String;
    cp: String;
    city: String;
    province: String;
    iban: String;
    userName: String;
    password: String;
}

export const OwnerForm = () => {

    const [registerData, setRegisterData]=React.useState<RegisterType>({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        address:"",
        cp:"",
        city:"",
        province:"",
        iban:"",
        userName:"",
        password:"",
    })
    
    const dataRegister = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData ({...registerData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        
    }

    return (
        <Container maxWidth="xl" >
            <Grid 
            
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{}}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <h2> Indicanos tus datos fiscales </h2>
                    <TextField 
                        name="firstName"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Nombre"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />

                    <TextField 
                        name="lastName"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Apellidos"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <TextField 
                        name="email"
                        margin="normal"
                        type="email"
                        fullWidth
                        label="Email"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <TextField 
                        name="phone"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Teléfono"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <TextField 
                        name="address"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Dirección completa"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <TextField 
                        name="cp"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="C.P."
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <TextField 
                        name="city"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Población"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <TextField 
                        name="province"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Provincia"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <TextField 
                        name="iban"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="IBAN"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    /> 
                    <h2> Datos de usuario </h2>
                    <TextField 
                        name="userName"
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Nombre de usuario"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <TextField 
                        name="password"
                        margin="normal"
                        type="password"
                        fullWidth
                        label="Password"
                        sx={{ mt:2, mb:1.5 }}
                        required
                        onChange={dataRegister}
                    />
                    <Button 
                        fullWidth
                        type="submit"
                        sx={{ mt:1.5, mb:3 }}
                        variant="contained"
                        >
                        Login
                    </Button>             
                </Box>
            </Grid>
        </Container>
    )
}



/* 
export class OwnerForm extends Component {
    state = {
        step: 1,
        firstName:'',
        lastName:'',
        email:'',
        telephone: '',
        fullAdress:'',
        cp:'',
        city:'',
        province:'',
        iban:''
            } 

// Next step //
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

// Go back to previous step //
prevStep = () => {
    const { step } = this.state;
    this.setState({
        step: step - 1
        });
    }

// Handle fields change //
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

// Depending on which step we're on, this will decide which component we want to display //
  render() {
const { step } = this.state;
const { firstName, lastName, email, telephone, fullAdress, cp, city, province, iban } = this.state;
const values = { firstName, lastName, email, telephone, fullAdress, cp, city, province, iban }
    
switch(step){
    case 1:
        return (
        <FormOwnerDetails 
        nextStep={this.nextStep}
        handleChange={this.handleChange}
        values={values}
        />
        );
    case 2:
        return (
            <FormOwnerDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            />
            );
    case 3:
        return (
            <FormOwnerConfirmation 
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            />
            );
    case 4:
        return <Success/>
    }
  }
}

export default OwnerForm*/