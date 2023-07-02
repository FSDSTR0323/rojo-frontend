import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        backgroundColor: '#dfd',
        borderBottom: '1px solid blue',
        width: '350px',
        padding: '10px',
      }}
    >
      <h3>Choose the actions</h3>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">What you'll do?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{ backgroundColor: 'white' }}
        >
          <MenuItem value={10}>Use</MenuItem>
          <MenuItem value={20}>Keep</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
