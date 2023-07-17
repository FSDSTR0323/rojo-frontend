import { Container, Typography } from '@mui/material';

export const Loader = ({ data }) => (
  <Container maxWidth="2xl">
    {!data && <Typography variant="body1">Loading Data...</Typography>}
  </Container>
);
