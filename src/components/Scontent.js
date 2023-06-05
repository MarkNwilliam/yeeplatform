import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export default function Scontent() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const booksSnapshot = await getDocs(collection(firestore, "books"));
      const chaptersSnapshot = await getDocs(collection(firestore, "chapters"));
      const audiosSnapshot = await getDocs(collection(firestore, "audios"));

      const booksData = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "book",
      }));
      const chaptersData = chaptersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "chapter",
      }));
      const audiosData = audiosSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "audio",
      }));

      setItems([...booksData, ...chaptersData, ...audiosData]);
    };

    fetchData();
  }, []);

  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      
 
      {items.map((item) => (
  <MDBCol key={item.id}>
    <MDBCard className="h-100">
      <MDBCardImage
        src={item.coverImageURL || item.coverImage || ""}
        alt="..."
        position="top"
      />
      <MDBCardBody>
        <MDBCardTitle>{item.title}</MDBCardTitle>
        <MDBCardText>{item.description || item.content}</MDBCardText>
        {item.type === "audio" && (
          <MDBBtn color="primary" size="sm">
            <a
              href={item.audiobookUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              Listen to Audiobook
            </a>
          </MDBBtn>
        )}
        {item.type === "chapter" && (
          <MDBBtn color="primary" size="sm">
            <Link
              to={`/chapters/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              View Chapter
            </Link>
          </MDBBtn>
        )}
        {item.type === "book" && (
          <MDBBtn color="primary" size="sm">
            <Link
              to={`/ebooks/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              View Book
            </Link>
          </MDBBtn>
        )}
      </MDBCardBody>
      <MDBCardFooter>
        <small className="text-muted">
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </small>
      </MDBCardFooter>
    </MDBCard>
  </MDBCol>
))}



    </MDBRow>
  );
}
