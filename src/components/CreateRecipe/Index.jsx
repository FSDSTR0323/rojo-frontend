import { Container } from '@mui/material';
import InitialState from './InitialState';
import Action from './Action';
import FinalState from './FinalState';
import AddPicture from './AddPicture';
import PreparationButtons from './PreparationButtons';

const Index = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <InitialState />
      <PreparationButtons />
      <Action />
      <FinalState />
      <AddPicture />
    </Container>
  );
};

export default Index;
