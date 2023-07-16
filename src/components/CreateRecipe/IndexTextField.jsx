import { Grid } from '@mui/material';

import Elabroration from './Elaboration';
import Finishing from './Finishing';
import PrePreparation from './PrePreparation';

const IndexTextField = () => {
  return (
    <Grid item xs={7} paddingLeft="30px !important">
      <PrePreparation />
      <Elabroration />
      <Finishing />
    </Grid>
  );
};

export default IndexTextField;
