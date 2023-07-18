import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHaccp } from '../../hooks/useHaccp';

export default function SaveButton() {
  const [recipeData] = useHaccp();
  const handleCreate = async () => {
    const userLocal = JSON.parse(window.localStorage.getItem('user'));
    const response = await axios.post('http://localhost:3000/recipe', {
      headers: {
        Authorization: `Bearer ${userLocal.token}`,
      },
      body: JSON.stringify(recipeData),
    });
  };

  return (
    <Stack spacing={2} direction="row">
      <Button
        sx={{ width: '100%', m: '20px 0' }}
        onClick={handleCreate}
        variant="contained"
      >
        Save Recipe
      </Button>
    </Stack>
  );
}
