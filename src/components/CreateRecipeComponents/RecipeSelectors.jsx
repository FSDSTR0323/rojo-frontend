import { Container, Box, Button } from '@mui/material';
import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const RecipeSelectors = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      {/* This container have all the selectors to indicate the initial state of the
      recipe, final state, the acction and the upload picture of the recipe */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '20px',
          marginLeft: '5%',
          marginRight: '10px',
        }}
      >
        {/* This box contains initial product state and it selector */}
        <Box
          sx={{
            background: '#f2fff2',
            width: '300px',
            padding: '1%',
            borderBottom: 'solid 1px blue',
          }}
        >
          {/* Form control contains the multiselect intitial product state */}
          <FormControl sx={{ background: 'white', width: '90%' }}>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{
                marginLeft: '',
                fontWeight: 'bold',
                theme: 'Roboto',
                color: 'black',
              }}
            >
              How comes the elaborations?
            </FormLabel>
            <RadioGroup
              sx={{ margin: '2%' }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={null}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Fresh storage"
                control={<Radio />}
                label="Fresh storage"
              />
              <FormControlLabel
                value="Frozen storage"
                control={<Radio />}
                label="Frozen storage"
              />
              <FormControlLabel
                value="Dry storage"
                control={<Radio />}
                label="Dry storage"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        {/* This Box contains the recipe title and the preparation selector */}
        <Box
          sx={{
            background: '#f2fff2',
            width: '325px',
            borderBottom: 'solid 1px blue',
          }}
        >
          <h3 style={{ marginLeft: '10px' }}>How the recipe continues?</h3>
          {/* This box contains the recipe preparation */}
          <Box
            sx={{
              backgroundColor: 'white',
              marginLeft: '5%',
              marginBottom: '10px',
              width: '90%',
              fontWeight: 'bold',
              borderRadius: '10px',
            }}
          >
            {/* Recipe input component */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose one</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Select the next step"
                onChange={handleChange}
              >
                {/* What you will do now selectors */}
                <MenuItem value={'Preparation'}>Preparation</MenuItem>
                <MenuItem value={'Cook'}>Cook</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* This box contains the recipe final state */}
        <Box
          sx={{
            background: '#f2fff2',
            width: '325px',
            borderBottom: 'solid 1px blue',
          }}
        >
          {/* Final state title */}
          <h3 style={{ marginLeft: '10px' }}>
            Chose what you'll do whit the recipe{' '}
          </h3>
          {/* This box contains the recipe final state */}

          {/* This box contains the final stage recipe selector */}
          <Box
            sx={{
              backgroundColor: 'white',
              marginLeft: '5%',
              marginBottom: '15px',
              width: '90%',
              fontWeight: 'bold',
              borderRadius: '25%hi',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Recipe final stage
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Recipe final stage"
                onChange={handleChange}
              >
                <MenuItem value={'Cooling'}>Cooling</MenuItem>
                <MenuItem value={'Hot hold'}>Hot hold</MenuItem>
                <MenuItem value={'Re-heating'}>Re-heating</MenuItem>
                <MenuItem value={'Cold display'}>Cold display</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* This box bontains the picture button upload */}

        <Box
          sx={{
            width: '325px',
            height: '325px',
            backgroundColor: '#f2fff2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid blue',
          }}
        >
          <Button
            style={{
              width: '225px',
              height: '225px',
              backgroundColor: 'white',
              borderRadius: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {<AddAPhotoIcon />}, Picture upload
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default RecipeSelectors;
