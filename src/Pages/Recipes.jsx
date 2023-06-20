import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import { ADDRECIPE } from '../config/routes';
import { Button } from '@mui/material';

export const Recipes = () => {
  const { slug } = useParams();

  return (
    <>
      <Header />
      <h1>Recipes</h1>
      <Button>
        <Link to={ADDRECIPE}>Añadir receta</Link>
      </Button>
      <p>Estas visitando la pagina de recetas</p>
      <p>El slug de la URL es: {slug}</p>
    </>
  );
};

export default Recipes;
