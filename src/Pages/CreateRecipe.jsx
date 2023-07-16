import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import Title from '../components/CreateRecipe/Title';
import Index from '../components/CreateRecipe/Index';
import IndexTextField from '../components/CreateRecipe/IndexTextField';
import SaveButton from '../components/CreateRecipe/SaveButton';
const CreateRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredientStatus: '',
    action: '',
    step: '',
  });

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
      <h1 style={{ color: 'blue' }}>Add new recipe</h1>
      <Title fn={onChange} name={'title'} />
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
