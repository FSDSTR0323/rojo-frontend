import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Title from '../components/CreateRecipe/Title';
import Index from '../components/CreateRecipe/Index';
import IndexTextField from '../components/CreateRecipe/IndexTextField';
import SaveButton from '../components/CreateRecipe/SaveButton';

const CreateRecipe = () => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
    console.log(name, value);
  };

  return (
    <Container>
      <Typography>
        <h1 style={{ color: '#1c5a1c' }}>Add new recipe</h1>
      </Typography>
      <Title fn={onChange} name={'name'} />
      <Grid
        container
        direction="row"
        alignItems="start"
        justifyContent="start"
        spacing={24}
      >
        <Index />

        <IndexTextField />
      </Grid>
      <SaveButton />
    </Container>
  );
};

export default CreateRecipe;
