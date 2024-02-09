import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Dbarlist() {
  return (
    <Stack
      spacing={5}
      direction="row"
      className="hidden lg:flex" // Hide on smaller screens
      sx={{
        marginLeft: 'auto',
      }}
    >
      <Link to="/" className="no-underline text-white hover:text-yellow-300">
        <Typography variant="body2">Home</Typography>
      </Link>
      <Link to="/Permium" className="no-underline text-white hover:text-yellow-300">
        <Typography variant="body2">Permium</Typography>
      </Link>
      <Link to="/Support" className="no-underline text-white hover:text-yellow-300">
        <Typography variant="body2">Support</Typography>
      </Link>
      <Link to="/Download" className="no-underline text-white hover:text-yellow-300">
        <Typography variant="body2">Download</Typography>
      </Link>
    </Stack>
  );
}

export default Dbarlist;
