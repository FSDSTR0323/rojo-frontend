import { Box, Typography } from "@mui/material";

export const ValuePropItem = ({ content }) => {
  const styles = {
    width: '33%',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    padding: '40px 35px',
    textAlign: 'center',
    marginBottom: '2em',
    h3: {
      fontSize: '1.5em',
      marginBottom: '0.75em',
    },
  };

  return (
    <Box sx={styles}>
      <Typography variant="h3">{content.title}</Typography>
      <Typography variant="subtitle1">{content.description}</Typography>
    </Box>
  );
};