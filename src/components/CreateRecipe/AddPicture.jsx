import { Box, Container, Typography } from '@mui/material';

const AddPicture = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ color: '#1c5a1c' }}>
        <h3>Picture upload</h3>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box
          sx={{ width: '200px', height: '200px', backgroundColor: '#1c5a1c' }}
        ></Box>
        <Box
          sx={{ width: '150px', height: '150px', backgroundColor: 'white' }}
        ></Box>
      </Box>
    </Container>
  );
};

export default AddPicture;
