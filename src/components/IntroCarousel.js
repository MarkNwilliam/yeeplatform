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
      description: '',
      link: 'https://example.com/page1' // Example link URL for the first item
    },
    {
      id: 2,
      src: '/images/yee2.jpg',
      alt: '',
      caption: '',
      description: '',
      link: '' // No link for the second item
    },
    {
      id: 3,
      src: '/images/yee1.png',
      alt: '',
      caption: '',
      description: '',
      link: 'https://example.com/page3' // Example link URL for the third item
    }
  ];

  const handleClick = (event) => {
    if (!event.currentTarget.getAttribute('href')) {
      event.preventDefault();
    }
  };

  return (
    <Carousel>
      {carouselItems.map((item) => (
        <Carousel.Item key={item.id} interval={1500}>
          {item.link ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                className="d-block w-100"
                src={item.src}
                alt={item.alt}
                style={{ height: '50vh', maxHeight: '500px', objectFit: 'cover' }}
                onClick={handleClick}
              />
            </a>
          ) : (
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.alt}
              style={{ height: '50vh', maxHeight: '500px', objectFit: 'cover' }}
              onClick={handleClick}
            />
          )}
          <Carousel.Caption className="d-none d-md-block">
            <h3 style={{ fontSize: '1.5em' }}>{item.caption}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}