import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShareBox from '../components/Sharebox';
import { logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';

const Chapterreader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    logEvent('chapter_reader_visited');
    logEvent(chapter.title+'_chapter_reader_visited');
    const fetchChapter = async () => {
      try {
        const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/getChapter/${id}`);
        const data = await response.json();
        setChapter(data);
      } catch (error) {
        console.error('Error fetching chapter:', error.message);
      }
    };

    fetchChapter();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto mt-8 p-4 flex flex-col bg-yellow-100">

<Helmet>
  <title>{chapter?.title || "Ebook Reader - Yee FM"}</title>
  <meta name="description" content={chapter?.description || "Read your favorite ebooks on Yee FM."} />
  <meta name="keywords" content="Yee FM, ebooks, reading, literature, digital library" />
  <link rel="icon" href={chapter?.coverImage || chapter?.coverimage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
  <meta property="og:title" content={chapter?.title || "Ebook Reader - Yee FM"} />
  <meta property="og:description" content={chapter?.description || "Read your favorite ebooks on Yee FM."} />
  <meta property="og:image" content={chapter?.coverImage || chapter?.coverimage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={window.location.href} />
</Helmet>

      <div className="flex items-center mb-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleGoBack}
        >
          {'< Back'}
        </button>
        <h1 className="text-3xl font-bold text-yellow-800">{chapter ? chapter.title || "N/A" : "N/A"}</h1>
      </div>
      {chapter ? (
        <div>
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">{chapter.title || "N/A"}</h2>
          <div className="text-lg">
            {chapter.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Published Date: {chapter.publishedDate ? new Date(chapter.publishedDate).toLocaleString() : "N/A"}
          </p>
          <ShareBox shareUrl={window.location.href} selectedText={chapter.content} />
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading chapter...</p>
      )}
    </div>
  );
};

export default Chapterreader;