import React from 'react';

const ContinueStageSelector = () => {
  return (
    <>
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
    </>
  );
};

export default ContinueStageSelector;
