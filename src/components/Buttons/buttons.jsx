import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import SelectRoles from './SelectRoles';

const Buttons = ({
  toggleAddUserModalHandler,
  filterHandler,
  handleFilterRoleChange,
  filterValue,
  filterRole,
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
          <SelectRoles value={filterRole} onChange={handleFilterRoleChange} />
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
                  <Search sx={{ color: 'grey.500' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={filterHandler}
          variant="outlined"
          startIcon={<Search />}
          sx={{ textTransform: 'none', ml: 2 }}
        >
          Filtrar
        </Button>
      </Box>
    </Box>
  );
};

export default Buttons;








