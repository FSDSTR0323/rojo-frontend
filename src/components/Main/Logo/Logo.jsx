import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@mui/material';
import logo from '../../../assets/Logo.png';

const logoStyles = makeStyles((theme) => ({
  logo: {
    maxHeight: '5em',
    padding: '0.5em',
    borderRadius: '1em',
    marginTop: '2px',
  },
}));

const Logo = () => {
  const classes = logoStyles();
  return (
    <Box
      component="img"
      alt="Food Informer Logo"
      className={classes.logo}
      src={logo}
    />
  );
};

export default Logo;
