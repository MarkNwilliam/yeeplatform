import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid, Paper, Button, Box } from '@mui/material';

function EbookDetails() {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  console.log('This is the is '+id);


  if (!ebook) return <div>Loading...</div>;

  return (
    <div>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="h2">
              {ebook.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {ebook.subtitle}
            </Typography>
            <Typography variant="body2">{ebook.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Categories:</Typography>
            <ul>
  {ebook.categories && Array.isArray(ebook.categories) && ebook.categories.map((category, index) => (
    <li key={index}>{category}</li>
  ))}
</ul>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={() => setPdfUrl(ebook.ebookPdfURL)}>
                Read
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {pdfUrl && (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
          width="100%"
          height="600px"
          title="ebook"
        />
      )}
    </div>
  );
}

export default EbookDetails;

