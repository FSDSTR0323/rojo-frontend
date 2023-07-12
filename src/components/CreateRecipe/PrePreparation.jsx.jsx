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
                    <ul>
                      {haccp?.control.map((element) => (
                        <li key={element}>{element}</li>
                      ))}
                    </ul>
                    <hr />
                    <strong>Procedure: </strong>
                    <ul>
                      {haccp?.procedure.map((element) => (
                        <li key={element}>{element}</li>
                      ))}
                    </ul>
                    <hr />
                    <strong>Frequency: </strong>
                    <ul>
                      {haccp?.frequency.map((element) => (
                        <li key={element}>{element}</li>
                      ))}
                    </ul>
                    <hr />
                    <strong>Critical limits: </strong>
                    <ul>
                      {haccp?.limits.map((element) => (
                        <li key={element}>{element}</li>
                      ))}
                    </ul>
                    <hr />
                    <strong>Corrective actions: </strong>
                    <ul>
                      {haccp?.correctiveActions.map((element) => (
                        <li key={element}>{element}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
          </>
        ) : null}
      </ul>
    </Box>
  );
}
