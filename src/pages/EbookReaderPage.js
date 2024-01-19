import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import ShareBox from '../components/Sharebox';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


const EbookReaderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ebookContent, setEbookContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showShareBox, setShowShareBox] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const fetchEbookContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/getEbook/${id}`);
        const data = await response.json();
        setEbookContent(data);
      } catch (error) {
        console.error('Error fetching eBook content:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEbookContent();
  }, [id]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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

  const pageWidth = window.innerWidth * 0.9 * zoom;

  return (
    <div className="container mx-auto mt-8 p-4 flex flex-col bg-yellow-100">
      <div className="flex items-center mb-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleGoBack}
        >
          {'< Back'}
        </button>
        <h1 className="text-3xl font-bold text-yellow-800">{ebookContent?.title}</h1>
      </div>
      <div className="w-full max-w-screen-md mx-auto bg-white rounded-lg shadow-md p-6 flex-1">
        <div className="flex justify-between mb-4">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleNextPage}
            disabled={currentPage === ebookContent?.totalPages}
          >
            Next Page
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleZoomIn}
          >
            Zoom In
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleZoomOut}
          >
            Zoom Out
          </button>
        </div>
        <div className="w-full h-full overflow-auto" onMouseUp={handleTextSelection}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-yellow-300 h-24 w-24"></div>
            </div>
          ) : (
            <Document file={ebookContent?.ebookUrl} renderMode="webgl">
              <Page pageNumber={currentPage} width={pageWidth} height={600 * zoom} renderTextLayer={true}/>
            </Document>
          )}
        </div>
      </div>
      {showShareBox && <ShareBox shareUrl={window.location.href} selectedText={selectedText} />}
    </div>
  );
};

export default EbookReaderPage;
