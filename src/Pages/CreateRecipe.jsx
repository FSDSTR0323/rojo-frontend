import React from 'react';

import { Box, Container } from '@mui/material';
import Title from '../components/CreateRecipeComponents/Title';
import Index from '../components/CreateRecipeComponents/Index';
import IndexTextField from '../components/CreateRecipeComponents/IndexTextField';
import SaveButton from '../components/CreateRecipeComponents/SaveButton';
const CreateRecipe = () => {
  return (
    <Container>
      <h1>Add new elabroration</h1>
      <Title />
      <Box sx={{ display: 'flex' }}>
        <Index />
        <Box>
          <IndexTextField />
        </Box>
      </Box>
      <SaveButton />
    </Container>
  );
};

export default CreateRecipe;
