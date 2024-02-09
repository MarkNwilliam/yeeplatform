import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import AudioPlayer from '../AudioPlayer';
import { Typography, Container, CircularProgress, Box, Card, CardContent, CardMedia } from '@mui/material';

const AudiobookDetail = () => {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);

  useEffect(() => {
    const fetchAudiobook = async () => {
      const audiobookRef = doc(firestore, 'audio', id);
      const audiobookDoc = await getDoc(audiobookRef);

      if (audiobookDoc.exists()) {
        setAudiobook(audiobookDoc.data());
      }
    };

    fetchAudiobook();
  }, [id]);

  return (
    <div>
      {audiobook ? (
        <Container>
          <Box mt={4} mb={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={audiobook.coverImage}
                alt={audiobook.title}
                sx={{ maxHeight: 250, objectFit: 'contain', padding: '16px' }}
              />
              <CardContent>
                <Typography variant="h4" component="h1" sx={{ marginBottom: '8px' }}>
                  {audiobook.title}
                </Typography>
                <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                  By {audiobook.author}
                </Typography>
              </CardContent>
            </Card>
            <Box mt={2}>
              <Typography variant="body1">{audiobook.description}</Typography>
            </Box>
            <Box mt={2}>
              <AudioPlayer audioUrl={audiobook.audiobookUrl} />
            </Box>
          </Box>
        </Container>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default AudiobookDetail;


