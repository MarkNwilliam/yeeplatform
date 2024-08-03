import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Viewer, Worker ,ScrollMode} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {auth} from '../firebase.js';
import { getDocument } from 'pdfjs-dist';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {  FaPlay, FaArrowLeft } from 'react-icons/fa';
import { PdfJs } from '@react-pdf-viewer/core';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import ShareBox from '../components/Sharebox';
import { analytics, logEvent } from '../firebase.js';
import '../App.css';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ChatWidget from '../components/ChatWidget.js';
import { addResponseMessage, toggleMsgLoader } from '@ryaneewx/react-chat-widget';
import axios from 'axios';
import ReactPlayer from 'react-player';


import Draggable from 'react-draggable';

function EbookReaderPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [ebookContent, setEbookContent] = useState(null);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPages, setCurrentPages] = useState(1);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
 
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

    const email = auth.currentUser?.email;
    
    const handleNewUserMessage = (newMessage) => {
      toggleMsgLoader();
  
      fetch('https://yeeplatform.com/server/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ebook_id: ebookContent._id,
          query: newMessage,
          user_id: email || 'guest',
          title: ebookContent.title ||  'test',
          Description: ebookContent.Description || 'test'
        })
      })
      .then(response => response.json())
      .then(data => {
        
        addResponseMessage(data.response);
      })
      .catch(error => {
        //console.error('Error:', error);
        addResponseMessage('Sorry, something went wrong.');
      })
      .finally(() => {
        // Hide the loading indicator
        toggleMsgLoader();
      });
    };

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
                const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/getEbook/${id}`, { cache: 'force-cache' });
                if (!response.ok) {
                    //console.error('Response not OK:', response);
                    return;
                }
                const data = await response.json();
                setEbookContent(data);
                ////console.log('Data:', data);

                // Set the PDF URL
                setPdfUrl(data?.ebookUrl);
                //console.log(data?.ebookUrl);
            } catch (error) {
                //console.error('Error fetching eBook content:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEbookContent();
    }, [id]);
    
    const handlePlayClick = async () => {
      const pdf = await getDocument(pdfUrl).promise;
      const page = await pdf.getPage(currentPages+1);
      const textContent = await page.getTextContent();
      const strings = textContent.items.map(item => item.str);
      const text = strings.join(' ');
     
      return text;
    };

    const handleTTSClick = async () => {
      const pageText = await handlePlayClick();
      // Cancel the currently playing audio
      setAudioUrl(null);
    
      // Ask for language selection
      const { value: language } = await Swal.fire({
        title: 'Select language',
        html: `
        <form id="languageForm" style="display: flex; flex-direction: column; align-items: start;">
            <label><input type="radio" name="language" value="eng"> English</label><br>
            <label><input type="radio" name="language" value="swh"> Swahili</label><br>
            <label><input type="radio" name="language" value="spa"> Spanish</label><br>
            <label><input type="radio" name="language" value="arz"> Arabic</label><br>
            <label><input type="radio" name="language" value="fra"> French</label><br>
            
          </form>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const radios = document.getElementById('languageForm').elements['language'];
          let selectedLanguage;
          for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              selectedLanguage = radios[i].value;
              break;
            }
          }
          return selectedLanguage;
        }
      });
    
      if (language) {
        // Show loading Swal
        Swal.fire({
          title: 'Loading...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
    
        const book_title = ebookContent.title;
        let processedBookTitle = book_title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
       
        try {
      
          const response = await axios.post('https://yeeplatform.com/server/synthesize', {
            text: pageText,
            book_title: processedBookTitle,
            page_number: currentPages.toString(),
            language: language
          }, {
            timeout: 6000000 
          });
    
      
          const audioUrl = response.data.audio_url;
    
          // Play the audio
          setAudioUrl("https://yeeplatform.com/server/"+audioUrl);
    
         
          Swal.close();
        } catch (error) {
          
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          });
          //console.error('Error playing audio:', error);
        }
      }
    };
  

    const handlePageChange = async ({ currentPage }) => {

      setCurrentPages(currentPage);
      
  
      // Add the current page number to the array
      setPageNumbers([...pageNumbers, currentPage]);
  
      // Calculate the percentage of pages visited
      const uniquePageCount = new Set(pageNumbers).size;
      const percentageVisited = (uniquePageCount / totalPages) * 100;
  
      // Check if the eBook has been read
  if (percentageVisited >= 30) {
    ////console.log('The eBook has been read.');

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
  };

  const ebookviewed = ({ doc }) => {
  
    // Store the total number of pages
    setTotalPages(doc.numPages);
  
    // Check if the eBook ID already exists in the local storage
    if (localStorage.getItem('ebookID') !== id) {
     
      localStorage.setItem('ebookID', id);
      localStorage.setItem('viewed', 'true');
  
      // Record the ebook view
      recordEbookView();
    }
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
                  ShowSearchPopover,
                  Zoom,
                  ZoomIn,
                  ZoomOut,
              } = props;
              return (
                <div
              
                style={{
                    alignItems: 'center',
      display: 'flex',
      flexWrap: {defaultWrap}, 
      justifyContent: 'space-between', 
      width: '100%',
      height: 'auto',
      backgroundColor: '#ffde5a',
      padding: '10px', 
                }}
            >

<div style={{ padding: '0px 2px' }}>
                    <button onClick={() => navigate(`/ebooks/${id}`)}><FaArrowLeft /></button>
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
    <button onClick={handleTTSClick}><FaPlay /></button>
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
   
    } catch (error) {
    //console(error)
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
     
    } catch (error) {
      //console.error('Error updating ebook scores:', error);
    }
  }
};

const recordEbookView = async () => {
  try {
    // Get the eBook ID and viewed status from local storage
    const ebookId = localStorage.getItem('ebookID');
    

    const response = await fetch('https://yeeplatformbackend.azurewebsites.net/recordEbookView', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: auth.currentUser.uid,
        ebookId: ebookId,
       
      }),
    });
  } catch (error) {
    //console(error)
  }
};

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
              ebookContent?.coverImage_optimized_url ||
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

{audioUrl && (
  <Draggable>
    <div style={{
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      backgroundColor: 'transparent',
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <ReactPlayer url={audioUrl} controls playing />
      <button onClick={() => setAudioUrl(null)} style={{
        marginTop: '10px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer'
      }}>Cancel</button>
    </div>
  </Draggable>
)}
            {isLoading ? (
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
               Loading...
             </div>
            ) : pdfUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer 
                    fileUrl={pdfUrl}
                    transformGetDocumentParams={/**
                    * @param {PdfJs.GetDocumentParams} options
                    */
                    (options) => {
                      const newOptions = Object.assign({}, options, {
                        disableRange: false,
                        disableStream: true,
                        disableAutoFetch: true, 
                      });
                      return newOptions;
                    }
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

<ChatWidget handleNewUserMessage={handleNewUserMessage} />
        </div>
    );
}

export default EbookReaderPage;
