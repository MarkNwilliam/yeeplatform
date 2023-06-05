import React from 'react';
import { Typography, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

export default function DSupport() {
  const onWhatsAppClick = () => {
    window.open('https://wa.me/256784906354', '_blank');
  };

  const onEmailClick = () => {
    window.location.href = 'mailto:nkugwamarkwilliam@gmail.com';
  };

  return (
    <>
      <style>
        {`
          @keyframes yellowBubbles {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .yellowBubblesAnimation {
            background: radial-gradient(circle, rgba(255,255,224,1) 0%, rgba(255,255,224,0) 70%);
            background-size: 200% 200%;
            animation: yellowBubbles 5s ease infinite;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
        `}
      </style>
      <div className="yellowBubblesAnimation"></div>
      <Typography component="h1" variant="h5">
        Support
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<WhatsAppIcon />}
        onClick={onWhatsAppClick}
        sx={{ mt: 2 }}
      >
        Contact via WhatsApp
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<EmailIcon />}
        onClick={onEmailClick}
        sx={{ mt: 2, ml: 2 }}
      >
        Contact via Email
      </Button>
    </>
  );
}
