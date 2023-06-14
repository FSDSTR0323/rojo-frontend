import React from 'react';
import { Select, MenuItem } from '@mui/material';

const options = ['all', 'chef', 'headchef', 'owner'];

const SelectRoles = ({ value, onChange }) => {
  return (
    <Select value={value} onChange={onChange} displayEmpty>
      <MenuItem value="" disabled>
        Selecciona un rol
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectRoles;
