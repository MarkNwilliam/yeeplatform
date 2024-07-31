import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating'; // Ensure you have @mui/material installed
import ContentCard from '../subcomponents/ContentCard';
import { analytics,logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Addreview from '../components/Addreview';
import { useAuth } from '../contexts/AuthContext';
import UserSignup from '../components/Usersignup.js';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
    
    const AudiobookDetailPage = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const [ebook, setEbook] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [relatedContent, setRelatedContent] = useState([]);
      const [numReviewsToShow, setNumReviewsToShow] = useState(2);
      const [reviewsPage, setReviewsPage] = useState(1);
      const [relatedContentPage, setRelatedContentPage] = useState(1);
      const [reviews, setReviews] = useState([]);
      const [open, setOpen] = useState(false);
      const [signupOpen, setSignupOpen] = useState(false);
      const { user } = useAuth();
      const [opensnack, setOpensnack] = React.useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');


      const defaultCoverImage = "https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png";

      const fetchReviews = useCallback(async () => {
        try {
          //console.log(id)
          const reviewsResponse = await fetch(`https://yeeplatformbackend.azurewebsites.net/reviews/audiobook/${id}/reviews?page=${reviewsPage}&limit=2`);
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData);
          //console.log(reviewsData);
        } catch (err) {
          setError(err.message);
        }
      }, [id, reviewsPage]);

      const fetchRelatedContent = useCallback(async (categories) => {
        try {
          const relatedResponse = await fetch(`https://yeeplatformbackend.azurewebsites.net/getallaudiobooks?page=3&limit=10`);
         
          const relatedContentData = await relatedResponse.json();
         //console.log(relatedContentData.data);
          setRelatedContent(relatedContentData.data.filter(book => book._id !== id));
        } catch (err) {
          setError(err.message);
        }
      }, [id, relatedContentPage]);

  
      useEffect(() => {

        const fetchData = async () => {
            try {
                const ebookResponse = await fetch(`https://yeeplatformbackend.azurewebsites.net/getAudiobook/${id}`);
                const [audiobookData] = await Promise.all([ebookResponse]).then(responses =>
                  Promise.all(responses.map(res => res.json()))
                );
               // console.log(audiobookData);
                setEbook(audiobookData);
                fetchReviews();
                fetchRelatedContent(audiobookData.categories);
                logEvent('audiobook_detail_fetched', { audiobookId: id });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (snackbarMessage) {
          setOpensnack(true);
        }
    
        fetchData();
    }, [id, fetchReviews, fetchRelatedContent,snackbarMessage]);
    
 
    
      const handleBack = () => {
        navigate('/audiobooks');
        logEvent(analytics,'audiobook_detail_back_clicked', { audiobookId: id });
      };

      const handleReviewsPageChange = (event, value) => {
        setReviewsPage(value);
      };

      const handleRelatedContentPageChange = (event, value) => {
        setRelatedContentPage(value);
      };
    
      const handleReadBook = () => {
        navigate(`/audiobooklisten/${id}/listen`);
        logEvent(analytics,'audiobook_detail_listen_clicked', { audiobookId: id });
      };
      
     
      if (loading) {
        return  <LinearProgress className="text-yellow-500 flex justify-center items-center h-screen" />;
      }
    
      if (error) {
       // console.log(error.message);
      }

      const handleClickOpen = () => {
        if (user) {
          setOpen(true);
        } else {
          
          setSignupOpen(true);
          
        }
      };
    
      const handleClose = (value) => {
        setOpen(false);
        setOpensnack(true);
        fetchReviews();
      };
      
      const handleCloseSignup = () => {
        setSignupOpen(false); // Close the signup dialog
      };


      //console.log('ebook:', ebook);
      //console.log('ebook.categories:', ebook.categories);

      const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpensnack(false);
      };
    
      const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            CLOSE
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

  

      return (
        <div className="container mx-auto p-4">
      <Helmet>
  <title>{ebook.title} - Yee FM</title>
  <meta name="description" content={ebook.description} />
  <meta name="keywords" content={ebook.keywords || ebook.genre || ebook.categories || "audiobook, Yee FM, reading, literature"} />
  <link rel="icon" href={ebook.coverImage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
  <meta property="og:title" content={`${ebook.title} - Yee FM`} />
  <meta property="og:description" content={ebook.description} />
  <meta property="og:image" content={ebook.coverImage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
  <meta property="og:type" content="audiobook" />
  <meta property="og:url" content={window.location.href} />
  {/* Additional Open Graph meta tags */}
  <meta property="og:audio" content={ebook.audioUrl} />
  <meta property="og:audio:type" content="audio/mpeg" />
</Helmet>

          <button onClick={handleBack} className="mb-4 text-blue-600 hover:text-blue-800">
            &larr; Back
          </button>
          <div className="flex flex-col lg:flex-row items-center lg:items-start bg-white rounded-lg shadow">
            <div className="w-full lg:w-1/4 p-4">
              <img
                
                src={ebook.coverImage && ebook.coverImage.endsWith("undefined") ? defaultCoverImage : ebook.coverImage || defaultCoverImage}
                alt={ebook.title}
                onClick={handleReadBook} 
                className="rounded-lg shadow-xl mx-auto"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="w-full lg:w-3/4 lg:ml-6">
              <h1 className="text-3xl font-bold mb-2 text-center lg:text-left">{ebook.title || 'N/A'}</h1>
              <p className="text-sm text-gray-600 text-center lg:text-left mb-4">Published on: {new Date(ebook.publishedDate || 'N/A').toLocaleDateString()}</p>
              <Rating name="read-only" value={ebook.ratings || 0} readOnly /> {/* Replace with actual rating */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{ebook.description || 'N/A'}</p>
              </div>
              <div className="mt-6">
      <h3 className="text-lg font-semibold">Details</h3>
      <div className="space-y-2">
      <div className="flex items-center text-center">
      <span className="font-semibold mr-2">Author:</span>
      <span>{ebook.author || 'N/A'}</span>
    </div>
        <div className="flex items-center text-center">
          <span className="font-semibold mr-2">ISBN:</span>
          <span>{ebook.ISBN || 'N/A'}</span>
        </div>
        <div className="flex items-center text-center">
  <span className="font-semibold mr-2">Categories:</span>
  <span>{ebook.categories ? ebook.categories.join(', ') : 'N/A'}</span>
</div>

      </div>
    </div>
    <button 
            onClick={handleReadBook} 
            className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Listen
          </button>
    
              {/* Review section */}
          
              <div className="mt-6 relative p-4">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <button className="text-blue-500 px-4 py-2 rounded absolute top-0 right-0" onClick={handleClickOpen} >Add Review</button>
            {user && <Addreview open={open} onClose={handleClose} type='audiobook' userEmail = {user.email} _id={id} setSnackbarMessage={setSnackbarMessage} />}
<UserSignup open={signupOpen} onClose={handleCloseSignup} />
            {reviews.reviews && reviews.reviews.length > 0 ? (
              reviews.reviews.slice(0, numReviewsToShow).map((review, index) => (
                <Paper elevation={3} key={index} className="mt-4 p-4 border border-gray-200 rounded-lg relative">
                  <Rating name="read-only" value={review.rating || 0} readOnly />
                  <p className="text-gray-800">{review.comment}</p>
                  <p className="text-blue-500 absolute top-2 right-2 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                </Paper>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
             <div className="flex justify-center p-4">
            <Pagination
              count={reviews.totalPages}
              page={reviewsPage}
              onChange={handleReviewsPageChange}
              variant="outlined"
              color="primary"
            />
            </div>
          </div>
    
            </div>
          </div>
    
       {/* Related Books Section */}
       <div className="mt-8">
            <h3 className="text-lg font-semibold">Listen</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedContent.length > 0 ? relatedContent.map((content, index) => (
                <ContentCard
                  key={index}
                  title={content.title}
                  coverImage={content.coverImage}
                  itemType={content.type} // Make sure 'type' is a valid prop as per your data
                  itemId={content._id}
                  rating={content.rating}
                />
              )) : (
                <p>No related content found.</p>
              )}
            </div>
            <div className="flex justify-center p-4">
            <Pagination
      count={10}
      page={relatedContentPage}
      onChange={handleRelatedContentPageChange}
      variant="outlined"
      color="primary"
    />
  </div>
          </div>
          <Snackbar
        open={opensnack}
        autoHideDuration={2000}
        onClose={handleSnackClose}
        message={snackbarMessage}
        action={action}
      />
        </div>
      );
    };
    
    export default AudiobookDetailPage;
                 