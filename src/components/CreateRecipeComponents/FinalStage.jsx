import { Container } from '@mui/material';
import React from 'react';

const FinalStage = () => {
  return (
    <Container>
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
  );
};

export default FinalStage;
