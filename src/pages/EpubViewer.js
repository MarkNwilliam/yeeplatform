import React, { useState, useRef, useEffect } from 'react';
import { ReactReader,  ReactReaderStyle } from 'react-reader';
import { YELLOW } from '../constants/colors';
import { useParams, useNavigate } from 'react-router-dom';
import { analytics, logEvent } from '../firebase.js';
import { FaSun, FaMoon, FaPlay, FaArrowLeft } from 'react-icons/fa';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import ChatWidget from '../components/ChatWidget.js';
import { auth } from "../firebase";
import axios from 'axios';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2';
//import { Widget, addResponseMessage, toggleMsgLoader } from 'react-chat-widget';
import ReactPlayer from 'react-player';
import { Widget, addResponseMessage, toggleMsgLoader } from '@ryaneewx/react-chat-widget';

function updateTheme(rendition, theme, font) {
  const themes = rendition.themes
  switch (theme) {
    case 'dark': {
      themes.override('color', '#fff')
      themes.override('background-color', '#000') 
      themes.override('font-family', font)
      break
    }
    case 'light': {
      themes.override('color', '#000')
      themes.override('background', '#fff')
      themes.override('font-family', font)
      break
    }
  }
}
const EbookViewer = () => {
  const [largeText, setLargeText] = useState('');
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const rendition = useRef(undefined);
  const { id } = useParams();
  const [ebookContent, setEbookContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [font, setFont] = useState(localStorage.getItem('font') || 'Georgia, serif');
  const [page, setPage] = useState('')
  const [firstChapterLocation, setFirstChapterLocation] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [currentResultIndex, setCurrentResultIndex] = useState(0);
const [isSearching, setIsSearching] = useState(false);
const [searchError, setSearchError] = useState(null);
const [audioUrl, setAudioUrl] = useState(null);
const renditionRef = useRef(null);
const tocRef = useRef(null)
const [visibleText, setVisibleText] = useState('');
const [selections, setSelections] = useState([])

  const fonts = [
    'Georgia, serif', 
    'Arial, sans-serif', 
    'Courier New, monospace',
    'Times New Roman, Times, serif',
    'Verdana, Geneva, sans-serif',
    'Tahoma, Geneva, sans-serif',
    'Trebuchet MS, Helvetica, sans-serif',
    'Lucida Sans Unicode, Lucida Grande, sans-serif',
    'Lucida Sans Unicode',
    'Lucida Grande, sans-serif',
    'Palatino Linotype, Book Antiqua, Palatino, serif',
    'Garamond, serif',
    'Bookman Old Style, serif',
    'Arial Black, Gadget, sans-serif',
    'Comic Sans MS, cursive, sans-serif',
    'Impact, Charcoal, sans-serif',
    'Gill Sans, sans-serif',
    'Franklin Gothic Medium, Arial, sans-serif',
'Consolas, monaco, monospace',
'Courier, monospace',
'Lucida Console, Monaco, monospace',
'Lucida Sans Typewriter, Lucida Console, monaco, Bitstream Vera Sans Mono, monospace',
'American Typewriter, Georgia, serif',
'Andale Mono, AndaleMono, monospace',
'Futura, Century Gothic, AppleGothic, sans-serif',
'Gill Sans, Calibri, Trebuchet MS, sans-serif',
'Helvetica, Arial, sans-serif',
'Impact, Haettenschweiler, Franklin Gothic Bold, Charcoal, Helvetica Inserat, sans-serif',
'Lucida Grande, Lucida Sans, Lucida Sans Unicode, sans-serif',
'Monaco, Consolas, Lucida Console, monospace',
'Optima, Segoe, Candara, Calibri, Arial, sans-serif',
'Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, Georgia, serif',
'Tahoma, Verdana, Segoe, sans-serif',
'TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif',
'Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif',
'Roboto, sans-serif',
'Montserrat, sans-serif'
  ];

  const email = auth.currentUser?.email;

  //console.log('Current user email:', email);
  function setDisplayedText(location) {
    //const cfiRange = `${location.start.cfi},${location.end.cfi}`;
    const splitCfi = location.start.cfi.split('/');
    const baseCfi = splitCfi[0] + '/' + splitCfi[1] + '/' + splitCfi[2] + '/' + splitCfi[3];
    const startCfi = location.start.cfi.replace(baseCfi, '');
    const endCfi = location.end.cfi.replace(baseCfi, '');
    const cfiRange = [baseCfi, startCfi, endCfi].join(',');
    const text = renditionRef.current.getRange(cfiRange).toString();
    console.log('Visible Page CFI Range:', cfiRange);
    console.log('Visible Page Text:', text);
    setLargeText(text);
  }
  function setRenderSelection(cfiRange, contents) {
    //console.log(cfiRange)
    const text = renditionRef.current.getRange(cfiRange).toString();
    console.log('CFI Range:', cfiRange);
    console.log('Selected Text:', text);
  
    setSelections(
      selections.concat({
        text,
        cfiRange
      })
    )
  
    renditionRef.current.annotations.add(
      'highlight',
      cfiRange,
      {},
      null,
      'hl',
      { fill: 'red', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
    )
  
    contents.window.getSelection().removeAllRanges()
  }

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.on('selected', setRenderSelection)
      renditionRef.current.on('relocated', setDisplayedText)
      
      return () => {
        renditionRef.current.off('selected', setRenderSelection)
      }
    }
  }, [setSelections, selections])


  useEffect(() => {
    localStorage.setItem('font', font);
    if (rendition.current) {
      rendition.current.themes.override('font-family', font);
    }
  }, [font]);

  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme, font)
    }
  }, [font])


  useEffect(() => {
    const fetchEbookContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://yeeplatformbackend.azurewebsites.net/getEbook/${id}`
        );
        const data = await response.json();
        setEbookContent(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching eBook content:', error.message);
      } finally {
        setIsLoading(false);
        logEvent(analytics, ebookContent?.title + '_reader_page_visited');
      }
    };

    fetchEbookContent();
  }, [id]);


  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme)
    }
  }, [theme])

  const [location, setLocation] = useState(null);

  /*const handlePlayClick = () => {
    const contents = rendition.current.getContents();
    const text = contents.map(content => content.document.body.textContent).join('\n');
    console.log(text);
  };*/
  const selectLanguage = async () => {
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
  
    return language;
  };
  

  const handlePlayClick = async () => {
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
  
      const book_title = ebookContent.title; // Replace with actual book title
      let processedBookTitle = book_title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  
      try {
        // Make a POST request to the Flask API
        const response = await axios.post('https://yeeplatform.com/server/synthesize', {
          text: largeText,
          book_title: processedBookTitle,
          page_number: page,
          language: language
        }, {
          timeout: 6000000 // Wait for 60 seconds
        });
  
        // Assuming the Flask API returns the audio file URL
        const audioUrl = response.data.audio_url; // Adjust based on your API response structure
  
        // Play the audio
        setAudioUrl("https://yeeplatform.com/server/"+audioUrl);
  
        // Close loading Swal
        Swal.close();
      } catch (error) {
        // Close loading Swal and show error Swal
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        });
        console.error('Error playing audio:', error);
      }
    }
  };


  const backButtonStyle = {
    backgroundColor: YELLOW,
    color: 'black',
    borderRadius: '50%',
    padding: '10px',
    fontSize: '20px',
    position: 'absolute',
    top: '10px',
    left: '10px',
  };

  const buttonStyle = {
    backgroundColor: YELLOW,
    color: 'black',
    borderRadius: '50%',
    padding: '10px',
    fontSize: '20px',
    margin: '10px',
  };


  const handleSearch = async () => {
    if (rendition.current && searchQuery) {
      setIsSearching(true);
      setSearchError(null);
      try {
        const results = await doSearch(searchQuery);
        setSearchResults(results);
      } catch (error) {
        setSearchError(error.message);
      } finally {
        setIsSearching(false);
      }
    }
  };

  // After your search function
function doSearch(q) {
  return Promise.all(
    rendition.current.book.spine.spineItems.map(item => 
      item.load(rendition.current.book.load.bind(rendition.current.book))
        .then(item.find.bind(item, q))
        .finally(item.unload.bind(item))
    )
  ).then(results => {
    // Clear any existing highlights
    rendition.current.annotations.remove();

    results.forEach(result => {
      // Log the chapter
      console.log(result.cfi);
    
      // Highlight the search result
      rendition.current.annotations.highlight(result.cfi, {}, (e) => {
        console.log("highlight clicked", e.target);
      });
    });

    return Promise.resolve([].concat.apply([], results));
  });
}

const handleNext = () => {
  const nextIndex = (currentResultIndex + 1) % searchResults.length;
  const nextResult = searchResults[nextIndex];
  rendition.current.display(nextResult.cfi);
  rendition.current.annotations.highlight(nextResult.cfi, {}, (e) => {
    console.log("highlight clicked", e.target);
  });
  setCurrentResultIndex(nextIndex);
};

const handlePrevious = () => {
  const prevIndex = (currentResultIndex - 1 + searchResults.length) % searchResults.length;
  const prevResult = searchResults[prevIndex];
  rendition.current.display(prevResult.cfi);
  rendition.current.annotations.highlight(prevResult.cfi, {}, (e) => {
    console.log("highlight clicked", e.target);
  });
  setCurrentResultIndex(prevIndex);
};


  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    
    // Show the loading indicator
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
      console.log('Response from backend:', data);
      addResponseMessage(data.response);
    })
    .catch(error => {
      console.error('Error:', error);
      addResponseMessage('Sorry, something went wrong.');
    })
    .finally(() => {
      // Hide the loading indicator
      toggleMsgLoader();
    });
  };


  const locationChanged = location => {
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start
      const chapter = tocRef.current.find(item => item.href === href)
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : 'n/a'
        }`
      )
      console.log(page)
    }
  }

  useEffect(() => {
    locationChanged(location);
  }, [location]);

  return (
    <div style={{ height: '100vh' }}>
      <button style={backButtonStyle} onClick={() => navigate(`/ebooks/${id}`)}>
        <FaArrowLeft /> {/*Back*/}
      </button>
         <button style={buttonStyle} onClick={() => setTheme('light')}>
      <FaSun /> {/*Light Theme*/}
    </button>
    <button style={buttonStyle} onClick={() => setTheme('dark')}>
      <FaMoon /> {/*Dark Theme*/}
    </button>
    <button style={buttonStyle} onClick={handlePlayClick}>
      <FaPlay /> {/*Play*/}
    </button>


    <select value={font} onChange={(e) => setFont(e.target.value)}>
        {fonts.map((fontOption) => (
          <option key={fontOption} value={fontOption}>
            {fontOption}
          </option>
        ))}
      </select>

      <TextField 
  id="outlined-basic" 
  label="Search" 
  variant="outlined" 
  type="text" 
  value={searchQuery} 
  onChange={handleInputChange} 
  style={{ marginTop: '1%', marginRight:  '1%' }} // added top margin and padding
/>

<Button 
  onClick={handleSearch} 
  variant="outlined"
  style={{ marginTop: '20px', padding: '10px' }} // added top margin and padding
>
  Search
</Button>

<div>
  {isSearching ? (
    <p>Searching...</p>
  ) : searchError ? (
    <Alert severity="error">Text not found please search for something else.</Alert>
  ) : searchResults.length > 0 ? (
    <>
      <Button style={{ marginRight:  '1%' }} onClick={handlePrevious} variant="outlined">Previous</Button>
      <Button style={{ marginRight:  '1%' }} onClick={handleNext} variant="outlined">Next</Button>
    </>
  ) : (
    <p>No results found</p>
  )}
</div>
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

      <ReactReader
        title = {ebookContent?.title}
        url={ebookContent?.ebookepubImagesUrl || ebookContent?.ebook_url || ebookContent?.ebookUrl}
        showToc ={true}
        location={firstChapterLocation || location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
        epubInitOptions={{
          openAs: 'epub',
        }}
        readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
        getRendition={(_rendition) => {
          updateTheme(_rendition, theme, font)
          rendition.current = _rendition
          renditionRef.current = _rendition
          renditionRef.current.themes.default({
            '::selection': {
              background: 'orange'
            }
          })
          setSelections([])
        }}
        tocChanged={toc => (tocRef.current = toc)}
      />

<ChatWidget handleNewUserMessage={handleNewUserMessage} />
      
    </div>
  )
}

const lightReaderTheme = {
  ...ReactReaderStyle,
  readerArea: {
    ...ReactReaderStyle.readerArea,
    transition: undefined,
  },
  arrow: {
    ...ReactReaderStyle.arrow,
    color: YELLOW,
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: YELLOW,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: 'black',
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    color: YELLOW,
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    color: YELLOW,
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: 'black',
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: YELLOW,
  },
};

const darkReaderTheme = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: 'white',
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: 'yellow',
  },
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: '#000',
    transition: undefined,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: '#ccc',
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    background: '#111',
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    background: '#222',
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: '#fff',
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: 'white',
  },
};


export default EbookViewer;