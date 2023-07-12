import { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
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
      <Toolbar sx={{ width: '500px', maxHeight: '40px' }}>
        <form onSubmit={handleSearchSubmit}

        >
          <InputBase
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            
            
          />
          <IconButton type="submit" sx={{ alignItems: 'center', justifyContent: 'flex-end'}}>
            <SearchIcon />
          </IconButton>
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
