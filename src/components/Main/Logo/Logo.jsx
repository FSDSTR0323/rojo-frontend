import { Box } from '@mui/material';
import logo from '../../../assets/Logo.png';

const styles = {
  maxHeight: { xs: '5em' },
  padding: '0.5em',
  borderRadius: '1em',
  marginTop: '2px',
  width: '4em',
};

const Logo = () => {
  return (
    <Box component="img" alt="Food Informer Logo" sx={styles} src={logo} />
  );
};

export default Logo;
