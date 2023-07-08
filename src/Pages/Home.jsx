import Carousel from 'react-material-ui-carousel';

import { carouselContent, valueProposition } from '../config/homePageContent';
import { Box, Container, Typography } from '@mui/material';

const styles = {
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  height: '40vh',
  color: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  padding: { xs: 0 },
  '.text': {
    color: 'black',
    backgroundColor: '#b9b1b1',
    padding: '3em',
  },
  h1: {
    fontSize: '3em',
    fontWeight: 'bold',
    margin: '0.25em',
  },
  h2: {
    fontSize: '1.25em',
  },
};

const CarouselItem = ({ content }) => {
  return (
    <Container maxWidth="xl" sx={styles}>
      <Box className="text">
        <Typography variant="h1">{content.title}</Typography>
        <Typography variant="h2">{content.subtitle}</Typography>
      </Box>
      <Box
        component="img"
        alt={content.image.alt}
        src={content.image.src}
        draggable={false}
      ></Box>
    </Container>
  );
};

export const Home = () => {
  return (
    <>
      <Carousel
        animation="slide"
        interval={10000}
        duration={1000}
        navButtonsAlwaysVisible={true}
        fullHeightHover={false}
      >
        {carouselContent.map((content, index) => (
          <CarouselItem key={index} content={content} />
        ))}
      </Carousel>
    </>
  );
};
