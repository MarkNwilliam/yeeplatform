// Audiobooks.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function Audiobooks() {
  const [audiobooks, setAudiobooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAudiobooks = async () => {
      const audioCollection = collection(firestore, 'audio');
      const audioSnapshot = await getDocs(audioCollection);
      const audioData = audioSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAudiobooks(audioData);
    };

    fetchAudiobooks();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/audiobooks/${id}`);
  };

  return (
    <div>
        <h1 className="text-3xl font-semibold mb-8">Audiobooks</h1>
      <MDBRow>
        {audiobooks.map((audiobook) => (
          <MDBCol key={audiobook.id} sm="6" md="4" lg="3" onClick={() => handleCardClick(audiobook.id)}>
            <MDBCard className="mb-3">
              <MDBCardImage src={audiobook.coverImage} alt="cover" position="top" />
              <MDBCardBody>
                <MDBCardTitle>{audiobook.title}</MDBCardTitle>
                <MDBCardText>By {audiobook.author}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
}
