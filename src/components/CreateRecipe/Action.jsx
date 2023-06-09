import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useHaccp } from '../../hooks/useHaccp';
import axios from 'axios';

const ingredientsStatus = {
  Defrosting: 'frozen',
  'Chilled storage': 'chilled',
  'Frozen storage': 'frozen',
  'Dry goods storage': 'dry',
};

export default function BasicSelect() {
  const {
    action,
    setAction,
    valuePrepreparation,
    valuePreparation,
    setPrePreparation,
  } = useHaccp();
  const previousValues = [valuePrepreparation, valuePreparation];
  const handleChange = async (event) => {
    const userLocal = JSON.parse(window.localStorage.getItem('user'));
    setAction(event.target.value);
    const data = await axios.get(
      `http://localhost:3000/haccp?ingredientsStatus=${ingredientsStatus[valuePrepreparation]}`,
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
    <Box
      sx={{
        minWidth: 120,
        backgroundColor: '#03e003',
        borderBottom: '1px solid blue',
        width: '350px',
        padding: '10px',
        color: 'white',
        fontSize: '20px',
      }}
    >
      <h3>Choose the actions</h3>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">What you'll do?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={action}
          label="What you'll do?"
          onChange={handleChange}
          sx={{ backgroundColor: 'white' }}
        >
          <MenuItem value={'use'}>Use</MenuItem>
          <MenuItem value={'keep'}>Keep</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
