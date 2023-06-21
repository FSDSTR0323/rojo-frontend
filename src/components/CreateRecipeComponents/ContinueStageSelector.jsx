import React from 'react';

const ContinueStageSelector = () => {
  return (
    <>
      {/* This box contains the Preparation list */}
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
        >
          <FormControlLabel value="Fresh" control={<Radio />} label="Fresh" />
          <FormControlLabel value="Use" control={<Radio />} label="Use" />
          <FormControlLabel value="Keep" control={<Radio />} label="Keep" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default ContinueStageSelector;
