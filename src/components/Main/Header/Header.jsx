import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { HOME } from '../../../config/routes';
import { useUser } from '../../../hooks/useUser';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import {
  PERMISSIONS_CONFIG,
  PUBLIC_PAGES,
  PRIVATE_PAGES,
} from '../../../config/routes';
import NavLinks from './NavLinks/NavLinks';
import UserPanel from './UserPanel/UserPanel';

const Header = () => {
  const { user, setUser } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
      my: 2,
      borderRadius: '8px',
      ':hover': {
        backgroundColor: '#277527',
      },
    },
  };

  return (
      <AppBar position="static" sx={styles.appBar}>
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={styles.toolbar}>
            <Link to={user.isLoggedIn ? allowedPages(PRIVATE_PAGES)[0] : HOME}>
              <Logo />
            </Link>
            <Box sx={styles.navLinksContainer}>
              {user.isLoggedIn ? (
                <NavLinks
                  pages={allowedPages(PRIVATE_PAGES)}
                  activePage={pathname}
                  buttonStyles={styles.userButtons}
                />
              ) : (
                <NavLinks
                  pages={PUBLIC_PAGES}
                  activePage={pathname}
                  buttonStyles={styles.userButtons}
                />
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
