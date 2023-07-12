import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import {
  HOME,
  LOGIN,
  REGISTER,
  RECIPES,
  DASHBOARD,
  USERS,
} from '../../../config/routes';
import { useUser } from '../../../hooks/useUser';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { PERMISSIONS_CONFIG } from '../../../config/routes';
import NavLinks from './NavLinks/NavLinks';
import UserPanel from './UserPanel/UserPanel';

const Header = () => {
  const { user, setUser } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const privatePages = [DASHBOARD, RECIPES, USERS];
  const publicPages = [REGISTER, LOGIN];

  const permissions = user.info?.permissions;

  const allowedPages = (pages) => {
    return pages.filter((page) => {
      return permissions.includes(PERMISSIONS_CONFIG[page]);
    });
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser({});
    navigate(HOME);
  };

  const styles = {
    navLinksContainer: {
      display: 'flex',
      gap: '0.75em',
    },
    appBar: {
      marginBottom: 4,
      backgroundColor: '#1c5a1c',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    userButtons: {
      color: 'white',
      my: 2,
      borderRadius: '4px',
      ':hover': {
        backgroundColor: '#277527',
      },
    },
  };

  //TODO: Function to get the proper default URL depending on user's permissions
  const getByDefaultLink = () => {
    return DASHBOARD;
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolbar}>
          <Link to={user.isLoggedIn ? getByDefaultLink() : HOME}>
            <Logo />
          </Link>
          <Box sx={styles.navLinksContainer}>
            {user.isLoggedIn ? (
              <NavLinks
                pages={allowedPages(privatePages)}
                activePage={pathname}
                buttonStyles={styles.userButtons}
              />
            ) : (
              <NavLinks pages={publicPages} activePage={pathname} />
            )}
            {user.isLoggedIn && (
              <UserPanel
                nickname={user.info?.nickname}
                profileImageUrl={user.info?.profileImageUrl}
                buttonStyles={styles.userButtons}
                handleLogout={handleLogout}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
