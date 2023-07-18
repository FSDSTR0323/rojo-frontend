import { Box, Container, Typography, useScrollTrigger } from '@mui/material';
import ImageUploader from '../Images/ImageUploader';
import '../../App.css';
import { useState } from 'react';

const AddPicture = () => {
  const [picture, setPicture] = useState('');
  const handleImageSelect = (imageUrl) => {
    setPicture(imageUrl);
  };
  console.log('Set picture:', picture);
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
        <ImageUploader onImageSelect={handleImageSelect} imageUrl={null} />
      </Box>
    </Container>
  );
};

export default AddPicture;
