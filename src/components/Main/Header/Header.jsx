import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import {
  HOME,
  LOGIN,
  REGISTER,
  RECIPES,
  RECIPE,
  DASHBOARD,
  ADDRECIPE,
  USERS,
} from '../../../config/routes';
import { useUser } from '../../../hooks/useUser';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';

const styles = {
  navLinksContainer: {
    display: 'flex',
    gap: '5px',
  },
  appBar: {
    marginBottom: 4,
    backgroundColor: '#1c5a1c',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    textAlign: 'center',
  },
  logoButton: {
    textDecoration: 'none',
    color: 'white',
  },
  userButtons: {
    color: 'white',
    my: 2,
    borderRadius: '4px',
    ':hover': {
      backgroundColor: '#277527',
    },
  },
  userInfo: {
    marginRight: '10px',
    color: 'white',
  },
  avatarButton: {
    p: 0,
  },
  selectedLink: {
    backgroundColor: '#277527',
    fontWeight: 'bolder',
  },
  welcome: {
    borderLeft: 'solid 2px white',
    marginLeft: '2px',
    borderRadius: '0px',
  },
  clickless: {
    pointerEvents: 'none',
  },
  logoutIcon: {
    fontSize: '2em',
  },
};

const pages = [
  HOME,
  LOGIN,
  REGISTER,
  RECIPES,
  RECIPE,
  DASHBOARD,
  ADDRECIPE,
  USERS,
];

const Header = () => {
  const { user, setUser } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const permissions = user.info?.permissions;

  const notLoggedInLinks = [LOGIN, REGISTER];
  const loggedInLinks = [DASHBOARD, RECIPES, USERS];

  const handleLogOut = () => {
    window.localStorage.removeItem('user');
    setUser({});
    navigate(HOME);
  };

  //TODO: Function to get the proper default URL depending on user's permissions
  const getByDefaultLink = () => {
    return DASHBOARD;
  };

  const NavLinks = ({ links, isLoggedIn }) => {
    return (
      <Box sx={styles.navLinksContainer}>
        {links.map((link, index) => (
          <MenuItem
            key={index}
            onClick={() => navigate(link)}
            sx={
              pathname === link
                ? { ...styles.userButtons, ...styles.selectedLink }
                : styles.userButtons
            }
          >
            <Typography>{link.slice(1).toUpperCase()}</Typography>
          </MenuItem>
        ))}
        {isLoggedIn && (
          <>
            <MenuItem sx={{ ...styles.clickless, ...styles.welcome }}>
              <Typography sx={{ ...styles.userInfo }}>
                Hi, {user?.info?.nickname}
              </Typography>
            </MenuItem>
            <IconButton sx={{ ...styles.avatarButton, ...styles.clickless }}>
              <Avatar alt="Profile Picture" src={user.info.profileImageUrl} />
            </IconButton>
            <MenuItem
              onClick={handleLogOut}
              sx={{
                ...styles.userButtons,
              }}
            >
              <LogoutIcon sx={styles.logoutIcon} />
            </MenuItem>
          </>
        )}
      </Box>
    );
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolbar}>
          <Link to={user.isLoggedIn ? getByDefaultLink() : HOME}>
            <Logo />
          </Link>
          {user.isLoggedIn && (
            <NavLinks links={loggedInLinks} isLoggedIn={user.isLoggedIn} />
          )}
          {!user.isLoggedIn && (
            <NavLinks links={notLoggedInLinks} isLoggedIn={user.isLoggedIn} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
