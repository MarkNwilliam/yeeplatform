import React, { useState, useEffect } from "react";
import ContentCard from "../subcomponents/ContentCard";
import CustomPagination from "../subcomponents/CustomPagination";
import { analytics, logEvent } from '../firebase.js';
import { Helmet } from 'react-helmet';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function Audiobooks() {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    logEvent(analytics, 'audiobooks_page_visited');
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const url = searchTerm
        ? `https://yeeplatformbackend.azurewebsites.net/search/audiobooks?title=${searchTerm}&page=${currentPage}&limit=15`
        : `https://yeeplatformbackend.azurewebsites.net/getallaudiobooks?page=${currentPage}&limit=15`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Data fetching failed with status: ${response.status}`);

      const data = await response.json();
      //console.log("Response data:", data); // Log the structure of the data

      if (data && data.data) {
        if (Array.isArray(data.data)) {
          setResults(data.data);
          setTotalPages(Math.ceil(data.totalItems / 15));
        } else {
          setResults([data.data]); // Wrap the object in an array
          setTotalPages(1); // Update total pages to 1
        }
      } else {
        setResults([]);
        setTotalPages(0);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }

    setIsLoading(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setCurrentPage(1)
    //console.log('Search Term:', searchTerm);
    fetchData();
  };

  const handleRefreshClick = () => {
    setCurrentPage(1);
    fetchData();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Helmet>
        <title>Audiobooks - Yee FM</title>
        <meta name="description" content="Search and listen to audiobooks on Yee FM." />
        <meta name="keywords" content="Yee FM, audiobooks, search, listen, literature, digital library" />
        <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
        <meta property="og:title" content="Audiobooks - Yee FM" />
        <meta property="og:description" content="Search and listen to audiobooks on Yee FM." />
        <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
        <meta property="og:url" content="https://www.yeefm.com/audiobooks" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mb-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Search for audiobooks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 mb-2 sm:mb-0"
          style={{ width: "100%", maxWidth: "300px" }}
        />

        <button
          onClick={handleSearchClick}
          className="ml-0 sm:ml-2 p-3 border border-gray-300 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 flex items-center justify-center"
          style={{ minWidth: "100px" }}
        >
          <SearchIcon /> {/* Search icon */}
        </button>
        </div>
        {error && (
          <button 
            onClick={handleRefreshClick}
            className="ml-0 sm:ml-2 p-3 border border-gray-300 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
            style={{ minWidth: "100px" }}
          >
            <RefreshIcon /> {/* Refresh icon */}
          </button>
        )}

      

      <CustomPagination totalPages={totalPages} currentPage={currentPage} onChange={handlePageChange} />

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading ? (
         <CircularProgress className="text-yellow-500 animate-pulse" color="inherit" />
        ) :  results.length > 0 ? (
          results.map((audiobook, index) => (
            <ContentCard
              key={index}
              title={audiobook.title}
              coverImage={ audiobook.thumbnailUrl || audiobook.coverImage || audiobook.coverimage}
              itemType="audiobook"
              itemId={audiobook._id}
              rating={audiobook.ratings}
            />
          ))
        ): (
         
          <div className="flex justify-center items-center w-full">
          <Alert severity="warning" className="w-full">No results were found for your search. Please check your spelling or search for another term</Alert>
        </div>
        )}
      </div>
     

      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
