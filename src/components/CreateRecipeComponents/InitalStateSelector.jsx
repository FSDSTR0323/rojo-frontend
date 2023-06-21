import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function InitialStateSelector() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
      >
        <FormControlLabel value="Fresh" control={<Radio />} label="Fresh" />
        <FormControlLabel
          value="Dry storage"
          control={<Radio />}
          label="Dry storage"
        />
        <FormControlLabel
          value="Cold storage"
          control={<Radio />}
          label="Cold storage"
        />
        <FormControlLabel
          value="Defrosting"
          control={<Radio />}
          label="Defrosting"
        />
      </RadioGroup>
    </FormControl>
  );
}
