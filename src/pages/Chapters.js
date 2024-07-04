import React, { useEffect, useState } from "react";
import ContentCard from "../subcomponents/ContentCard";
import CustomPagination from "../subcomponents/CustomPagination";
import { analytics,logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';
import SearchIcon from '@mui/icons-material/Search';

export default function Chapters() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isLoading, setIsLoading] = useState(true); 
  

  useEffect(() => {
    logEvent(analytics,'chapters_page_visited');
    
    fetchData();
  }, [currentPage, searchTerm]);
  



  const fetchData = async () => {
    setIsLoading(true);
  
    try {
      const url = searchTerm
        ? `https://yeeplatformbackend.azurewebsites.net/search/chapters?title=${searchTerm}&page=${currentPage}&limit=15`
        : `https://yeeplatformbackend.azurewebsites.net/getallchapters?page=${currentPage}&limit=15`;
  
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Data fetching failed with status: ${response.status}`);
  
      const data = await response.json();
      console.log("Response data:", data); // Log the structure of the data
  
      if (data && data.data) {
        if (Array.isArray(data.data)) {
          console.log(data)
          setItems(data.data);
          
          setTotalPages(Math.ceil(data.totalItems / 15));
        } else {
          setItems([data.data]); // Wrap the object in an array
          setTotalPages(1);
        }
      } else {
        setItems([]);
        setTotalPages(0);
      }
      
      
    } catch (error) {
      console.error("Error fetching data:", error);
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
    console.log('Search Term:', searchTerm); 
    fetchData();
  };

  return (
    <div className="flex flex-col items-center p-4">

<Helmet>
  <title>Chapters - Yee FM</title>
  <meta name="description" content="Search and explore chapters on Yee FM. Find your favorite books and start reading now!" />
  <meta name="keywords" content="Yee FM, chapters, search, explore, reading, literature, digital library" />
  <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:title" content="Chapters - Yee FM" />
  <meta property="og:description" content="Search and explore chapters on Yee FM. Find your favorite books and start reading now!" />
  <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:url" content="https://www.yeefm.com/echapters" />
  <meta property="og:type" content="website" />
</Helmet>


      <div className="mb-4 flex flex-col sm:flex-row items-center">

         <input
          type="text"
          placeholder="Search for chapters..."
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

      <CustomPagination totalPages={totalPages} currentPage={currentPage} onChange={handlePageChange} />

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading ? (
          <p className="text-yellow-500 animate-pulse">Loading ebooks...</p>
        ) : (
          items.map((item, index) => (
            <ContentCard
              key={index}
              title={item.title}
              coverImage={item.thumbnailUrl || item.coverImage || item.coverimage}
              itemType={item.doc_location.endsWith('.pdf') ? 'PDF' : item.type}
              itemId={item._id}
              rating={item.rating}
            />
          ))
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
