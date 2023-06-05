import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';

export default function Chapters() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const chaptersCollection = collection(firestore, 'chapters');
      const chapterSnapshot = await getDocs(chaptersCollection);
      const chapterList = chapterSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setChapters(chapterList);
    };

    fetchChapters();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Chapters</h1>
      <MDBRow>
        {chapters.map((chapter) => (
          <MDBCol key={chapter.id} style={{ maxWidth: '22rem' }} className="mb-4">
            <Link to={`/chapters/${chapter.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MDBCard>
                <MDBCardImage src={chapter.coverImageURL} alt={chapter.title} position="top" />
                <MDBCardBody>
                  <MDBCardTitle>{chapter.title}</MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
}
