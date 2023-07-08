import Carousel from 'react-material-ui-carousel';
import { CarouselItem } from '../components/Home/CarouselItem/CarouselItem';
import {
  carouselContent,
  valuePropositionContent,
} from '../config/homePageContent';
import { Box, Container, Typography } from '@mui/material';

const ValuePropItem = ({ content }) => {
  const styles = {
    width: '33%',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    padding: '40px 35px',
    textAlign: 'center',
    h3: {
      fontSize: '1.5em',
      marginBottom: '0.75em',
    },
  };

  return (
    <Box sx={styles}>
      <Typography variant="h3">{content.title}</Typography>
      <Typography variant="subtitle1">{content.description}</Typography>
    </Box>
  );
};

export const Home = () => {
  const styles = {
    carousel: {
      marginBottom: '2em',
    },
    valueProps: {
      display: 'flex',
      gap: '40px',
    },
  };
  return (
    <>
      <Carousel
        animation="slide"
        interval={10000}
        duration={1000}
        navButtonsAlwaysVisible={true}
        fullHeightHover={false}
        sx={styles.carousel}
      >
        {carouselContent.map((content, index) => (
          <CarouselItem key={index} content={content} />
        ))}
      </Carousel>
      <Container maxWidth="2xl" sx={styles.valueProps}>
        {valuePropositionContent.map((content, index) => (
          <ValuePropItem key={index} content={content} />
        ))}
      </Container>
    </>
  );
};
