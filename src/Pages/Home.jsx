import Carousel from 'react-material-ui-carousel';
import { CarouselItem } from '../components/Home/CarouselItem/CarouselItem';
import { ValuePropItem } from '../components/Home/valuePropItem/valuePropItem';
import { Container } from '@mui/material';
import '../config/i18n';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t, i18n } = useTranslation();
  const carouselContent = t('carouselContent');
  console.log('carousel content:', carouselContent);
  const valuePropositionContent = t('valuePropositionContent');
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
      <Container maxWidth="xl" sx={styles.valueProps}>
        {valuePropositionContent.map((content, index) => (
          <ValuePropItem key={index} content={content} />
        ))}
      </Container>
    </>
  );
};
