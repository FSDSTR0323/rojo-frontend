import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FinalState() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Final state</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="hotHolding"
          control={<Radio />}
          label="Hot holding"
        />
        <FormControlLabel
          value="coldDisplay"
          control={<Radio />}
          label="Cold display"
        />
        <FormControlLabel value="cook" control={<Radio />} label="Cook" />
        <FormControlLabel
          value="rehating"
          control={<Radio />}
          label="Reheating"
        />
      </RadioGroup>
    </FormControl>
  );
}
