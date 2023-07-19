import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHaccp } from '../../hooks/useHaccp';
import { useEffect } from 'react';
import axios from 'axios';

export default function SaveButton() {
  const {
    recipeData,
    recipeHaccp,
    setRecipeData,
    action,
    finalization,
    picture,
  } = useHaccp();

  useEffect(() => {
    const selectedHaccp = recipeHaccp.map((haccp) => haccp._id);
    setRecipeData({
      ...recipeData,
      haccps: selectedHaccp,
      action: { [action]: finalization },
    });
  }, [recipeHaccp, finalization, picture]);

  useEffect(() => {
    const selectedHaccp = recipeHaccp.map((haccp) => haccp._id);
    setRecipeData({
      ...recipeData,
      haccps: selectedHaccp,
    });
  }, []);

  const handleCreate = async () => {
    const userLocal = JSON.parse(window.localStorage.getItem('user'));
    const response = await axios.post(
      'http://localhost:3000/recipe',
      JSON.stringify(recipeData),
      {
        headers: {
          Authorization: `Bearer ${userLocal.token}`,
        },
      }
    );
    if (response.ok) {
      alert('Recipe added');
    } else {
      console.log('response.data', response.data);
    }
  };

  console.log('recipe.data es:', recipeData);
  return (
    <Stack spacing={2} direction="row">
      <Button
        sx={{ width: '100%', m: '20px 0' }}
        onClick={handleCreate}
        variant="contained"
      >
        Save Recipe
      </Button>
    </Stack>
  );
}
