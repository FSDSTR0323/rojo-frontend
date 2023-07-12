import * as React from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../hooks/useHaccp';

export default function Finishing() {
  const { prePreparation, finalization } = useHaccp();
  return (
    <Box>
      <h3>Finalization</h3>
      <ul>
        {prePreparation.length > 0 ? (
          <>
            {prePreparation
              .filter((el) => el.name == finalization)
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
