// CustomPagination.js
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ totalPages, currentPage, onChange }) => {
  return (
    <Stack spacing={2} alignItems="center" className="w-full py-4">
      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={onChange}
        sx={{ 
          "& .MuiPaginationItem-root": {
            color: '#FFDE59', // Yellow text for all items
          },
          "& .Mui-selected": {
            backgroundColor: '#FFDE59', // Yellow background for selected item
            color: 'white', // White text for selected item
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: '#fdd835', // Slightly darker yellow on hover for all items
            color: 'white', // White text on hover for all items
          },
          "& .MuiPaginationItem-ellipsis": {
            color: 'black', // Color for ellipsis (...)
          },
          "& .Mui-focusVisible": {
            backgroundColor: '#FFDE59', // Yellow background for focus state
            color: 'white', // White text for focus state
          },
          "& .MuiPaginationItem-root.Mui-selected:hover, & .MuiPaginationItem-root.Mui-selected.Mui-focusVisible": {
            backgroundColor: '#FFDE59', // Maintain yellow background on hover and focus for selected item
            color: 'white', // Maintain white text on hover and focus for selected item
          }
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
