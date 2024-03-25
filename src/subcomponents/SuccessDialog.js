import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import congs1Animation from '../animations/congs.json';


function SuccessDialog({ isOpen, onClose, points, message }) {
  const LottieAnimation = React.lazy(() => import('lottie-react'));

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="text-center">Success!</DialogTitle>
      <DialogContent className="flex flex-col items-center justify-center space-y-4">
        <React.Suspense fallback={<div>Loading...</div>}>
          <LottieAnimation 
            animationData={congs1Animation}
            style={{ width: 'auto', maxWidth: '100%', height: 200 }} 
          />
        </React.Suspense>

        <p>{message}</p>
        <div className="text-center animate-pulse">
        <p className="text-yellow-500 font-bold text-xl">You&apos;ve got</p>
          <span className="text-4xl text-yellow-500">{points} Points!</span>
        </div>
        <p>Your content will be available in the marketplace soon.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessDialog;
