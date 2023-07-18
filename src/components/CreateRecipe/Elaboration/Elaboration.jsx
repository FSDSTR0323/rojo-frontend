import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../../hooks/useHaccp';
import CardRecipe from '../CardRecipe';
import { Typography } from '@mui/material';

export default function Elabroration() {
  const { prePreparation, valuePreparation } = useHaccp();
  useEffect(() => {}, [prePreparation]);
  return (
    <Box>
      <Typography>Preparation</Typography>
      <hr />
      {prePreparation.length > 0 ? (
        <>
          {prePreparation
            .filter((el) => valuePreparation.includes(el.name))
            .map((haccp, index) => {
              return <CardRecipe key={index} haccp={haccp} />;
            })}
        </>
      ) : null}
    </Box>
  );
}
