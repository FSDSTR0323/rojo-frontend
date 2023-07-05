import Carousel from 'react-material-ui-carousel';

import { carouselContent, valueProposition } from '../config/homePageContent';

const CarouselItem = ({ title, subtitle, image, textPosition }) => <>{title}</>;

export const Home = () => {
  return (
    <>
      <Carousel>
        {carouselContent.map((content, index) => (
          <CarouselItem key={index} title={content.title} />
        ))}
      </Carousel>
    </>
  );
};
