import { Container } from '@mui/material';
import React from 'react';
import InitalStateSelector from './InitalStateSelector';
import ContinueStageSelector from './ContinueStageSelector';
import FinalStage from './FinalStage';

const Index = () => {
  return (
    <Container>
      <InitalStateSelector />
      <ContinueStageSelector />
      <FinalStage />
    </Container>
  );
};

export default Index;
