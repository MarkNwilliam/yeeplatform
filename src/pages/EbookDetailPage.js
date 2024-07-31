import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating'; 
import ContentCard from '../subcomponents/ContentCard';
import { analytics, logEvent } from '../firebase.js';
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
    

const EbookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedContent, setRelatedContent] = useState([]);
  const [numReviewsToShow, setNumReviewsToShow] = useState(2);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [relatedContentPage, setRelatedContentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { user } = useAuth();
  const [opensnack, setOpensnack] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const defaultCoverImage = "https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png";

  const getFileType = useCallback((url) => {
    return url.split('.').pop();
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      const reviewsResponse = await fetch(`https://yeeplatformbackend.azurewebsites.net/reviews/ebook/${id}/reviews?page=${reviewsPage}&limit=2`);
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);
    } catch (err) {
      setError(err.message);
    }
  }, [id, reviewsPage]);

  const fetchRelatedContent = useCallback(async (categories) => {
    try {
      const relatedResponse = await fetch(`https://yeeplatformbackend.azurewebsites.net/category/ebook/${categories[0]}?page=${relatedContentPage}&limit=10`);
      const relatedContentData = await relatedResponse.json();
      setRelatedContent(relatedContentData.filter(book => book._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, [id, relatedContentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ebookResponse = fetch(`https://yeeplatformbackend.azurewebsites.net/getEbook/${id}`);
        const [ebookData] = await Promise.all([ebookResponse]).then(responses =>
          Promise.all(responses.map(res => res.json()))
        );

        setEbook(ebookData);
        fetchReviews();
        fetchRelatedContent(ebookData.categories);

        logEvent(analytics, `${ebookData.title} visited`);
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
  }, [id, fetchReviews, analytics, fetchRelatedContent]);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleReadBook = useCallback(() => {
    if (!ebook) return;
    const fileType = getFileType(ebook.ebookUrl || ebook.ebookurl || ebook.ebook_url || '');
    if (fileType === 'pdf') {
      logEvent(analytics, 'pdf opened');
      navigate(`/ebooks/${id}/read`);
    } else if (fileType === 'epub') {
      logEvent(analytics, 'epub opened');
      navigate(`/ebooks/epub/${id}`);
    }
  }, [ebook, id, getFileType, logEvent, navigate]);

  const handleReviewsPageChange = (event, value) => {
    setReviewsPage(value);
  };

  const handleRelatedContentPageChange = (event, value) => {
    setRelatedContentPage(value);
  };

  const handleClickOpen = () => {
    if (user) {
      setOpen(true);
    } else {
      
      setSignupOpen(true);
      
    }
  };

  const handleClose = async (value) => {
    setOpen(false);
    setOpensnack(true);
    
    try {
      await fetchReviews();
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };


  const handleCloseSignup = () => {
    setSignupOpen(false); // Close the signup dialog
  };
  
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

  const helmetContent = useMemo(() => {
    if (!ebook) return null;
    return (
      <Helmet>
        <title>{ebook.title || "Ebook Details - Yee FM"}</title>
        <meta name="description" content={ebook.description} />
        <link rel="icon" href={ebook.coverImage_optimized_url || ebook.coverImage || ebook.coverimage || ebook.cover_url || defaultCoverImage} />
        <meta property="og:image" content={ebook.coverImage_optimized_url || ebook.coverImage || ebook.coverimage || defaultCoverImage} />
      </Helmet>
    );
  }, [ebook, defaultCoverImage]);

  if (loading) {
    return <LinearProgress className="text-yellow-500 animate-pulse flex justify-center items-center h-screen" color="secondary" />;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {helmetContent}
      <button onClick={handleBack} className="mb-4 text-blue-600 hover:text-blue-800">
        &larr; Back
      </button>
      <div className="flex flex-col lg:flex-row items-center lg:items-start bg-white rounded-lg shadow">
        <div className="w-full lg:w-1/4 p-4">
          <img
            src={ebook.coverImage_optimized_url || ebook.coverImage || ebook.coverimage || ebook.cover_url || defaultCoverImage}
            alt={ebook.title}
            onClick={handleReadBook} 
            className="rounded-lg shadow-xl mx-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className="w-full lg:w-3/4 lg:ml-6 p-4">
          <h1 className="text-3xl font-bold mb-2 text-center lg:text-left ">{ebook.title}</h1>
          <p className="text-sm text-gray-600 text-center lg:text-left mb-4">Published on: {new Date(ebook.publishedDate).toLocaleDateString()}</p>
          <Rating name="read-only" value={ebook.ratings || 0} readOnly />
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{ebook.description}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Details</h3>
            <div className="space-y-2">
              <div className="flex items-center text-center">
                <span className="font-semibold mr-2">Author:</span>
                <span>{Array.isArray(ebook.authors) ? ebook.authors.join(', ') : ebook.authors}</span>
              </div>
              <div className="flex items-center text-center">
                <span className="font-semibold mr-2">ISBN:</span>
                <span>{ebook.ISBN || 'N/A'}</span>
              </div>
              <div className="flex items-center text-center">
                <span className="font-semibold mr-2">Categories:</span>
                <span>{ebook.categories.join(', ')}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleReadBook} 
            className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Read Book
          </button>  
          <div className="mt-6 relative p-4">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <button className="text-blue-500 px-4 py-2 rounded absolute top-0 right-0" onClick={handleClickOpen}>Add Review</button>
            {user && <Addreview open={open} onClose={handleClose} type='ebook' userEmail = {user.email} _id={id} setSnackbarMessage={setSnackbarMessage} />}
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
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Related Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedContent.length > 0 ? relatedContent.map((content, index) => (
            <ContentCard
              key={index}
              title={content.title}
              coverImage={content.coverImage_optimized_url || content.coverImage || content.coverimage || defaultCoverImage}
              author={Array.isArray(content.authors) ? content.authors.join(', ') : content.authors}
              publishedDate={content.publishedDate}
              description={content.description}
              onClick={() => navigate(`/ebook/${content._id}`)}
            />
          )) : (
            <p>No related books found.</p>
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

export default EbookDetailPage;
