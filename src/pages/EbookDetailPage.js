import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating'; // Ensure you have @mui/material installed
import ContentCard from '../subcomponents/ContentCard';
import {analytics, logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';
import LinearProgress from '@mui/material/LinearProgress';

const EbookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedContent, setRelatedContent] = useState([]);

  const defaultCoverImage = "https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png";

  function getFileType(url) {
    const extension = url.split('.').pop();
    return extension;
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/getEbook/${id}`);
        if (!response.ok) {
            throw new Error('Ebook not found');
        }
        const data = await response.json();
        setEbook(data);
        //console.log(data)
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
      logEvent(analytics, ebook.title+' visited');
    } catch (err) {
      console.error('Error fetching related content:', err);
    }
  }
};

fetchData();
}, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleReadBook = () => {

    const fileType = getFileType(ebook.ebookUrl || ebook.ebookurl || ebook.ebook_url ||'');
//console.log(fileType); // Should return 'pdf' or 'epub' or 'mobi' or 'azw3' or 'docx' or 'txt' or 'rtf' or 'fb2' or 'djvu' or 'azw' or 'lit' or 'prc' or 'pdb' or 'oxps' or 'xps' or 'cbz' or 'cbr' or 'cb7' or 'cbt' or 'cba' or 'chm' or 'html' or 'htm' or 'xhtml' or 'mht' or 'mhtml' or 'webarchive' or 'webarchivexml' or 'webarchivezip' or 'webarchivexmlzip' or 'opf' or 'ibooks' or 'ibook' or 'azw1' or 'azw4' or 'azw8' or 'azw6' or 'azw7' or 'azw8' or 'azw9' or 'azw10' or 'azw11' or 'azw12' or 'azw13' or 'azw14' or 'azw15' or 'azw16' or 'azw17' or 'azw18' or 'azw19' or 'azw20' or 'azw21' or 'azw22' or 'azw23' or 'azw24' or 'azw25' or 'azw26' or 'azw27' or 'azw28' or 'azw29' or 'azw30' or 'azw31' or 'azw32' or 'azw33' or 'azw34' or 'azw35' or 'azw36' or 'azw37' or 'azw38' or 'azw39' or 'azw40' or 'azw41' or 'azw42' or 'azw43' or 'azw44' or 'azw45' or 'azw46' or 'azw47' or 'azw48' or 'azw49' or 'azw50' or 'azw51' or 'azw52' or 'azw53' or 'azw54' or 'azw55' or 'azw56' or 'azw57' or


   

    if (fileType === 'pdf') {
      logEvent(analytics, 'pdf opened');
      navigate(`/ebooks/${id}/read`);
    } else if (fileType === 'epub') {
      logEvent(analytics, 'epub opened');
      navigate(`/ebooks/epub/${id}`);
    }
  };
  

  if (loading) {
    return <LinearProgress className="text-yellow-500 animate-pulse flex justify-center items-center h-screen" color="secondary" />;
  }

  if (error) {
    //return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    //console.log(error.message);
  }


  

  return (
    <div className="container mx-auto p-4">

{ebook && (
        <Helmet>
          <title>{ebook.title || "Ebook Details - Yee FM"}</title>
          <meta name="description" content={ebook.description} />
          <link rel="icon" href={ebook.coverImage || ebook.coverimage  || ebook.cover_url|| "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
          <meta property="og:image" content={ebook.coverImage || ebook.coverimage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
        </Helmet>
      )}

      <button onClick={handleBack} className="mb-4 text-blue-600 hover:text-blue-800">
        &larr; Back
      </button>
      <div className="flex flex-col lg:flex-row items-center lg:items-start bg-white rounded-lg shadow">
        <div className="w-full lg:w-1/4 p-4">
          <img
            src={ebook.coverImage || ebook.coverimage || ebook.cover_url|| defaultCoverImage }
            alt={ebook.title}
            onClick={handleReadBook} 
            className="rounded-lg shadow-xl mx-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className="w-full lg:w-3/4 lg:ml-6">
          <h1 className="text-3xl font-bold mb-2 text-center lg:text-left">{ebook.title}</h1>
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
  <span> {Array.isArray(ebook.authors) ? ( ebook.authors.join(', ')): ebook.authors}</span>
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
        <h3 className="text-lg font-semibold">Related Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedContent.length > 0 ? relatedContent.map((content, index) => (
            <ContentCard
              key={index}
              title={content.title}
              coverImage={content.coverImage || content.coverimage || content.cover_url || defaultCoverImage }
              itemType={content.type} // Make sure 'type' is a valid prop as per your data
              itemId={content._id}
              rating={content.rating}
            />
          )) : (
            <p>No related books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EbookDetailPage;


