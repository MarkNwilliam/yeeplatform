import React, { useRef,useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import ShareBox from '../components/Sharebox';
import { analytics, logEvent } from '../firebase.js';
import { Helmet } from 'react-helmet';
import { determineContentReadiness } from '../Algorithms/ebookread.js';
import {auth} from '../firebase.js';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Waypoint } from 'react-waypoint';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useSpeechSynthesis } from 'react-speech-kit';
import Tesseract from 'tesseract.js';
import Swal from 'sweetalert2';


const EbookReaderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ebookContent, setEbookContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showShareBox, setShowShareBox] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [totalPagesAccessed, setTotalPagesAccessed] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [totalPageClicks, setTotalPageClicks] = useState(0);
  const [totalScrollDistance, setTotalScrollDistance] = useState(0);
  const [totalPageHeight, setTotalPageHeight] = useState(0);
  const [viewedEbook, setViewedEbook] = useState(false); 
  const [viewedPages, setViewedPages] = useState({});
  const [pagesAccessedData, setPagesAccessedData] = useState({}); // Object to store page-specific data
  const VIEW_THRESHOLD_EBOOK = 10 * 60 * 1000; 
  const VIEW_THRESHOLD_PAGE = 1 * 60 * 1000; 
  const viewportRef = useRef(null);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    
    const fetchEbookContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://yeeplatformbackend.azurewebsites.net/getEbook/${id}`
        );
        const data = await response.json();
        setEbookContent(data);
      } catch (error) {
        console.error('Error fetching eBook content:', error.message);
      } finally {
        setIsLoading(false);
        logEvent(analytics, ebookContent?.title + '_reader_page_visited');
      }
    };

    fetchEbookContent();
  }, [id]);

  // Function to send a POST request to update viewed books
  const updateViewedBooks = async () => {
    try {
      const response = await fetch('https://yeeplatformbackend.azurewebsites.net/updateViewedBooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: auth.currentUser.uid,
          bookId: id,
        }),
      });
      const data = await response.json();
      console.log(data); // Log the response from the backend
    } catch (error) {
      console.error('Error updating viewed books:', error);
    }
  };

  // Function to send a POST request to update ebook scores
  const updateEbookScores = async (ebookScore) => {
    try {
      const response = await fetch('https://yeeplatformbackend.azurewebsites.net/updateEbookScores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: auth.currentUser.uid,
          bookId: id,
          score: ebookScore,
        }),
      });
      const data = await response.json();
      console.log(data); // Log the response from the backend
    } catch (error) {
      console.error('Error updating ebook scores:', error);
    }
  };

    // Function to trigger API call to record ebook read
    const recordEbookRead = async (ebookScore) => {
      try {
        const response = await fetch('https://yeeplatformbackend.azurewebsites.net/recordEbookRead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: auth.currentUser.uid,
            ebookId: id,
            ebookScore

          }),
        });
        const data = await response.json();
        console.log(data); // Log the response from the backend
      } catch (error) {
        console.error('Error recording ebook read:', error);
      }
    };

    const recordEbookView = async () => {
      try {
        const response = await fetch('https://yeeplatformbackend.azurewebsites.net/recordEbookView', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: auth.currentUser.uid,
            ebookId: id,
          }),
        });
        const data = await response.json();
        console.log(data); // Log the response from the backend
      } catch (error) {
        console.error('Error recording ebook view:', error);
      }
    };

    useEffect(() => {
      // Calculate time spent when component unmounts
      return () => {
        const endTime = new Date().getTime();
        const currentPageValue = currentPage; // Capture the current value of currentPage
        const totalTimeSpent = endTime - pagesAccessedData[currentPageValue]?.startTime || 0; // Calculate time spent on the current page
        setEndTime(endTime);
        setTotalTimeSpent((prevTotalTimeSpent) => prevTotalTimeSpent + totalTimeSpent); // Accumulate time spent
        setPagesAccessedData((prevData) => {
          // Use functional update to ensure that currentPageValue is the latest value
          return {
            ...prevData,
            [currentPageValue]: { ...prevData[currentPageValue], endTime, totalTimeSpent },
          };
        });
        // Check if page has been viewed
        if (totalTimeSpent > VIEW_THRESHOLD_PAGE) {
          setViewedPages((prevViewedPages) => ({ ...prevViewedPages, [currentPageValue]: true }));
        }
      };
    }, []);
    

  useEffect(() => {
    // Check if total time spent exceeds the view threshold
    if (totalTimeSpent > VIEW_THRESHOLD_EBOOK) {
      setViewedEbook(true);
      
        recordEbookView(); 
     
    }
  }, [totalTimeSpent]);


  useEffect(() => {
    // Calculate 45% Content Accesses
    const totalPages = Object.keys(pagesAccessedData).length;
    const pagesAccessed = Object.values(pagesAccessedData).filter((pageData) => pageData.totalTimeSpent > 0).length;
    const contentAccessPercentage = (pagesAccessed / totalPages) * 100 || 0;
    localStorage.setItem('contentAccessPercentage', contentAccessPercentage);
  }, [pagesAccessedData]);

  useEffect(() => {
    // Calculate Predicted Reading Time
    const totalPagesAccessed = Object.values(pagesAccessedData).filter((pageData) => pageData.totalTimeSpent > 0).length;
    const averageReadingTimePerPage = totalPagesAccessed > 0 ? totalTimeSpent / totalPagesAccessed : 0;
    localStorage.setItem('predictedReadingTime', averageReadingTimePerPage * ebookContent?.totalPages || 0);
  }, [totalTimeSpent, pagesAccessedData, ebookContent]);

  useEffect(() => {
    // Determine content readiness
    const { engagementScore, contentAccessPercentage, predictedReadingTime, isContentRead } = determineContentReadiness(
      0.4,
      0.3,
      0.3,
      totalTimeSpent,
      Object.values(pagesAccessedData).filter((pageData) => pageData.totalTimeSpent > 0).length,
      endTime,
      pagesAccessedData[currentPage]?.startTime || 0,
      totalPageClicks,
      totalScrollDistance,
      totalPageHeight,
      Object.values(pagesAccessedData).map((pageData) => pageData.totalTimeSpent || 0).reduce((a, b) => a + b, 0),
      ebookContent?.totalPages,
      Object.values(pagesAccessedData).map((pageData) => pageData.totalTimeSpent || 0).reduce((a, b) => a + b, 0) / Object.values(pagesAccessedData).filter((pageData) => pageData.totalTimeSpent > 0).length
    );
    localStorage.setItem('isContentRead', isContentRead);
    if (isContentRead) {
      recordEbookRead(engagementScore); // Trigger API call to record ebook read
    }
  }, [totalTimeSpent, pagesAccessedData, endTime, totalPageClicks, totalScrollDistance, totalPageHeight, ebookContent]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setTotalPagesAccessed((prevTotalPagesAccessed) => prevTotalPagesAccessed + 1);
    setPagesAccessedData((prevData) => ({
      ...prevData,
      [currentPage]: {
        ...prevData[currentPage],
        scrollDistance: totalScrollDistance - (prevData[currentPage]?.scrollDistance || 0), // Calculate scroll distance for the current page
        endTime: new Date().getTime(),
        totalTimeSpent: new Date().getTime() - (prevData[currentPage]?.startTime || 0), // Calculate time spent on the current page
      },
    }));
  };
  const showLoadingDialog = () => {
    Swal.fire({
      title: 'Loading',
      html: 'Processing your request...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  };
  
  const showPlayingDialog = () => {
    setIsPlaying(true);
    Swal.fire({
      title: 'Playing',
      html: 'Text is being played...',
      showCancelButton: true,
      cancelButtonText: 'Stop',
      allowOutsideClick: false,
      didClose: () => {
        setIsPlaying(false);
      },
    });
  };
  
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setTotalPagesAccessed((prevTotalPagesAccessed) => prevTotalPagesAccessed + 1);
    setPagesAccessedData((prevData) => ({
      ...prevData,
      [currentPage]: {
        ...prevData[currentPage],
        scrollDistance: totalScrollDistance - (prevData[currentPage]?.scrollDistance || 0), // Calculate scroll distance for the current page
        endTime: new Date().getTime(),
        totalTimeSpent: new Date().getTime() - (prevData[currentPage]?.startTime || 0), // Calculate time spent on the current page
      },
    }));
  };
  useEffect(() => {
    // Update scroll distance
    const handleScroll = () => {
      setTotalScrollDistance(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update page height (using viewport height within react-pdf)
    const handleViewportHeightChange = (viewportHeight) => {
      setTotalPageHeight(viewportHeight);
    };
   
    if (viewportRef.current) {
      viewportRef.current.addEventListener('updateViewport', handleViewportHeightChange);
    }

    return () => {
      if (viewportRef.current) {
        viewportRef.current.removeEventListener('updateViewport', handleViewportHeightChange);
      }
    };
  }, []);
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.2);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.2, 0.2));
  };

  const handleTextSelection = () => {
    const text = window.getSelection().toString();
    if (text) {
      setSelectedText(text);
      setShowShareBox(true);
    }
  };



  useEffect(() => {
    // Update scroll distance
    const handleScroll = () => {
      setTotalScrollDistance(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update page height
    const handleResize = () => {
      setTotalPageHeight(document.body.scrollHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  useEffect(() => {
    // Update page clicks
    const handlePageClick = () => {
      setTotalPageClicks((prevTotalPageClicks) => prevTotalPageClicks + 1);
    };
    window.addEventListener('click', handlePageClick);

    return () => {
      window.removeEventListener('click', handlePageClick);
    };
  }, []);

  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreenMode(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setFullScreenMode(false);
    }
  };

  const extractPageText = async (pageNumber) => {
    console.log('Extracting text from page:', pageNumber);
    const pdfUrl = ebookContent?.ebookUrl;
    const loadingTask = pdfjs.getDocument(pdfUrl);
  
    try {
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const canvasContext = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext, viewport }).promise;
  
      // Use OCR to extract text from the canvas
      const { data: { text } } = await Tesseract.recognize(canvas);
  
      console.log('Text content:', text);
      return text;
    } catch (error) {
      console.error('Error extracting text from page:', error);
      return ''; // Return empty string in case of error
    }
  };
  
  
  const handleSpeak = async () => {
    console.log('Speaking text:', speechText);
    if (!isLoading && ebookContent) {
      try {
        showLoadingDialog(); // Show loading dialog before starting text extraction
        const voices = window.speechSynthesis.getVoices();
        console.log('Voices:', voices);
        const pageText = await extractPageText(currentPage); // Extract text from the current page
        //const formattedText = pageText.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space
        // Set the speech text when the Promise is resolved
        speak({ text: pageText, rate: 0.5 });
        setSpeechText(pageText);
        console.log('Speech text:', pageText);
        Swal.close(); // Close loading dialog after text extraction is done
        showPlayingDialog(); // Show playing dialog
      } catch (error) {
        Swal.close(); // Close loading dialog in case of error
        console.error('Error extracting page text:', error);
        // Handle error
      }
    }
  };
  
  
  const pageWidth = window.innerWidth * 1 * zoom;
  const pageHeight = window.innerHeight * 1 * zoom;

  return (
    <div className={`p-4 flex flex-col ${fullScreenMode ? 'h-screen' : 'bg-yellow-100'}`}>
      {fullScreenMode ? (
        <button
          className="fixed top-2 right-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleFullScreenToggle}
        >
          <ZoomInMapIcon />
        </button>
      ) : (
        <button
          className="fixed top-2 right-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleFullScreenToggle}
        >
          <ZoomOutMapIcon />
        </button>
      )}

      {ebookContent && (
        <Helmet>
          <title>{ebookContent?.title || 'Ebook Reader - Yee FM'}</title>
          <meta
            name="description"
            content={ebookContent?.description || 'Read your favorite ebooks on Yee FM.'}
          />
          <meta name="keywords" content="Yee FM, ebooks, reading, literature, digital library" />
          <link
            rel="icon"
            href={
              ebookContent?.coverImage ||
              ebookContent?.coverimage ||
              'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp'
            }
          />
          <meta property="og:title" content={ebookContent?.title || 'Ebook Reader - Yee FM'} />
          <meta
            property="og:description"
            content={ebookContent?.description || 'Read your favorite ebooks on Yee FM.'}
          />
          <meta
            property="og:image"
            content={
              ebookContent?.coverImage ||
              ebookContent?.coverimage ||
              'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp'
            }
          />
          <meta property="og:type" content="book" />
          <meta property="og:url" content={window.location.href} />
        </Helmet>
      )}


      <div className="flex items-center mb-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={() => navigate(-1)}
        >
          {'< Back'}
        </button>
        <h1 className="text-3xl font-bold text-yellow-800">{ebookContent?.title}</h1>
      </div>
      <div className="w-full max-w-screen-md mx-auto bg-white rounded-lg shadow-md p-6 flex-1">
        <div className="flex justify-between mb-4">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center mr-2 sm:py-1 sm:px-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <NavigateBeforeIcon />
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center sm:py-1 sm:px-2"
            onClick={handleNextPage}
            disabled={currentPage === ebookContent?.totalPages}
          >
            <NavigateNextIcon />
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center ml-2 sm:py-1 sm:px-2"
            onClick={handleZoomIn}
          >
            <ZoomInIcon />
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center ml-2 sm:py-1 sm:px-2"
            onClick={handleZoomOut}
          >
            <ZoomOutIcon />
          </button>

          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center ml-2 sm:py-1 sm:px-2"
            onClick={handleSpeak}
            disabled={isLoading || !ebookContent}
          >
            <span>Play</span>
          </button>
        </div>
        <div className="w-full h-full overflow-auto" onMouseUp={handleTextSelection} ref={viewportRef}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-yellow-300 h-24 w-24"></div>
            </div>
          ) : (
            <Document file={ebookContent?.ebookUrl} renderMode="webgl">
              <Page pageNumber={currentPage} width={pageWidth} height={pageHeight} renderTextLayer={true} />
              <Waypoint onEnter={() => console.log('Content section entered')} />
            </Document>
          )}
        </div>
        
      </div>
      {showShareBox && <ShareBox shareUrl={window.location.href} selectedText={selectedText} />}
    </div>
  );
};

export default EbookReaderPage;