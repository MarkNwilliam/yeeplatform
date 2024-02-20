
    import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import Rating from '@mui/material/Rating'; // Ensure you have @mui/material installed
    import ContentCard from '../subcomponents/ContentCard';
    import { analytics,logEvent } from '../firebase.js'
    import { Helmet } from 'react-helmet';

    const ChapterDetailPage = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const [ebook, setEbook] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [relatedContent, setRelatedContent] = useState([]);

      const defaultCoverImage = "https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png";
    
      useEffect(() => {
        logEvent(analytics, 'chapter_detail_page_visited');
        
        const fetchData = async () => {
          try {
            const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/getChapter/${id}`);
            if (!response.ok) {
                throw new Error('Ebook not found');
            }
            const data = await response.json();
            setEbook(data);
            
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
       // Fetch related content
       if (ebook) {
        try {
          const category = encodeURIComponent(ebook.category);
          const genre = encodeURIComponent(ebook.genres.join(',')); // Assuming 'genres' is an array
          const relatedResponse = await fetch(`https://yeeplatformbackend.azurewebsites.net/relatedContent?currentItemId=${id}&category=${category}&genre=${genre}`);
          if (!relatedResponse.ok) {
            throw new Error('Failed to fetch related content');
          }
          const relatedData = await relatedResponse.json();
          setRelatedContent(relatedData);
        } catch (err) {
          console.error('Error fetching related content:', err);
        }
      }
    };
    
    fetchData();
    }, [id, ebook]);
    
      const handleBack = () => {
        navigate(-1);
      };
    
      const handleReadBook = () => {
        navigate(`/chapters/${id}/read`);
      };
      
    
      if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
      }
    
      if (error) {
        //return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
        console.log(error.message);
      }
    
      return (
        <div className="container mx-auto p-4">

<Helmet>
  <title>{ebook.title} - Yee FM</title>
  <meta name="description" content={ebook.description} />
  <link rel="icon" href={ebook.coverImage || ebook.coverimage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
  <meta name="keywords" content="Yee FM, chapter , audiobooks, search, listen, literature, digital library" />
  <meta property="og:title" content={ebook.title} />
  <meta property="og:description" content={ebook.description} />
  <meta property="og:image" content={ebook.coverImage || ebook.coverimage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={window.location.href} />
  <meta property="og:site_name" content="Yee FM" />
</Helmet>

          <button onClick={handleBack} className="mb-4 text-blue-600 hover:text-blue-800">
            &larr; Back
          </button>
          <div className="flex flex-col lg:flex-row items-center lg:items-start bg-white rounded-lg shadow">
            <div className="w-full lg:w-1/4 p-4">
              <img

                src={ebook.coverimage && ebook.coverimage.endsWith("undefined") ? defaultCoverImage : ebook.coverimage || defaultCoverImage}
                alt={ebook.title}
                className="rounded-lg shadow-xl mx-auto"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="w-full lg:w-3/4 lg:ml-6">
              <h1 className="text-3xl font-bold mb-2 text-center lg:text-left overflow-auto">{ebook.title}</h1>
              <p className="text-sm text-gray-600 text-center lg:text-left mb-4">Published on: {new Date(ebook.publishedDate).toLocaleDateString()}</p>
              <Rating name="read-only" value={ebook.averageRating || 0} readOnly /> {/* Replace with actual rating */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{ebook.description}</p>
              </div>
              <div className="mt-6">
      <h3 className="text-lg font-semibold">Details</h3>
      <div className="space-y-2">
      <div className="flex items-center text-center">
      <span className="font-semibold mr-2">Author:</span>
      <span>{ebook.author}</span>
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
            Read Chapter
          </button>
    
              {/* Review section */}
          
              <div className="mt-6">
      <h3 className="text-lg font-semibold">Reviews</h3>
      {ebook.reviews.length > 0 ? (
        ebook.reviews.map((review, index) => (
          <div key={index} className="mt-4 p-4 border border-gray-200 rounded-lg">
            <p className="text-gray-800">{review.text}</p>
            {/* Add more details about the review here */}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
    
            </div>
          </div>
    
       {/* Related Books Section */}
       <div className="mt-8">
            <h3 className="text-lg font-semibold">Related Chapters</h3>
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
                <p>No related chapters found.</p>
              )}
            </div>
          </div>
        </div>
      );
    };
    
    export default ChapterDetailPage;
    
    