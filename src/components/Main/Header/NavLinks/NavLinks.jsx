import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const NavLinks = ({ pages, activePage, buttonStyles }) => {
  const navigate = useNavigate();

  const styles = {
    ...buttonStyles,
    selectedLink: {
      backgroundColor: '#277527',
      fontWeight: 'bolder',
    },
  };

  return (
    <>
      {pages.map((page, index) => (
        <MenuItem
          key={index}
          onClick={() => navigate(page)}
          sx={
            activePage === page
              ? { ...styles.userButtons, ...styles.selectedLink }
              : styles.userButtons
          }
        >
          <Typography>{page.slice(1).toUpperCase()}</Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default NavLinks;
