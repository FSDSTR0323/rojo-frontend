import * as React from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../hooks/useHaccp';

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
      <ul>
        {prePreparation.length > 0 ? (
          <>
            {prePreparation
              .filter((el) => el.name == valuePrepreparation)
              .map((haccp, index) => {
                return (
                  <li key={index}>
                    <strong>Name: </strong>
                    {haccp?.name},
                    <hr />
                    <strong>Control: </strong>
                    {haccp?.control}
                    <hr />
                    <strong>Procedure: </strong>
                    {haccp?.procedure}
                    <hr />
                    <strong>Frequency: </strong>
                    {haccp?.frequency}
                    <hr />
                    <strong>Critical limits: </strong>
                    {haccp?.limits}
                    <hr />
                    <strong>Corrective actions: </strong>
                    {haccp?.correctiveActions}
                  </li>
                );
              })}
          </>
        ) : null}
      </ul>
    </Box>
  );
}
