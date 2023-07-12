import { Container, Typography } from '@mui/material';
import { OwnerForm } from '../components/SignUp/OwnerForm';

export const Register = () => {
  const styles = {
    '> h1': {
      fontSize: '3em',
      marginBottom: '0.5em',
    },
    '> p': {
      marginBottom: '2em',
    },
  };

  return (
    <>
      <Container maxWidth="xl" sx={styles}>
        <Typography variant="h1">Register</Typography>
        <Typography variant="body1">
          Fill in your data to create your account
        </Typography>
        <OwnerForm />
      </Container>
    </>
  );
};
