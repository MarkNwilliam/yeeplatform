import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Ebooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const booksCollection = await getDocs(collection(firestore, 'books'));
        const booksData = booksCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEbooks(booksData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div sx={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <h1 className="text-3xl font-semibold mb-8">Ebooks</h1>
      <Grid container spacing={4}>
        {ebooks.map((ebook) => (
          <Grid item key={ebook.id} xs={12} sm={6} md={4} lg={3}>
           <Link to={`/ebooks/${ebook.id}`} style={{ textDecoration: 'none' }}>
  <Card sx={{ maxWidth: 345, margin: '1rem' }}>
              <CardMedia
                component="img"
                height="300"
                image={ebook.coverImageURL}
                alt={ebook.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {ebook.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By {ebook.author}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
