import React, { useState, useRef, useEffect } from 'react';
import { ReactReader,  ReactReaderStyle } from 'react-reader';
import { YELLOW } from '../constants/colors';
import { useParams, useNavigate } from 'react-router-dom';
import { analytics, logEvent } from '../firebase.js';
import { FaSun, FaMoon, FaPlay, FaArrowLeft } from 'react-icons/fa';


function updateTheme(rendition, theme) {
  const themes = rendition.themes
  switch (theme) {
    case 'dark': {
      themes.override('color', '#fff')
      themes.override('background', '#000')
      break
    }
    case 'light': {
      themes.override('color', '#000')
      themes.override('background', '#fff')
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
      <ReactReader
        title = {ebookContent?.title}
        url={ebookContent?.ebookepubImagesUrl}
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
        readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
        getRendition={(_rendition) => {
          updateTheme(_rendition, theme)
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