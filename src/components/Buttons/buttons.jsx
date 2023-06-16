import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';

const Buttons = ({
  toggleAddUserModalHandler,
  filterHandler,
  handleFilterChange,
  filterValue,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2,
        paddingLeft: '3%',
        paddingRight: '3%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={toggleAddUserModalHandler}
          variant="outlined"
          startIcon={<Add />}
          sx={{ textTransform: 'none', mr: 2 }}
        >
          Añadir Usuario
        </Button>

        <FormControl variant="outlined" sx={{ minWidth: 140 }}>
          <Select
            value={filterValue}
            onChange={(event) => filterHandler(event.target.value)}
            displayEmpty
            sx={{ minWidth: '150px', marginRight: '10px' }}
          >
            <MenuItem value="">Selecciona un rol</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
            <MenuItem value="headchef">headchef</MenuItem>
            <MenuItem value="chef">chef</MenuItem>
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search sx={{ color: 'grey.500', textTransform: 'none', ml: 2 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Buttons;


