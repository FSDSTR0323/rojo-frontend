import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import {
  DASHBOARD,
  HOME,
  LOGIN,
  RECIPES,
  REGISTER,
  USERADMIN,
} from '../../config/routes';
import {
  AlignHorizontalCenter,
  AlignVerticalCenter,
  Login,
} from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { colors } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';

const pages = ['Register', 'Login'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, setUser } = useUser();
  console.log(user);

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
    Navigate('./');
  };

  const handleLogOut = (removeInfo, goHome) => {
    window.localStorage.removeItem('user');
    setUser({
      isLoggedIn: false,
      info: { role: 'guest' },
    });
    navigate(HOME);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPage = pathname == LOGIN;
  const isRegisterPage = pathname == REGISTER;
  const isInDashboard = pathname == DASHBOARD;
  const isInUsersAdmin = pathname == USERADMIN;
  const isInRecipes = pathname == RECIPES;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <Logo />
            <h1>Food Informer</h1>
          </div>
          <div>
            {user.isLoggedIn ? null : (
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
                  <Link to={LOGIN}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </Link>
                  <Link to={REGISTER}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Register</Typography>
                    </MenuItem>
                  </Link>
                </Menu>
              </Box>
            )}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            {user.isLoggedIn ? null : (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {isRegisterPage ? null : (
                  <Button
                    onClick={() => navigate(REGISTER)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {'register'}
                  </Button>
                )}
                {isLoginPage ? null : (
                  <Button
                    onClick={() => navigate(LOGIN)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {'login'}
                  </Button>
                )}
              </Box>
            )}
            {user.isLoggedIn ? (
              <Box style={{ display: 'flex' }} sx={{ flexGrow: 0 }}>
                {isInDashboard ? null : (
                  <Button>
                    <Link
                      to={DASHBOARD}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Dashboard
                    </Link>
                  </Button>
                )}
                {isInUsersAdmin ? null : (
                  <Button
                    onClick={() => navigate(USERADMIN)}
                    style={{ color: 'white' }}
                  >
                    Usuarios
                  </Button>
                )}
                {isInRecipes ? null : (
                  <Button
                    onClick={() => navigate(RECIPES)}
                    style={{ color: 'white' }}
                  >
                    Recetas
                  </Button>
                )}
                <Button
                  onClick={handleLogOut}
                  style={{ color: 'white', borderRight: 'solid 1px white' }}
                >
                  <span>Logout</span>
                </Button>
                <Button>
                  <p style={{ marginRight: '10px', color: 'white' }}>
                    Hola {user?.info?.nickname}{' '}
                  </p>
                </Button>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : null}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
