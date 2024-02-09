// src/components/ChapterDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const ChapterDetail = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      const chapterRef = doc(firestore, 'chapters', id);
      const chapterDoc = await getDoc(chapterRef);

      if (chapterDoc.exists()) {
        setChapter(chapterDoc.data());
      }
    };

    fetchChapter();
  }, [id]);

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
