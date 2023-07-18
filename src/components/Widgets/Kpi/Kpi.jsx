import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Kpi = ({ title, data }) => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#d6d6d6',
    padding: '0.5em 1.5em',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    borderRadius: '10px',
    textAlign: 'center',
    overflow: 'hidden',
    '.title': {
      fontSize: { xs: '1em', s: '1.25em', md: '1.5em' },
    },
    '.data': {
      fontSize: '3.5em',
    },
  };

  return (
    <Box sx={styles}>
      <Typography className="title">{title}</Typography>
      <Typography className="data">{data}</Typography>
    </Box>
  );
};
