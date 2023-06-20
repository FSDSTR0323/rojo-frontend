import { Container } from '@mui/material';
import React from 'react';
import InitalStateSelector from './InitalStateSelector';
import ContinueStageSelector from './ContinueStageSelector';

const Index = () => {
  return (
    <Container>
      <InitalStateSelector />
      <ContinueStageSelector />
    </Container>
  );
};

export default Index;
