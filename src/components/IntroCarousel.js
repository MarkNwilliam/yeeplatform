import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';

export default function IntroCarousel() {
  const fetchCarouselItems = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
    {
      id: 1,
      src: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/yee3.jpg',
      alt: '',
      caption: '',
      description: '',
      link: '' // Example link URL for the first item
    },
    {
      id: 2,
      src: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/yee2.jpg',
      alt: '',
      caption: '',
      description: '',
      link: '' // No link for the second item
    },
    {
      id: 3,
      src: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/yee1.png',
      alt: '',
      caption: '',
      description: '',
      link: '' // Example link URL for the third item
    }
  ]);
}, 5000)
);

const { data: carouselItems, isLoading } = useQuery('carouselItems', fetchCarouselItems);


  const handleClick = (event) => {
    if (!event.currentTarget.getAttribute('href')) {
      event.preventDefault();
    }
  };

  return (
    <Carousel style={{ maxHeight: '500px', overflow: 'hidden' }}>
      {carouselItems.map((item) => (
        <Carousel.Item key={item.id} interval={1500}>
          {item.link ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                className="d-block w-100"
                src={item.src}
                alt={item.alt}
                style={{ maxHeight: '500px', objectFit: 'cover' }}
                onClick={handleClick}
              />
            </a>
          ) : (
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.alt}
              style={{ maxHeight: '500px', objectFit: 'cover' }}
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
