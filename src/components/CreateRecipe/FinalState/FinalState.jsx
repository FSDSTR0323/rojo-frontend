import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { useHaccp } from '../../../hooks/useHaccp';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';

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

function getStyles(name, finalStateName, theme) {
  return {
    fontWeight:
      finalStateName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ingredientsStatus = {
  Defrosting: 'frozen',
  'Chilled storage': 'chilled',
  'Frozen storage': 'frozen',
  'Dry goods storage': 'dry',
};

const haccp = [
  'Defrosting',
  'Chilled storage',
  'Frozen storage',
  'Dry goods storage',
  'Preparation',
  'Cooking',
];

export default function FinalState() {
  const theme = useTheme();
  const [finalStateName, setFinalStateName] = React.useState([]);
  const {
    valuePrepreparation,
    valuePreparation,
    prePreparation,
    action,
    setRecipeHaccp,
    setFinalization,
    initialStateName,
  } = useHaccp();

  console.log('valuePrepreparation', valuePrepreparation);

  const [finalState, setFinalState] = useState([]);

  useEffect(() => {
    setFinalState(finalStateFilter());
  }, [
    valuePrepreparation,
    valuePreparation,
    action,
    prePreparation,
    finalStateName,
  ]);

  useEffect(() => {
    setFinalStateName([]);
  }, [action]);

  function finalStateFilter() {
    const filtredNames = prePreparation
      .filter((haccp) => haccp.step === 'Finalization')
      .map((haccp) => {
        console.log('log de haccp', haccp);
        return haccp.action[action].map((option) => option);
      })
      .flat()
      .filter((element, index, arr) => arr.indexOf(element) === index);
    console.log('Log de filtred names:', filtredNames);
    return filtredNames;
  }

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    const newFinalStateName =
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value;
    setFinalStateName(newFinalStateName);
    setFinalization(finalState);
    const userLocal = JSON.parse(window.localStorage.getItem('user'));
    const status = initialStateName.map((name) => ingredientsStatus[name]);
    console.log(
      'Url finalState:',
      `http://localhost:3000/haccp?ingredientsStatus=${
        status.lenght == 1 ? status[0] : status.join(',')
      }${
        newFinalStateName !== '' ? '&' + action + '=' + newFinalStateName : null
      }`
    );
    const data = await axios.get(
      `http://localhost:3000/haccp?ingredientsStatus=${
        status.lenght == 1 ? status[0] : status.join(',')
      }${
        newFinalStateName !== '' ? '&' + action + '=' + newFinalStateName : null
      }`,
      {
        headers: {
          Authorization: `Bearer ${userLocal.token}`,
        },
      }
    );
    console.log('log de data.data, En Final State', data.data);
    setRecipeHaccp(data.data);
  };

  return (
    <>
      {finalState.length > 0 ? (
        <div>
          <FormControl sx={{ my: 1 }} fullWidth>
            <InputLabel id="demo-multiple-chip-label">Final State</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={finalStateName}
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Final State" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ color: 'white', backgroundColor: '#277527' }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {finalState.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, finalStateName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ) : null}
    </>
  );
}
