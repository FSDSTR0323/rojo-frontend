import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHaccp } from '../../hooks/useHaccp';
import axios from 'axios';

export default function PreparationButtons() {
  const {
    elaboration,
    setElaboration,
    setValuePreparation,
    valuePrepreparation,
  } = useHaccp();
  console.log('elaboration button', elaboration);
  const handleChange = (event) => {
    setElaboration(event.target.value);
    setValuePreparation(event.target.value);
  };

  const data = async () => {
    axios.get(
      `http://localhost:3000/haccp?ingredientStatus=${ingredientsStatus[valuePrepreparation]}&${preparation}`
    );
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Choose the preparation
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="Preparation"
        onChange={handleChange}
      >
        <FormControlLabel
          value="Preparation"
          control={<Radio />}
          label="Preparation"
        />
        <FormControlLabel value="Cooking" control={<Radio />} label="Cooking" />
      </RadioGroup>
    </FormControl>
  );
}
