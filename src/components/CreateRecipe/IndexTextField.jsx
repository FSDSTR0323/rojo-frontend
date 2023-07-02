import { Container } from '@mui/material';

import Elabroration from './Elaboration';
import Finishing from './Finishing';
import PrePreparation from './PrePreparation.jsx';

const IndexTextField = () => {
  return (
    <Container>
      <PrePreparation />
      <Elabroration />
      <Finishing />
    </Container>
  );
};

export default IndexTextField;
