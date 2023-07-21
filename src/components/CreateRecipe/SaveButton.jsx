import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHaccp } from '../../hooks/useHaccp';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TransitionsModal from './Modal';
import { useNavigate } from 'react-router-dom';

export default function SaveButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    recipeData,
    recipeHaccp,
    setRecipeData,
    action,
    finalization,
    picture,
    setPrePreparation,
    setFinalization,
    setRecipeHaccp,
  } = useHaccp();

  useEffect(() => {
    const selectedHaccp = recipeHaccp.map((haccp) => haccp._id);
    setRecipeData({
      ...recipeData,
      haccps: selectedHaccp,
      action: { [action]: finalization },
      imageUrl: picture,
    });
  }, [recipeHaccp, finalization, picture]);

  // return () => {
  //   setPrePreparation([]);
  //   setFinalization([]);
  //   setRecipeHaccp([]);
  // };

  const handleCreate = async () => {
    handleOpen();
    if (recipeData.name === '') {
      setMessage('Recipe name is required');
      return;
    }
    if (recipeData.haccps.length === 0) {
      setMessage('At least one HACCP is required');
      return;
    }
    if (recipeData.action.length === 0) {
      setMessage('At least one action is required');
      return;
    }
    if (recipeData.imageUrl === '') {
      setMessage('Image is required');
      return;
    }

    try {
      const userLocal = JSON.parse(window.localStorage.getItem('user'));
      const response = await axios.post(
        'http://localhost:3000/recipe',
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${userLocal.token}`,
          },
        }
      );
      if (response.status === 201) {
        setMessage('Recipe created successfully!');
      } else {
        console.log('response.data', response);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSeeRecipes = () => {
    navigate('/recipes');
  };

  return (
    <>
      {open && (
        <TransitionsModal handleClose={handleClose} open={open}>
          <p>{message}</p>
          {message === 'Recipe created successfully!' && (
            <div style={{ display: 'flex', gap: '20px' }}>
              <Button onClick={handleSeeRecipes} variant="contained">
                See all recipes
              </Button>
              <Button onClick={handleClose} variant="contained">
                Create another recipe
              </Button>
            </div>
          )}
        </TransitionsModal>
      )}
      <Stack spacing={2} direction="row">
        <Button
          sx={{ width: '100%', m: '20px 0' }}
          onClick={handleCreate}
          variant="contained"
        >
          Save Recipe
        </Button>
      </Stack>
    </>
  );
}
