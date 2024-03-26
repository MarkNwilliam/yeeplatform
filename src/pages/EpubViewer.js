import React, { useState , useRef, useEffect} from 'react'
import { ReactReader } from 'react-reader'


 const EbookViewer = () => {
  
  const [largeText, setLargeText] = useState(false)
  const rendition = useRef(undefined)
  useEffect(() => {
    rendition.current?.themes.fontSize(largeText ? '140%' : '100%')
  }, [largeText])

    // And your own state logic to persist state
    const [location, setLocation] = useState(null)
    const [firstRenderDone, setFirstRenderDone] = useState(false)
    const renditionRef = useRef(null)
    
  return (
    <div style={{ height: '100vh' }}>
      <ReactReader
      location={location}
    
        title="test"
        url="https://yeeplatform.blob.core.windows.net/yeeebooks/34344/pg34344.epub"
        getRendition={rendition => (renditionRef.current = rendition)}
      />
    </div>
  )
}

export default EbookViewer;