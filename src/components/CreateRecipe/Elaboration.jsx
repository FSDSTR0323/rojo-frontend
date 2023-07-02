import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Elabroration() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '685px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Elaborations" variant="outlined" />
    </Box>
  );
}
