import { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue); 
  };

  return (
    <AppBar position="static"
        variant="outlined"
        size="small"
        sx={{ 
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 1,
            width: '500px',
            maxHeight: '40px',          
            
        }}>
      <Toolbar sx={{ width: '500px', minHeight: '32px!important', padding: '0px!important', paddingTop: '4px', }}>
        <Box 
          component='form'
          sx={{ width: '100vw',
          display: 'flex',
          justifyContent: 'space-between',
          }}
          onSubmit={handleSearchSubmit}

        >
          <InputBase
            sx={{ paddingLeft: '10px',
              paddingTop: '4px',
            }}
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            
            
          />
          <IconButton type="submit" sx={{ alignItems: 'center' }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
