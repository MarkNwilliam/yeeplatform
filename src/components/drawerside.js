import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Head from 'next/head';
import MList from "../subcomponents/MList.js"
import Mbar from "../subcomponents/Mbar.js"
import {
  useWindowWidth,
} from '@react-hook/window-size'

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      main: '#ffde59',
      
    },
    outline:{
      main: '#fff'
    }
  },
});
const drawerWidth = 240;

 function Drawerside(props) {

  const width = useWindowWidth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

 

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
 

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  const drawer = (
    <div>
<Toolbar />
 <MList />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
    return (
      <ThemeProvider theme={theme}>

<Head>
        <title>Search</title>
        <link rel="icon" href="Y.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
      </Head>

      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     <Mbar drawerWidth ={drawerWidth} 
     handleDrawerToggle ={handleDrawerToggle}
     handleMenu = {handleMenu}
     width = {width}
     open={open} 
//the menu popup
handleClose = {handleClose} 
handleListKeyDown= {handleListKeyDown}
anchorRef={anchorRef.current}
handleToggle={handleToggle}
anchorRef1={anchorRef}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        
       
  

     <h5>Home</h5>


      </Box>
    </Box>
 </ThemeProvider>
    );
  }
  Drawerside.propTypes = {
    window: PropTypes.func,
  };
  
  
export default Drawerside