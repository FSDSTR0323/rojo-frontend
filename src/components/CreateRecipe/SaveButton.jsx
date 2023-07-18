import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SaveButton() {
  return (
    <Stack spacing={2} direction="row">
      <Button sx={{ width: '100%', m: '20px 0' }} variant="contained">
        Save Recipe
      </Button>
    </Stack>
  );
}
