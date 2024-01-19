import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

function ContentCard({ title, coverImage, itemType, itemId, rating }) {
  // Function to determine the button based on the item type

  const defaultCoverImage = "yeeplatform_book_cover.png";

  const handleImageError = (e) => {
    e.target.src = defaultCoverImage;
  };


  const renderActionButton = () => {
    switch (itemType) {
      case 'audiobook':
        return (
          <a href={`/audiobook/${itemId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Listen
          </a>
        );
      case 'Text':
        return (
          <Link to={`/chapters/${itemId}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Chapter
          </Link>
        );
      case 'ebook':
        return (
          <Link to={`/ebooks/${itemId}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Book
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white w-full">
      <div className="aspect-w-16 aspect-h-25 overflow-hidden"> {/* Adjust aspect ratio */}
        <img 
          className="object-cover w-full h-full"
          src={coverImage || defaultCoverImage} 
          alt={title}
          loading="lazy"
          onError={handleImageError}
        />
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