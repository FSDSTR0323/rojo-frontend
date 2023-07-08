import Carousel from 'react-material-ui-carousel';
import { CarouselItem } from '../components/Home/CarouselItem/CarouselItem';
import { ValuePropItem } from '../components/Home/valuePropItem/valuePropItem';
import {
  carouselContent,
  valuePropositionContent,
} from '../config/homePageContent';
import { Container } from '@mui/material';

ValuePropItem

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
