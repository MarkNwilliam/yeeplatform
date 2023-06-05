import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Dbarlist() {
  return (
    <Stack
      spacing={5}
      direction="row"
      sx={{
        marginLeft: 'auto',
      }}
    >
       <Link to="/">
        <Typography variant="body2" color="white">
          Home
        </Typography>
      </Link>
      <Link to="/Permium">
        <Typography variant="body2" color="white">
          Permium
        </Typography>
      </Link>
      <Link to="/Support">
        <Typography variant="body2" color="white">
          Support
        </Typography>
      </Link>
      <Link to="/Download">
        <Typography variant="body2" color="white">
          Download
        </Typography>
      </Link>
    </Stack>
  );
}

export default Dbarlist;
