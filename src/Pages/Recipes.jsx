import React from 'react';
import { useParams } from 'react-router-dom';

export const Recipes = () => {
  const { slug } = useParams();

  return (
    <>
      <h1>Recipes</h1>
      <p>Estas visitando la pagina de recetas</p>
      <p>El slug de la URL es: {slug}</p>
    </>
  );
};

export default Recipes;
