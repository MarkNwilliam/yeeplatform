import React, { lazy, Suspense, useCallback } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from 'react-responsive';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const carouselItems = [
        {
          id: 1,
          src: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/yee3.jpeg',
          alt: 'Slide 1',
          caption: 'First Slide',
          description: '',
          link: '' 
        },
        {
          id: 2,
          src: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/yee2.jpeg',
          alt: 'Slide 2',
          caption: 'Second Slide',
          description: '',
          link: '' 
        },
        {
          id: 3,
          src: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/yee1.jpeg',
          alt: 'Slide 3',
          caption: 'Third Slide',
          description: '',
          link: '' 
        }
      ]

export default function IntroCarousel() {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  const isTablet = useMediaQuery({
    query: '(min-device-width: 768px) and (max-device-width: 1224px)'
  });
  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)'
  });

  const maxHeight = isDesktopOrLaptop ? '500px' : (isTablet ? '350px' : '200px');

  const handleClick = (event) => {
    if (!event.currentTarget.getAttribute('href')) {
      event.preventDefault();
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Carousel style={{ maxHeight, overflow: 'hidden' }}>

        {carouselItems && carouselItems.map((item) => (
          <Carousel.Item key={item.id} interval={1500}>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <LazyLoadImage
                  className="d-block w-100"
                  src={item.src}
                  alt={item.alt}
                  onClick={handleClick}
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                  width="100%"
                  height={500} 
                  effect="blur"
                />
              </a>
            ) : (
              <LazyLoadImage
                className="d-block w-100"
                src={item.src}
                alt={item.alt}
                style={{ maxHeight: '500px', objectFit: 'contain' }}
                onClick={handleClick}
                width="100%"
                height={500} // Add fixed height
                effect="blur"
              />
            )}
            <Carousel.Caption className="d-none d-md-block">
              <h3 style={{ fontSize: '1.5em' }}>{item.caption}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
            }
    </Carousel>
    </Suspense>
  );
}
