import Carousel from 'react-material-ui-carousel';

import { carouselContent, valueProposition } from '../config/homePageContent';
import { Container, Typography } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

const CarouselItem = ({ content }) => {
  const styles = {
    container: {
      width: '100%',
      backgroundColor: 'red',
    },
  };

  console.log(content);

  return (
    <>
      <Container sx={styles.container}>
        <Typography variant="h1">{content.title}</Typography>
        <Typography variant="h2">{content.subtitle}</Typography>
      </Container>
    </>
  );
};

export const Home = () => {
  return (
    <>
      <Carousel animation="slide" navButtonsAlwaysVisible={true}>
        {carouselContent.map((content, index) => (
          <CarouselItem key={index} content={content} />
        ))}
      </Carousel>
    </>
  );
};
