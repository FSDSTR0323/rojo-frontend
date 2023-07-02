import { Box, Container } from '@mui/material';
import Title from '../components/CreateRecipe/Title';
import Index from '../components/CreateRecipe/Index';
import IndexTextField from '../components/CreateRecipe/IndexTextField';
import SaveButton from '../components/CreateRecipe/SaveButton';
const CreateRecipe = () => {
  return (
    <Container>
      <h1>Add new elabroration</h1>
      <Title />
      <Box sx={{ display: 'flex' }}>
        <Index />
        <Box>
          <IndexTextField />
        </Box>
      </Box>
      <SaveButton />
    </Container>
  );
};

export default CreateRecipe;
