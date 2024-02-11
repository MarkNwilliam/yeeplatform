import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/system';

const NewsCard = styled(Card)({
  maxWidth: 345,
});

const NewsImage = styled(CardMedia)({
  height: 140,
});

function DNews() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography component="h1" variant="h4">📰 News</Typography>
      <NewsCard onClick={handleClickOpen}>
        <CardActionArea>
          <NewsImage
            component="img"
            alt="Logo"
            image="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"
            title="Logo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Welcome to YeePlatform!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click here to learn more about our platform.
            </Typography>
          </CardContent>
        </CardActionArea>
      </NewsCard>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Welcome to YeePlatform!</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            YeePlatform is an innovative subscription platform for authors and readers. We aim to provide an excellent user experience, allowing authors to share their work and readers to access a diverse range of content.

            Our platform offers a unique way for authors to publish their eBooks and audiobooks, with a subscription model that rewards creators based on the engagement of their work. Readers can enjoy access to a vast library of content, with various genres and target audiences to suit their preferences.

            Join us today and become a part of the YeePlatform community!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DNews;
