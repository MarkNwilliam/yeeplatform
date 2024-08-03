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
            color: '#FFDE59', 
          },
          "& .Mui-selected": {
            backgroundColor: '#FFDE59', 
            color: 'white', 
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: '#fdd835', 
            color: 'white',
          },
          "& .MuiPaginationItem-ellipsis": {
            color: 'black', 
          },
          "& .Mui-focusVisible": {
            backgroundColor: '#FFDE59',
            color: 'white', 
          },
          "& .MuiPaginationItem-root.Mui-selected:hover, & .MuiPaginationItem-root.Mui-selected.Mui-focusVisible": {
            backgroundColor: '#FFDE59', 
            color: 'white', 
          }
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
