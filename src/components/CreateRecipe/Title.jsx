import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Title({ fn, name }) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { mb: 2, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={fn}
        name={name}
        id="outlined-basic"
        label="Recipe name"
        variant="outlined"
      />
    </Box>
  );
}
