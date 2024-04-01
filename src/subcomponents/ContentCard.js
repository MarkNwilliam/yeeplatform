import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

function ContentCard({ title, coverImage, itemType, itemId, rating }) {
  const defaultCoverImage = "https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png";

  const handleImageError = (e) => {
    e.target.src = defaultCoverImage;
  };

  const renderActionButton = () => {
    const buttonStyle = "bg-transparent text-yellow-500 font-bold py-2 px-4 rounded border border-yellow-500 focus:outline-none focus:border-none focus:ring ring-transparent no-underline transition-all duration-300 hover:bg-yellow-500 hover:text-red hover:border-yellow-500 hover:scale-105";

    switch (itemType) {
      case 'audiobook':
        return (
          <a href={`/audiobooks/${itemId}`} className={buttonStyle}>
            Listen
          </a>
        );

      case 'audiochapter':
        return (
          <a href={`/audiochapters/${itemId}`} className={buttonStyle}>
            Listen
          </a>
        );

      case 'Text':
        return (
          <Link to={`/chapters/${itemId}`} className={buttonStyle}>
            Chapter
          </Link>
        );
      case 'ebook':
        return (
          <Link to={`/ebooks/${itemId}`} className={`no-underline ${buttonStyle}`}>
            Book
          </Link>
        );
      default:
        return null;
    }
  };

  const renderImageLink = () => {
    switch (itemType) {
      case 'audiobook':
        return (
          <a href={`/audiobooks/${itemId}`}>
            <img 
              className="object-cover w-full h-full"
              src={coverImage || defaultCoverImage || 'https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png'} 
              alt={title}
              loading="lazy"
              onError={handleImageError}
            />
          </a>
        );

      case 'audiochapter':
        return (
          <a href={`/audiochapters/${itemId}`}>
            <img 
              className="object-cover w-full h-full"
              src={coverImage || defaultCoverImage || 'https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png'} 
              alt={title}
              loading="lazy"
              onError={handleImageError}
            />
          </a>
        );

      case 'Text':
        return (
          <Link to={`/chapters/${itemId}`}>
            <img 
              className="object-cover w-full h-full"
              src={coverImage || defaultCoverImage || 'https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png'} 
              alt={title}
              loading="lazy"
              onError={handleImageError}
            />
          </Link>
        );
      case 'ebook':
        return (
          <Link to={`/ebooks/${itemId}`}>
            <img 
              className="object-cover w-full h-full"
              src={coverImage || defaultCoverImage || 'https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png'} 
              alt={title}
              loading="lazy"
              onError={handleImageError}
            />
          </Link>
        );
      default:
        return (
          <img 
            className="object-cover w-full h-full"
            src={coverImage || defaultCoverImage || 'https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png'} 
            alt={title}
            loading="lazy"
            onError={handleImageError}
          />
        );
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white w-full">
      <div className="aspect-w-16 aspect-h-25 overflow-hidden">
        {renderImageLink()}
      </div>

      <div className="px-3 py-1">
        <div className="font-bold text-md mb-1 line-clamp-2">{title}</div>
        <Rating name="read-only" value={rating} readOnly size="small" />
      </div>
      <div className="px-3 pb-1 flex justify-center">
        {renderActionButton()}
      </div>
    </div>
  );
}

export default ContentCard;