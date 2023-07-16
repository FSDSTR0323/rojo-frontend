import { Grid } from '@mui/material';
import InitialState from './InitialState';
import Action from './Action';
import FinalState from './FinalState';
import AddPicture from './AddPicture';
import PreparationButtons from './PreparationButtons';

const Index = () => {
  return (
    <Grid item xs={5}>
      <InitialState />
      <PreparationButtons />
      <Action />
      <FinalState />
      <AddPicture />
    </Grid>
  );
};

export default Index;
