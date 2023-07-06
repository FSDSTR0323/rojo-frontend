import { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import { Add, Search, Sort } from '@mui/icons-material';

const Buttons = ({
  toggleAddUserModalHandler,
  filterValue,
  onSortChange,
  onFilterChange,
  onSearchChange,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
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
          Add new user
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Select
            value={filterValue}
            onChange={(event) => {
              const value = event.target.value;
              onFilterChange(value);
            }}
            displayEmpty
            sx={{ textTransform: 'none', mr: 2, maxHeight: '35px' }}
          >
            <MenuItem value="">Select a role</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
            <MenuItem value="headchef">Head Chef</MenuItem>
            <MenuItem value="chef">Chef</MenuItem>
          </Select>
        </Box>
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
                  <Search
                    sx={{ color: 'grey.500', textTransform: 'none', ml: 2 }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <IconButton onClick={onSortChange}>
          <Sort />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Buttons;
