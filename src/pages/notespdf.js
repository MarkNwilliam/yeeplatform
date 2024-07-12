import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Viewer, Worker ,ProgressBar, defaultScale, ScrollMode} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {auth} from '../firebase.js';
import { getDocument } from 'pdfjs-dist';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { FaSun, FaMoon, FaPlay, FaArrowLeft } from 'react-icons/fa';
import Tesseract from 'tesseract.js';
import Swal from 'sweetalert2';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet';
import ShareBox from '../components/Sharebox';
import { analytics, logEvent } from '../firebase.js';
import '../App.css';
import { useSpeechSynthesis } from 'react-speech-kit';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PdfJs } from '@react-pdf-viewer/core';
import Alert from '@mui/material/Alert';

function Notespdf() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [ebookContent, setEbookContent] = useState(null);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const { speak, cancel } = useSpeechSynthesis();
    const [isPlaying, setIsPlaying] = useState(false);
    const [speechText, setSpeechText] = useState('');
    const [showShareBox, setShowShareBox] = useState(false);
    const [currentPages, setCurrentPages] = useState(1);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
 
    const openDrawer = () => {
      setDrawerOpen(true);
    };
  
    const closeDrawer = () => {
      setDrawerOpen(false);
    };

    const navigate = useNavigate();

    const isScreenSmall = useMediaQuery('(max-width:626px)');
    const isScreenSmaller = useMediaQuery('(max-width:400px)');

    const defaultScale = isScreenSmall ? 0.8 : 1; 
    const defaultWrap = isScreenSmaller ?  'wrap':'nowrap'; 
    const defaultTool = isScreenSmaller ? '100%': 'auto';

    
    

    function CircularProgressWithLabel(props) {
      return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" {...props} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {`${Math.round(props.value)}%`}
            </Typography>
          </Box>
        </Box>
      );
    }

    useEffect(() => {
        const fetchEbookContent = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/getChapter/${id}`, { cache: 'force-cache' });
                if (!response.ok) {
                    console.error('Response not OK:', response);
                    return;
                }
                const data = await response.json();
                setEbookContent(data);
                //console.log('Data:', data);

                // Set the PDF URL
                setPdfUrl(data?.doc_location);
            } catch (error) {
                console.error('Error fetching eBook content:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEbookContent();
    }, [id]);
    
    const handlePlayClick = async () => {
      const pdf = await getDocument(pdfUrl).promise;
      //console.log(currentPages)
      const page = await pdf.getPage(currentPages+1);
      const textContent = await page.getTextContent();
      const strings = textContent.items.map(item => item.str);
      const text = strings.join(' ');
      //console.log('Text:', text);
      return text;
    };

    const handleSpeak = async () => {
      if (!isLoading && ebookContent) {
        try {
          // If speech synthesis is currently playing, pause it
          if (isPlaying) {
            cancel(); // Stop the speech synthesis
            setIsPlaying(false); // Update the state to indicate that speech synthesis is paused
          } else {
            showLoadingDialog(); // Show loading dialog before starting text extraction
            const voices = window.speechSynthesis.getVoices();
            const pageText = await handlePlayClick(); // Extract text from the current page
            speak({ text: pageText, rate: 0.9 });
            setSpeechText(pageText);
            Swal.close(); // Close loading dialog after text extraction is done
            showPlayingDialog(); // Show playing dialog
            setIsPlaying(true); // Update the state to indicate that speech synthesis is playing
          }
        } catch (error) {
          Swal.close(); // Close loading dialog in case of error
          console.error('Error extracting page text:', error);
          // Handle error
        }
      }
    };

    const handlePageChange = async ({ currentPage }) => {

      setCurrentPages(currentPage);
      
      //console.log('Current pages number:', currentPages);
      //console.log('Current page number:', currentPage);
  
      // Add the current page number to the array
      setPageNumbers([...pageNumbers, currentPage]);
  
      // Calculate the percentage of pages visited
      const uniquePageCount = new Set(pageNumbers).size;
      const percentageVisited = (uniquePageCount / totalPages) * 100;
      //console.log('Percentage of pages visited:', percentageVisited);
  
      // Check if the eBook has been read
  if (percentageVisited >= 30) {
    //console.log('The eBook has been read.');

    // Call the functions to update viewed books and ebook scores
    await updateViewedBooks();
    await updateEbookScores();
}
      // Create an object to store the eBook ID, page numbers, and unique page count
      const ebookData = {
          id: id,
          pageNumbers: pageNumbers,
          uniquePageCount: uniquePageCount,
          percentageVisited: percentageVisited,
          read: percentageVisited >= 30
      };
  
      // Store the object in local storage
      localStorage.setItem('ebookData', JSON.stringify(ebookData));
  
      // Retrieve and print the eBook data from local storage
      const storedEbookData = JSON.parse(localStorage.getItem('ebookData'));
      //console.log('Stored eBook Data:', storedEbookData);

  
  };

  const ebookviewed = ({ doc }) => {
    //console.log('Number of pages:', doc.numPages);
  
    // Store the total number of pages
    setTotalPages(doc.numPages);
  
    // Check if the eBook ID already exists in the local storage
    if (localStorage.getItem('ebookID') !== id) {
      // Store the eBook ID and viewed status in local storage
      localStorage.setItem('ebookID', id);
      localStorage.setItem('viewed', 'true');
  
      // Record the ebook view
      recordEbookView();
    }
  
    // Retrieve and print the eBook ID and viewed status from local storage
    //console.log('eBook ID:', localStorage.getItem('ebookID'));
    //console.log('Viewed:', localStorage.getItem('viewed'));
  }

    const scrollModePluginInstance = scrollModePlugin();
const { SwitchScrollModeButton } = scrollModePluginInstance;

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin({

      sidebarTabs: (defaultTabs) => [
        // Remove the attachments tab (\`defaultTabs[2]\`)
        defaultTabs[0], // Bookmarks tab
        defaultTabs[1], // Thumbnails tab
    ],
        renderToolbar: (Toolbar) => (
          <Toolbar>
          {(props) => {
              const {
                  CurrentPageInput,
                  SwitchTheme,
                  EnterFullScreen,
                  GoToNextPage,
                  GoToPreviousPage,
                  NumberOfPages,
                  SwitchScrollModeMenuItem,
                  ShowSearchPopover,
                  SwitchScrollMode,
                  Zoom,
                  ZoomIn,
                  ZoomOut,
              } = props;
              return (
                <div
              
                style={{
                    alignItems: 'center',
      display: 'flex',
      flexWrap: {defaultWrap}, // Allow the items to wrap as needed
      justifyContent: 'space-between', // Distribute items evenly
      width: '100%',
      height: 'auto', // Adjust height automatically
      backgroundColor: '#ffde5a',
      padding: '10px', // Add some padding
                }}
            >

<div style={{ padding: '0px 2px' }}>
                    <button onClick={() => navigate(`/chapters`)}><FaArrowLeft /></button>
                </div>


                      <div style={{ padding: '0px 2px' }}>
                          <ShowSearchPopover />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                          <ZoomOut />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                          <Zoom />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                          <ZoomIn />
                      </div>
                     <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                        <GoToPreviousPage />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0px 2px' }}>
    <CurrentPageInput /> / <NumberOfPages />
</div>
                    <div style={{ padding: '0px 2px' }}>
                        <GoToNextPage />
                    </div>

                    <div style={{ padding: '0px 2px' }}>
    <button onClick={handleSpeak}><FaPlay /></button>
  </div>

  {!isScreenSmall && (
    <>

  <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                          <EnterFullScreen />
                      </div>
                      <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                          <SwitchTheme />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                <SwitchScrollModeButton mode={ScrollMode.Vertical} />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <SwitchScrollModeButton mode={ScrollMode.Horizontal} />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <SwitchScrollModeButton mode={ScrollMode.Wrapped} />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <SwitchScrollModeButton mode={ScrollMode.Page} />
            </div>
            </>
    )}

  {isScreenSmall && (
        <>
  <Button onClick={openDrawer}>Options</Button>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
                      <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                          <EnterFullScreen />
                      </div>
                      <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                          <SwitchTheme />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                <SwitchScrollModeButton mode={ScrollMode.Vertical} />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <SwitchScrollModeButton mode={ScrollMode.Horizontal} />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <SwitchScrollModeButton mode={ScrollMode.Wrapped} />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <SwitchScrollModeButton mode={ScrollMode.Page} />
            </div>
            </Drawer>
            </>
      )}
                      </div>
              );
          }}
      </Toolbar>
        ),
    });

    const showLoadingDialog = () => {
      Swal.fire({
        title: 'Loading',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        },
        html: 'Processing your request...',
        allowOutsideClick: false,
        showConfirmButton: false,
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
        showConfirmButton: false,
        cancelButtonText: 'Stop',
        allowOutsideClick: false,
        cancelButtonClass: '#ffff00',
        didClose: () => {
          setIsPlaying(false);
        },
      }).then((result) => {
        // If the user clicks the "Stop" button
        if (result.dismiss === Swal.DismissReason.cancel) {
          cancel(); // Stop the speech synthesis
        }
      });
    };

    // Function to send a POST request to update viewed books
const updateViewedBooks = async () => {
  const storedEbookData = JSON.parse(localStorage.getItem('ebookData'));

  if (storedEbookData && storedEbookData.read) {
    try {
      const response = await fetch('https://yeeplatformbackend.azurewebsites.net/updateViewedBooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: auth.currentUser.uid,
          bookId: storedEbookData.id,
        }),
      });
      const data = await response.json();
      //console.log(data); // Log the response from the backend
    } catch (error) {
      console.error('Error updating viewed books:', error);
    }
  }
};

// Function to send a POST request to update ebook scores
const updateEbookScores = async () => {
  const storedEbookData = JSON.parse(localStorage.getItem('ebookData'));

  if (storedEbookData) {
    try {
      const response = await fetch('https://yeeplatformbackend.azurewebsites.net/updateEbookScores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: auth.currentUser.uid,
          bookId: storedEbookData.id,
          score: storedEbookData.percentageVisited,
        }),
      });
      const data = await response.json();
      //console.log(data); // Log the response from the backend
    } catch (error) {
      console.error('Error updating ebook scores:', error);
    }
  }
};

const recordEbookView = async () => {
  try {
    // Get the eBook ID and viewed status from local storage
    const ebookId = localStorage.getItem('ebookID');
    const viewed = localStorage.getItem('viewed');

    const response = await fetch('https://yeeplatformbackend.azurewebsites.net/recordEbookView', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: auth.currentUser.uid,
        ebookId: ebookId,
        //viewed: viewed,
      }),
    });
    const data = await response.json();
    //console.log(data); // Log the response from the backend
  } catch (error) {
    console.error('Error recording ebook view:', error);
  }
};
    /*

    const handleSpeak = async () => {
      if (!isLoading && ebookContent) {
        try {
          // If speech synthesis is currently playing, pause it
          if (isPlaying) {
            cancel(); // Stop the speech synthesis
            setIsPlaying(false); // Update the state to indicate that speech synthesis is paused
          } else {
            showLoadingDialog(); // Show loading dialog before starting text extraction
            const voices = window.speechSynthesis.getVoices();
            const pageText = await extractPageText(currentPage); // Extract text from the current page
            speak({ text: pageText, rate: 0.9 });
            setSpeechText(pageText);
            Swal.close(); // Close loading dialog after text extraction is done
            showPlayingDialog(); // Show playing dialog
            setIsPlaying(true); // Update the state to indicate that speech synthesis is playing
          }
        } catch (error) {
          Swal.close(); // Close loading dialog in case of error
          console.error('Error extracting page text:', error);
          // Handle error
        }
      }
    };
*/

function blobUrlToBase64(url) {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
}

    return (
        <div style={{ height: '100vh' , width: '100%'}}>

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

<style jsx>{`
      @media only screen and (max-width: 500px) {
        /* Styles for mobile devices */
        .pdf-viewer {
          width: 100%;
          height: auto;
        }
      }

      .rpv-core__viewer--loading .rpv-core__viewer-document {
        visibility: hidden;
      }
    `}</style>


            {isLoading ? (
                <div>Loading...</div>
            ) : pdfUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer 
                    transformGetDocumentParams={(options) =>
                      Object.assign({}, options, {
                        url: pdfUrl,
                          disableRange: false,
                          disableStream: false,
                          rangeChunkSize: 65536,
                          disableAutoFetch: false, // Enable pre-fetching of PDF file data
                          disableFontFace: true,
        
                      
                      })
                    }
  scrollMode={ScrollMode.Page}
defaultScale={defaultScale}
onPageChange={handlePageChange}
onDocumentLoad={ebookviewed}

renderLoader={(percentages) => (
  <div>
    <h2 className="text-yellow-500 font-bold">Please wait, it&apos;s coming...</h2>
  <div style={{ width: '100%' }}>
    

      <CircularProgressWithLabel value={Math.round(percentages)} />
  </div>
  </div>
)}
                        plugins={[
                            // Register plugins
                            defaultLayoutPluginInstance, scrollModePluginInstance
                        ]}
                    />
                </Worker>
            ) : (
                <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Alert severity="error">No PDF found.</Alert>
            </div>
</>
            )}
        </div>
    );
}

export default Notespdf;