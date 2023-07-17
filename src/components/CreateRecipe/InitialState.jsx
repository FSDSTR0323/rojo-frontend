import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useHaccp } from '../../hooks/useHaccp';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const names = [
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, initialStateName, theme) {
  return {
    fontWeight:
      initialStateName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function InitialState() {
  const theme = useTheme();
  const [initialStateName, setInitialStateName] = React.useState([]);
  useEffect(() => {
    const status = initialStateName.map((name) => ingredientsStatus[name]);
    console.log('Initial State status', status.join(','));
    async function fetchData() {
      const data = await axios.get(
        `http://localhost:3000/haccp?ingredientsStatus=${
          status.lenght == 1 ? status[0] : status.join(',')
        }`,
        {
          headers: {
            Authorization: `Bearer ${userLocal.token}`,
          },
        }
      );
      (',');
      console.log('Seleccion:', data.data);
      setPrePreparation(data.data);
    }
    fetchData();
  }, [initialStateName]);

  const userLocal = JSON.parse(window.localStorage.getItem('user'));
  const { setPrePreparation, setValuePrepreparation } = useHaccp();
  const handleState = async (e) => {
    console.log('initial state name:', initialStateName);
    const { value } = e.target;
    setValuePrepreparation(value);
    setInitialStateName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ mb: 2, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Initial state</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={initialStateName}
          onChange={handleState}
          input={
            <OutlinedInput id="select-multiple-chip" label="Initial state" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ backgroundColor: '#1c5a1c', color: 'white' }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, initialStateName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
