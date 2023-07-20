import * as React from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../../hooks/useHaccp';
import CardRecipe from '../CardRecipe';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

const ingredientsStatus = {
  Defrosting: 'frozen',
  'Chilled storage': 'chilled',
  'Frozen storage': 'frozen',
  'Dry goods storage': 'dry',
};

export default function PrePreparation() {
  const { prePreparation, valuePrepreparation } = useHaccp();

  useEffect(() => {}, [valuePrepreparation, prePreparation]);

  return (
    <Box>
      <Typography sx={{ color: '#277527' }}>
        <h3>
          <strong>Pre-Preparation</strong>
        </h3>
      </Typography>
      <hr />

      {prePreparation.length > 0 ? (
        <>
          {prePreparation
            .filter((haccp) => valuePrepreparation.includes(haccp.name))
            .map((haccp, index) => {
              return <CardRecipe key={index} haccp={haccp} />;
            })}
        </>
      ) : null}
    </Box>
  );
}
