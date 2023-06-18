import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { USERADMIN, RECIPES } from '../../config/routes';

export default function DashboardButtons() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={() => navigate(USERADMIN)}>Usuarios</Button>
        <Button onClick={() => navigate(RECIPES)}>Recetas</Button>
        <Button>Historial Haccp</Button>
      </ButtonGroup>
    </Box>
  );
}
