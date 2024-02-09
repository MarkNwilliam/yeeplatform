import React, { useEffect, useState } from "react";
import ContentCard from "../subcomponents/ContentCard";
import CustomPagination from "../subcomponents/CustomPagination";
import { Link } from 'react-router-dom';

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
    setIsLoading(true);
  
    try {
      const url = searchTerm
        ? `http://localhost:3000/search/ebooks?title=${searchTerm}&page=${currentPage}&limit=15`
        : `http://localhost:3000/getallebooks?page=${currentPage}&limit=15`;
  
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Data fetching failed with status: ${response.status}`);
  
      const data = await response.json();
      console.log("Response data:", data); // Log the structure of the data
  
      if (data && data.data) {
        if (Array.isArray(data.data)) {
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
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search for ebooks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          style={{ width: "300px" }}
        />
        <button 
          onClick={handleSearchClick}
          className="ml-2 p-3 border border-gray-300 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          style={{ minWidth: "100px" }}
        >
          Search
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
              itemType="ebook"
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
