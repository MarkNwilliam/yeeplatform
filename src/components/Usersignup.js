import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const UserSignup = ({ open, onClose }) => {
  const navigate = useNavigate(); // Get the navigate function

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login Required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please log in to add a review.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleLogin} color="primary" variant="outlined">
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserSignup;