import { Box, Container, Typography } from '@mui/material';
import ImageUploader from '../Images/ImageUploader';
import '../../App.css';
import { useEffect, useState } from 'react';
import { useHaccp } from '../../hooks/useHaccp';

const AddPicture = () => {
  const { setRecipeData, setPicture, picture } = useHaccp();
  const handleImageSelect = (imageUrl) => {
    // setPicture(imageUrl);
    console.log('ImageUrl AddPicture:', imageUrl);
  };

  useEffect(() => {
    setRecipeData((prevRecipeData) => ({
      ...prevRecipeData,
      imageUrl: picture,
    }));
  }, [picture]);

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
        <ImageUploader onImageSelect={handleImageSelect} imageUrl={picture} />
      </Box>
    </Container>
  );
};

export default AddPicture;
