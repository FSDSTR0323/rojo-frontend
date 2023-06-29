import { Container } from '@mui/material';
import React from 'react';
import InitialState from './InitialState';
import Action from './Action';
import FinalState from './FinalState';
import AddPicture from './AddPicture';

const Index = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <InitialState />
      <Action />
      <FinalState />
      <AddPicture />
    </Container>
  );
};

export default Index;
