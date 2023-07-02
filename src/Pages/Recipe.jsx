import { useParams } from 'react-router-dom';

export const Recipe = () => {
  const { recipeId } = useParams();

  return (
    <>
      <h1>Hola recipe: {recipeId}</h1>
    </>
  );
};
