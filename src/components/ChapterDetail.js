// src/components/ChapterDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const ChapterDetail = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
   
  });

  return (
    <div>
      {chapter ? (
        <>
          <h1>{chapter.title}</h1>
          <h2>By {chapter.author}</h2>
          <p>{chapter.content}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChapterDetail;
