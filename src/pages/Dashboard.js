import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types'
import DNews from "../components/DNews";
import Upload from "../components/DUpload";
import DSupport from "../components/DSupport";
import DStats from "../components/DStats";
import DWrite from "../components/DWrite";
import DNft from "../components/DNft";
import DProfile from "../components/DProfile";
import DAudio from "../components/DAudio";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dbar from "../subcomponents/Dbar.js"
import Mybooks from "../components/Mybooks"
import MyChapters from "../components/MyChapters"
import MyAudios from "../components/MyAudios"
import Dlist from "../subcomponents/Dlist.js"
import { useWindowWidth } from '@react-hook/window-size'
import {
  Routes,
  Route
} from "react-router-dom";

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

 function Dashboard(props, {Component, pageProps}) {

  
  

  const swidth = useWindowWidth();
  

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  
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
      <Dlist/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


    return (
      <ThemeProvider theme={theme}>



      <Box sx={{ display: 'flex' }}>
   
      <Dbar 
     handleDrawerToggle ={handleDrawerToggle}
    width = {swidth}
    drawerWidth={drawerWidth}
//the menu popup
handleClose = {handleClose} 
handleListKeyDown= {handleListKeyDown}
anchorRef={anchorRef.current}
handleToggle={handleToggle}
anchorRef1={anchorRef}
      />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
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
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
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
     

        <Routes>
        <Route path="/" index element = {<DNews />} />
        <Route path="Upload"  element = {<Upload />} />
        <Route path="Write" element={<DWrite />} />
        <Route path="Profile" element={<DProfile />} />
        <Route path="News" index element = {<DNews />} />
        <Route path="Audio" index element = {<DAudio />} />
        <Route path="Nfts" index element = {<DNft />} />
        <Route path="AuthorSupport" index element = {<DSupport />} />
        <Route path="Statistics" index element = {<DStats />} />
        <Route path="Mybooks" index element = {<Mybooks />} />
        <Route path="MyAudios" index element = {<MyAudios />} />
        <Route path="MyChapters" index element = {<MyChapters />} />
        </Routes>

      </Box>
    </Box>
 </ThemeProvider>
    );
  }
  Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
export default Dashboard
