import { Box, Container } from '@mui/material';

const AddPicture = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <h3>Picture upload</h3>

      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{ width: '200px', height: '200px', backgroundColor: 'green' }}
        ></Box>
        <Box
          sx={{ width: '150px', height: '150px', backgroundColor: 'white' }}
        ></Box>
      </Box>
    </Container>
  );
};

export default AddPicture;
