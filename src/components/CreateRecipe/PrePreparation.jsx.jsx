import * as React from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../hooks/useHaccp';
import CardRecipe from './CardRecipe';

const ingredientsStatus = {
  Defrosting: 'frozen',
  'Chilled storage': 'chilled',
  'Frozen storage': 'frozen',
  'Dry goods storage': 'dry',
};

export default function PrePreparation() {
  const { prePreparation, valuePrepreparation } = useHaccp();
  console.log('prePreaparation', prePreparation);
  return (
    <Box>
      <h3 style={{ marginTop: '10px' }}>Pre-Preparation</h3>
      <ul style={{ padding: 0 }}>
        {prePreparation.length > 0 ? (
          <>
            {prePreparation
              .filter((el) => el.name == valuePrepreparation)
              .map((haccp, index) => {
                return <CardRecipe key={index} haccp={haccp} />;
              })}
          </>
        ) : null}
      </ul>
    </Box>
  );
}
