import React, { useEffect, useState } from "react";
import ContentCard from "../subcomponents/ContentCard";
import CustomPagination from "../subcomponents/CustomPagination";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function Scontent() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
  
    
  
    fetchData();
  }, [currentPage, searchTerm]);
  
  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true when fetching starts
    try {
      const url = searchTerm 
        ? `https://yeeplatformbackend.azurewebsites.net/search?term=${searchTerm}&page=${currentPage}&limit=15`
        : `https://yeeplatformbackend.azurewebsites.net/getallcontent?page=${currentPage}&limit=15`;
  
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Data fetching failed with status: ${response.status}`);
  
      const data = await response.json();
      console.log("Response data:", data);
  
      setItems(data.data); // Set items to the 'data' array within the response
      setTotalPages(Math.ceil(data.totalItems / 15)); // Use 'totalItems' for pagination calculation
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false); // Set loading state to false when fetching ends
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    fetchData(); // Trigger data fetching when search button is clicked
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 flex flex-col sm:flex-row items-center">
        <input
          type="text"
          placeholder="Search for content..."
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

      {/* Pagination at the top */}
      <CustomPagination totalPages={totalPages} currentPage={currentPage} onChange={handlePageChange} />

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading ? (
          <p className="text-yellow-500 animate-pulse">Loading content...</p> // Display loading message when there is no content
        ) : (
          items.map((item, index) => (
            <ContentCard
              key={index}
              title={item.title}
              coverImage={item.thumbnailUrl || item.coverImage || item.coverimage}
              itemType={item.type || 'unknown'}
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
