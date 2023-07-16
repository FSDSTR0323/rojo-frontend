import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Box,
  Grid,
  Typography,
} from '@mui/material';

export default function CardRecipe({ haccp }) {
  return (
    <Card sx={{ width: '100%', marginBottom: '10px', backgroundColor: '#CCC' }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <b>Name</b>
          </Typography>
          <hr />
          <Typography>{haccp?.name}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <b>Control</b>
          </Typography>
          <hr />
          {haccp?.control.map((element) => (
            <Typography key={element}>
              <li>{element}</li>
            </Typography>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <b>Procedure</b>
          </Typography>
          <hr />
          {haccp?.procedure.map((element) => (
            <Typography key={element}>
              <li>{element}</li>
            </Typography>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <b>Frequency: </b>
          </Typography>
          <hr />
          {haccp?.frequency.map((element) => (
            <Typography key={element}>
              <li>{element}</li>
            </Typography>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <b>Critical limits: </b>
          </Typography>
          <hr />
          {haccp?.limits.map((element) => (
            <Typography key={element}>
              <li>{element}</li>
            </Typography>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <b>Corrective actions: </b>
          </Typography>
          <hr />
          {haccp?.correctiveActions.map((element) => (
            <Typography key={element}>
              <li>{element}</li>
            </Typography>
          ))}
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
