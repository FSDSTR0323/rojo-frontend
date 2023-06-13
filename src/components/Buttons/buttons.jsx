import React, { useState } from 'react';
import { Button, Select, MenuItem, TextField, Box, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { Add, Search } from '@mui/icons-material';

const Buttons = ({ toggleAddUserModalHandler, filterHandler, handleFilterChange, filterValue }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, paddingLeft: '3%', paddingRight: '3%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={toggleAddUserModalHandler}
          variant="outlined"
          startIcon={<Add />}
          sx={{ textTransform: 'none', mr: 2 }}
        >
          Añadir Usuario
        </Button>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="select-rol-label" sx={{ fontSize: '14px', alignItems: 'center' }}>Selecciona Rol</InputLabel>
          <Select
            labelId="select-rol-label"
            id="select-rol"
            value={filterValue}
            onChange={handleFilterChange}
            sx={{
              ml: 2,
              '& .MuiSelect-select': {
                height: 'auto',
                padding: '8px',
              },
            }}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="user">Usuario</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Buscar"
          variant="outlined"
          size="small"
          sx={{ borderRadius: '20px', width: '500px' }}
          InputProps={{
            endAdornment: <Search sx={{ color: 'grey.500', cursor: 'pointer' }} />,
          }}
        />
      </Box>
    </Box>
  );
};


export default Buttons;
