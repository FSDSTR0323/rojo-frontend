import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../../hooks/useHaccp';
import CardRecipe from '../CardRecipe';
import { Typography } from '@mui/material';

export default function Finishing() {
  const { recipeHaccp, finalization, action } = useHaccp();
  // useEffect(() => {}, [recipeHaccp]);
  console.log('la finalizacion es:', finalization);
  return (
    <Box>
      <Typography>Finishing</Typography>
      <hr />
      {recipeHaccp.length > 0 ? (
        <>
          {recipeHaccp
            .filter(
              (el) =>
                finalization.map((finalName) =>
                  el.action[action].includes(finalName)
                ) && el.step == 'Finalization'
            )
            .map((haccp, index) => {
              return <CardRecipe key={index} haccp={haccp} />;
            })}
        </>
      ) : null}
    </Box>
  );
}
