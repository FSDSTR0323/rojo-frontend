import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import {
  DASHBOARD,
  LOGIN,
  REGISTER,
  USERADMIN,
  RECIPES,
  HOME,
} from '../../../config/routes';
import { useUser } from '../../../hooks/useUser';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useState } from 'react';

const dropdownSettings = ['Logout'];

const styles = {
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
    display: 'block',
    my: 2,
  },
  userInfo: {
    marginRight: '10px',
    color: 'white',
  },
  avatarButton: {
    p: 0,
  },
};

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPage = pathname === LOGIN;
  const isRegisterPage = pathname === REGISTER;
  const isInDashboard = pathname === DASHBOARD;
  const isInUsersAdmin = pathname === USERADMIN;
  const isInRecipes = pathname === RECIPES;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    navigate('./');
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('user');
    setUser({});
    navigate(HOME);
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolbar}>
          <Logo />
          {user.isLoggedIn && (
            <Box style={{ display: 'flex' }}>
              {!isInDashboard && (
                <Button component={Link} to={DASHBOARD} sx={styles.userButtons}>
                  Dashboard
                </Button>
              )}
              {!isInUsersAdmin && (
                <Button
                  onClick={() => navigate(USERADMIN)}
                  sx={styles.userButtons}
                >
                  Users
                </Button>
              )}
              {!isInRecipes && (
                <Button
                  onClick={() => navigate(RECIPES)}
                  sx={styles.userButtons}
                >
                  Recipes
                </Button>
              )}
              <Button
                onClick={handleLogOut}
                style={{
                  ...styles.userButtons,
                  borderRight: 'solid 1px white',
                }}
              >
                <span>Logout</span>
              </Button>
              <Button>
                <p style={styles.userInfo}>Hi, {user?.info?.nickname} </p>
              </Button>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={styles.avatarButton}
                >
                  <Avatar
                    alt="Profile Picture"
                    src={user.info.profileImageUrl}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {dropdownSettings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    sx={styles.menuItem}
                  >
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {!user.isLoggedIn && (
            <Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={LOGIN}
                    sx={styles.menuItem}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={REGISTER}
                    sx={styles.menuItem}
                  >
                    Register
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {!isRegisterPage && (
                  <Button
                    onClick={() => navigate(REGISTER)}
                    sx={{ ...styles.userButtons, display: 'block' }}
                  >
                    register
                  </Button>
                )}
                {!isLoginPage && (
                  <Button
                    onClick={() => navigate(LOGIN)}
                    sx={{ ...styles.userButtons, display: 'block' }}
                  >
                    login
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
