import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useHaccp } from '../../hooks/useHaccp';

export default function PrePreparation() {
  const { PrePreparation } = useHaccp();
  return (
    <Box>
      <h3 style={{ marginTop: '10px' }}>Pre-Preparation</h3>
      <ul>
        <li>{PrePreparation}</li>
      </ul>
    </Box>
  );
}
