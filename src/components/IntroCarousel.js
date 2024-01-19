import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function IntroCarousel() {
  const carouselItems = [
    {
      id: 1,
      src: '/images/yee3.jpg',
      alt: '',
      caption: '',
      description: ''
    },
    {
      id: 2,
      src: '/images/yee2.jpg',
      alt: '',
      caption: '',
      description: ''
    },
    {
      id: 3,
      src: '/images/yee1.png',
      alt: '',
      caption: '',
      description: ''
    }
  ];

  return (
    <Carousel>
    {carouselItems.map((item) => (
      <Carousel.Item key={item.id} interval={1500}>
        <img
          className="d-block w-100"
          src={item.src}
          alt={item.alt}
          style={{ height: '50vh', maxHeight: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption className="d-none d-md-block"> {/* Hide caption on small screens */}
          <h3 style={{ fontSize: '1.5em' }}>{item.caption}</h3>
          <p>{item.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);
}