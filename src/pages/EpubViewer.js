import React, { useState, useRef, useEffect } from 'react';
import { ReactReader,  ReactReaderStyle } from 'react-reader';
import { YELLOW } from '../constants/colors';
import { FaSun, FaMoon, FaPlay } from 'react-icons/fa';

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
  const rendition = useRef(undefined);


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
  

  return (
    <div style={{ height: '100vh' }}>
         <button onClick={() => setTheme('light')}>
      <FaSun /> Light Theme
    </button>
    <button onClick={() => setTheme('dark')}>
      <FaMoon /> Dark Theme
    </button>
    <button onClick={handlePlayClick}>
      <FaPlay /> Play
    </button>
      <ReactReader
        title="test"
        url="https://yeeplatform.blob.core.windows.net/yeeebooks/34344/pg34344.epub"
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