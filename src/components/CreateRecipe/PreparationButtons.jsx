import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHaccp } from '../../hooks/useHaccp';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import PrePreparation from './PrePreparation';

export default function PreparationButtons() {
  const { elaboration, setElaboration, setValuePreparation, valuePreparation } =
    useHaccp();

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setElaboration([...elaboration, value]);
      setValuePreparation([...valuePreparation, value]);
    } else {
      setElaboration(elaboration.filter((item) => item !== value));
      setValuePreparation(valuePreparation.filter((item) => item !== value));
    }
    setElaboration(event.target.value);
    setValuePreparation(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Choose the preparation
      </FormLabel>
      <FormControlLabel
        onChange={handleChange}
        control={<Checkbox />}
        label="Cook"
        value={'Cooking'}
      />
      <FormControlLabel
        onChange={handleChange}
        control={<Checkbox />}
        label="Preparation"
        value={'Preparation'}
      />
    </FormControl>
  );
}
