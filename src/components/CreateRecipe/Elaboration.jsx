import * as React from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../hooks/useHaccp';
import CardRecipe from './CardRecipe';

export default function Elabroration() {
  const { prePreparation, valuePreparation } = useHaccp();
  return (
    <Box>
      <h3>Elaboration</h3>
      <ul style={{ padding: 0 }}>
        {prePreparation.length > 0 ? (
          <>
            {prePreparation
              .filter((el) => el.name == valuePreparation)
              .map((haccp, index) => {
                return <CardRecipe key={index} haccp={haccp} />;
              })}
          </>
        ) : null}
      </ul>
    </Box>
  );
}
