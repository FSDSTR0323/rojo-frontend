import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useUser } from '../hooks/useUser';
import { ValidateForm } from '../components/Recipe/ValidateForm';

export const Recipe = () => {
  const { user } = useUser();
  const [Recipe, setRecipe] = useState([]);
  const params = useParams();

  const [selectedValidation, setSelectedValidation] = useState(true);

  const [isValidationMode, setIsValidationMode] = useState(false); // Enables validation mode

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/recipe/${params.recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      //console.log(response.data);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const enableValidationMode = () => {
    setIsValidationMode(true);
  };

  const disableValidationMode = () => {
    setIsValidationMode(false);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <Container>
      <Grid
        container
        direction="row"
        alignItems="start"
        justifyContent="start"
        spacing={24}
      >
        <Grid item xs={5}>
          <Box
            component="img"
            src={Recipe?.imageUrl}
            srcSet={Recipe?.imageUrl}
            alt="Create New Recipe"
            loading="lazy"
            sx={{
              width: '100%',
              borderRadius: '5px',
            }}
          />
          <Button
            sx={{ mt: 1.5, mb: 3, width: '100%', backgroundColor: '#277c27fb' }}
            variant="contained"
            name="goValidate"
            onClick={enableValidationMode}
          >
            Validate Recipe
          </Button>
          {isValidationMode && (
            <Box>
              <Box
                sx={{
                  mb: 3,
                  width: '100%',
                }}
              >
                <Typography>User who validates</Typography>
                <hr />
                <Typography>{user.info.nickname}</Typography>
              </Box>

              <Box
                sx={{
                  mb: 3,
                  width: '100%',
                }}
              >
                <Typography>Date of validation</Typography>
                <hr />
                <Typography>{Date()}</Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={7} paddingLeft="30px !important">
          <Typography
            sx={{
              backgroundColor: 'green',
              color: 'white',
              fontSize: '24px',
              borderRadius: '5px',
            }}
          >
            {Recipe?.name}
          </Typography>

          {selectedValidation && (
            <ValidateForm
              selectedValidation={Recipe.haccps}
              recipeId={Recipe._id}
              recipeName={Recipe.name}
              isValidationMode={isValidationMode}
              setIsValidationMode={disableValidationMode}
            />
          )}

          {/* {isValidationMode && (
            <>
              <Button
                sx={{
                  mt: 1.5,
                  mb: 1,
                  backgroundColor: '#DC143C',
                  width: '100%',
                }}
                variant="contained"
                name="cancel"
                onClick={disableValidationMode}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                sx={{ mt: 1.5, mb: 3, width: '100%' }}
                variant="contained"
              >
                Validate Recipe
              </Button>
            </>
          )} */}
        </Grid>
      </Grid>
    </Container>
  );
};
