import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

const UserPanel = ({ nickname, profileImageUrl, handleLogout }) => {
  const styles = {
    userButtons: {
      color: 'white',
      my: 2,
      borderRadius: '4px',
      ':hover': {
        backgroundColor: '#277527',
      },
    },
    avatarButton: {
      p: 0,
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
      '> *': {
        fontSize: '2em',
      },
    },
  };

  return (
    <>
      <MenuItem sx={{ ...styles.clickless, ...styles.welcome }}>
        <Typography>Hi, {nickname}</Typography>
      </MenuItem>
      <IconButton sx={{ ...styles.avatarButton, ...styles.clickless }}>
        <Avatar alt="Profile Picture" src={profileImageUrl} />
      </IconButton>
      <MenuItem
        onClick={handleLogout}
        sx={{ ...styles.userButtons, ...styles.logoutIcon }}
      >
        <LogoutIcon />
      </MenuItem>
    </>
  );
};

export default UserPanel;
