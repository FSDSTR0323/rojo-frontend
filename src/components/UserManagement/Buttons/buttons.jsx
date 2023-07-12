import {
  Button,
  Box,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import SearchBar from './SearchBar';

const Buttons = ({
  toggleAddUserModalHandler,
  filterValue,
  onSortChange,
  handleFilterChange,
  handleSearchChange,
}) => {
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
              handleFilterChange(value);
            }}
            displayEmpty
            sx={{ textTransform: 'none', mr: 2, maxHeight: '40px' }}
          >
            <MenuItem value="">Select a role</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
            <MenuItem value="headchef">Head Chef</MenuItem>
            <MenuItem value="chef">Chef</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box sx={{ textTransform: 'none', maxHeight: '40px' }}>
        <SearchBar onSearch={handleSearchChange} />
      </Box>
    </Box>
  );
};

export default Buttons;
