import { Grid } from '@mui/material';
import InitialState from './InitialState/InitialState';
import Action from './FinalState/Action';
import FinalState from './FinalState/FinalState';
import AddPicture from './AddPicture';
import PreparationButtons from './Elaboration/PreparationButtons';

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
