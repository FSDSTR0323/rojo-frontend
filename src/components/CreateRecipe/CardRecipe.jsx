import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardRecipe({ haccp }) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <strong>Name: </strong>
          {haccp?.name},
        </Typography>

        <Typography variant="body2">
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
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
