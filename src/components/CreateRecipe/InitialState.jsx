import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { useHaccp } from '../../hooks/useHaccp';

const inputNames = [
  'Defrosting',
  'Chilled storage',
  'Frozen storage',
  'Dry goods storage',
];

const ingredientsStatus = {
  Defrosting: 'frozen',
  'Chilled storage': 'chilled',
  'Frozen storage': 'frozen',
  'Dry goods storage': 'dry',
};

export default function InitialState() {
  const userLocal = JSON.parse(window.localStorage.getItem('user'));
  const { setPrePreparation, setValuePrepreparation } = useHaccp();
  const handleState = async (e) => {
    const { value } = e.target;
    setValuePrepreparation(value);
    const status = ingredientsStatus[value];
    console.log('Initial State status', status);
    const data = await axios.get(
      `http://localhost:3000/haccp?ingredientsStatus=${status}`,
      {
        headers: {
          Authorization: `Bearer ${userLocal.token}`,
        },
      }
    );
    console.log(data.data);
    setPrePreparation(data.data);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Elaboration initial state
      </FormLabel>
      <RadioGroup
        onChange={handleState}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Select elaborations initial state"
        name="radio-buttons-group"
      >
        {inputNames.map((label, index) => {
          console.log('Initial State label', label);
          return (
            <FormControlLabel
              value={label}
              key={index}
              control={<Radio />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
