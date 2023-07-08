import Carousel from 'react-material-ui-carousel';
import { CarouselItem } from '../components/Home/CarouselItem/CarouselItem';
import { carouselContent, valueProposition } from '../config/homePageContent';


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
