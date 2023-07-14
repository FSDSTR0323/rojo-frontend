import * as React from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../hooks/useHaccp';
import CardRecipe from './CardRecipe';

export default function Finishing() {
  const { prePreparation, finalization, action } = useHaccp();
  return (
    <Box>
      <h3>Finalization</h3>
      <ul style={{ padding: 0 }}>
        {prePreparation.length > 0 ? (
          <>
            {prePreparation
              .filter(
                (el) =>
                  el.action[action].includes(finalization) &&
                  el.step == 'Finalization'
              )
              .map((haccp, index) => {
                return <CardRecipe key={index} haccp={haccp} />;
              })}
          </>
        ) : null}
      </ul>
    </Box>
  );
}
