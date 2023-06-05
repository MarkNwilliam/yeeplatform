import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../css/IntroCarousel.css';

export default function IntroCarousel() {
  const carouselItems = [
    {
      id: 1,
      src: '/images/yee3.jpg',
      alt: 'First slide',
      caption: 'First slide label'
    },
    {
      id: 2,
      src: '/images/yee2.jpg',
      alt: 'Second slide',
      caption: 'Second slide label'
    },
    {
      id: 3,
      src: '/images/yee1.png',
      alt: 'Third slide',
      caption: 'Third slide label'
    }
  ];

  return (
    <Carousel
      prevIcon={<i className="fas fa-chevron-left" style={{ color: 'white' }} />}
      nextIcon={<i className="fas fa-chevron-right" style={{ color: 'white' }} />}
    >
      {carouselItems.map((item) => (
        <Carousel.Item key={item.id} interval={1500}>
          <img
            className="d-block w-100 carousel-img"
            src={item.src}
            alt={item.alt}
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}