import { Box, Container } from '@mui/material';
import React from 'react';
import TextField from '@mui/material/TextField';

const HaccpListInput = () => {
  return (
    <>
      {/* This container have inside the list for the selected haccps steps */}
      <Container>
        {/* This box contains the Pre-preparation list */}
        <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
              width: '100%',
              height: '25%',
              backgroundColor: 'f2fff2',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{ backgroundColor: '#f2fff2', width: '1000%', height: '500px' }}
            id="standard-basic"
            label="Pre-Preelaborarions"
            variant="standard"
          />
        </Box>
        {/* This box contains the Preparation list */}
        <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
              width: '100%',
              height: '25%',
              backgroundColor: 'f2fff2',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{ backgroundColor: '#f2fff2', width: '1000%', height: '500px' }}
            id="standard-basic"
            label="Preparations"
            variant="standard"
          />
        </Box>
        {/* This box contains the Finishing list */}
        <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
              width: '100%',
              height: '25%',
              backgroundColor: 'f2fff2',
              marginLeft: '10px',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{ backgroundColor: '#f2fff2', width: '1000%', height: '500px' }}
            id="standard-basic"
            label="Finishing"
            variant="standard"
          />
        </Box>
      </Container>
    </>
  );
};

export default HaccpListInput;
