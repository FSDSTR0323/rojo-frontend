import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import { RecipeList } from '../components/RecipesList/RecipesList';
import { Typography, Button, Container } from '@mui/material';

export const Recipes = () => {
  const { slug } = useParams();

  return (
    <>
      <Container maxWidth="lx">
        <div>
          <Button sx={{ mt: 1.5, mb: 3 }} variant="contained">
            Filter
          </Button>
        </div>

        <div>
          <Typography sx={{ fontSize: 24 }}>Recipes</Typography>
          <hr></hr>
          <RecipeList />
        </div>
      </Container>
    </>
  );
};
