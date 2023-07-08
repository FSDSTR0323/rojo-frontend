import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function InitialState() {
  return (
    <FormControl
      sx={{
        backgroundColor: '#dfd',
        borderBottom: '1px solid blue',
        width: '350px',
        padding: '10px',
      }}
    >
      <FormLabel id="demo-radio-buttons-group-label">
        Select the initials states of the elaborations
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        sx={{ backgroundColor: 'white', width: '300px', marginLeft: '5px' }}
      >
        <FormControlLabel
          value="dry"
          control={<Radio />}
          label="Dry storage"
          sx={{ marginLeft: '5px' }}
        />
        <FormControlLabel
          value="chill"
          control={<Radio />}
          label="Chill storage"
          sx={{ marginLeft: '5px' }}
        />
        <FormControlLabel
          value="defrost"
          control={<Radio />}
          label="Defrost"
          sx={{ marginLeft: '5px' }}
        />
        <FormControlLabel
          value="prepararion"
          control={<Radio />}
          label="Preparation"
          sx={{ marginLeft: '5px' }}
        />
      </RadioGroup>
    </FormControl>
  );
}
