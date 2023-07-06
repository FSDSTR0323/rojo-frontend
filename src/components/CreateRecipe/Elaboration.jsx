import * as React from 'react';
import Box from '@mui/material/Box';
import { useHaccp } from '../../hooks/useHaccp';

export default function Elabroration() {
  const { prePreparation, valuePreparation } = useHaccp();
  return (
    <Box>
      <h3>Elaboration</h3>
      <ul>
        {prePreparation.length > 0 ? (
          <>
            {prePreparation
              .filter((el) => el.name == valuePreparation)
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
