import React, { useState, useRef, useEffect } from 'react';
import { ReactReader,  ReactReaderStyle } from 'react-reader';
import { YELLOW } from '../constants/colors';
import { useParams, useNavigate } from 'react-router-dom';
import { analytics, logEvent } from '../firebase.js';
import { FaSun, FaMoon, FaPlay, FaArrowLeft } from 'react-icons/fa';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


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
  const [largeText, setLargeText] = useState(false);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const rendition = useRef(undefined);
  const { id } = useParams();
  const [ebookContent, setEbookContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [font, setFont] = useState(localStorage.getItem('font') || 'Georgia, serif');

  const [firstChapterLocation, setFirstChapterLocation] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [currentResultIndex, setCurrentResultIndex] = useState(0);
const [isSearching, setIsSearching] = useState(false);
const [searchError, setSearchError] = useState(null);

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

  const handlePlayClick = () => {
    const contents = rendition.current.getContents();
    const text = contents.map(content => content.document.body.textContent).join('\n');
    console.log(text);
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
      <ReactReader
        title = {ebookContent?.title}
        url={ebookContent?.ebookepubImagesUrl || ebookContent?.ebook_url || ebookContent?.ebookUrl}
        showToc ={true}
        location={firstChapterLocation || location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
        tocChanged={(toc) => {
          const firstChapter = toc.find(chapter => chapter.label !== 'Cover');
          if (firstChapter) {
            setFirstChapterLocation(firstChapter.href);
          }
        }}
        readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
        getRendition={(_rendition) => {
          updateTheme(_rendition, theme, font)
          rendition.current = _rendition
        }}
      />
      
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