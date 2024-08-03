import React, { Suspense, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Divider from '@mui/material/Divider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from 'react-responsive';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

      export default function IntroCarousel() {
        const [carouselItems, setCarouselItems] = useState([]);
      
        useEffect(() => {
          axios.get('https://yeeplatformbackend.azurewebsites.net/category/ebook/textbook?page=10&limit=5')
            .then(response => {
              const items = response.data.map(book => ({
                id: book._id,
                src: book.coverImageMediumUrl || book.coverImage,
                alt: book.title,
                caption: book.title,
                description: book.authors.join(', '),
                link: book.ebookUrl
              }));
              setCarouselItems(items);
            })
            .catch(error => console.error(error));
        }, []);

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
    <Carousel className='p-4' style={{ maxHeight, overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
      {carouselItems && carouselItems.map((item) => (
        <Carousel.Item key={item.id} interval={5000}>
          <Link to={`/ebooks/${item.id}`}>
            <LazyLoadImage
              className="d-block w-100"
              src={item.src}
              alt={item.alt}
              style={{ maxHeight: '500px', objectFit: 'contain' }}
              width="100%"
              height={500} 
              effect="blur"
            />
            <Carousel.Caption style={{ color: '#333333', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            <h3 style={{ 
    fontSize: '1.5em', 
    whiteSpace: 'nowrap', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis' 
  }}>
    {item.caption}
  </h3>
              <p style={{ 
    whiteSpace: 'nowrap', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis' 
  }}>
    {item.description}
  </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  </Suspense>
  );

}
