import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';



function Addreview(props) {
  const { onClose, open, type, _id, userEmail,setSnackbarMessage } = props;
  const [review, setReview] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

 
  const fetchUserReview = async () => {
    try {
      const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/reviews/user/${userEmail}/${type}/${_id}/reviews`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      ////console.log("User review data:", data);
  
      if (data && data.length > 0) {
        setUserReview(data[0]); // Set the user's review
        ////console.log("User review data:", data[0]);
      }
    } catch (error) {
      ////console.error("An error occurred while fetching the user review:", error);
      
    }
  };

  const updateReview = async () => {
    setLoading(true);
    setSnackbarMessage('Updating review...');
    const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/reviews/user/${userEmail}/${type}/${_id}/review/${userReview._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: rating,
        comment: review,
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      setSnackbarMessage('Review updated successfully');
      setSnackbarOpen(true);
    setLoading(false);
    } else {
      setSnackbarMessage('Failed to update review');
      setSnackbarOpen(true);
    setLoading(false);
    }
    setSnackbarOpen(true);
    setLoading(false);
  };

  const postReview = async () => {
    setLoading(true);
    setSnackbarMessage('Posting review...');
    try {
      const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/reviews/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audiobookId: _id,
          userEmail: userEmail,
          rating: rating,
          comment: review,
        }),
      });
      const data = await response.json();

      if (data.message === 'User has already reviewed this audiobook') {
       // //console.log(data.message);
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
    setLoading(false);
      } else {
       // //console.log(data);
        setSnackbarMessage('Review posted successfully');
      }
      setSnackbarOpen(true);
    } catch (err) {
     // //console.error(err);
      setSnackbarMessage('Failed to post review');
      setSnackbarOpen(true);
    setLoading(false);
    }
    setLoading(false);
  };

  // Function to delete a review
  const deleteReview = async () => {
    setSnackbarMessage('Deleting review...');
    setLoading(true);
    try {
      const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/reviews/user/${userEmail}/${type}/${_id}/review/${userReview._id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      ////console.log(data);
      if (response.ok) {
        setSnackbarMessage('Review deleted successfully');
        setSnackbarOpen(true);
        handleClose();
    setLoading(false);
      } else {
        setSnackbarMessage('Failed to delete review');
        setSnackbarOpen(true);
    setLoading(false);
      }
      setSnackbarOpen(true);
    } catch (err) {
      ////console.error(err);
      setSnackbarMessage('Failed to delete review');
      setSnackbarOpen(true);
    }
    setLoading(false);
  };
  
  const handleSubmit = () => {
    if (userReview) {
      updateReview();
    } else {
      postReview();
    }
    handleClose();
  };

  const handleClose = () => {
    if (!loading) {
        setSnackbarMessage('Working on it...');
        onClose();
    }
  };

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };


  useEffect(() => {
    fetchUserReview();
  }, []);

  useEffect(() => {
    if (userReview) {
      setReview(userReview.comment);
      setRating(userReview.rating);
    }
  }, [userReview]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add a Review</DialogTitle>
      <Box p={1}>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={handleRatingChange}
        />
      
        <TextField
          autoFocus
          margin="dense"
          id="review"
          label="Your Review"
          type="text"
          fullWidth
          value={review}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>

        <Button onClick={deleteReview} color="secondary">
          Delete Review
        </Button>
      </Box>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
}

Addreview.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  setSnackbarMessage: PropTypes.func.isRequired,
};

export default Addreview;