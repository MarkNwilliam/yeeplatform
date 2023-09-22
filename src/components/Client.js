import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Head from 'next/head'
import Button from '@mui/material/Button';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

import MPopper from "./MPopper.js"
import Dlist from "../subcomponents/Dlist.js"
import { useWindowWidth } from '@react-hook/window-size'
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

 function Client(props) {

  const width = useWindowWidth();
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

<Head>
        <title>Dashboard</title>
        <link rel="icon" href="/Y.png" />
      </Head>

      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
    
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'success.main'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        
        


         
{ width < 630 ?

  <IconButton
  class = "mx-20"
                size="large"
                color="inherit"
                ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
              >
  <FormatAlignRightIcon  sx={{ fontSize: 30 }} />     
  </IconButton>
 
: 
<Stack  spacing={2} direction="row" sx={{ flexGrow: 1 }}>
              <Button sx={{ color: '#fff', fontSize: 12 }}>
              Premium
              </Button >
              <Button sx={{ color: '#fff', fontSize: 12}}>
              Support
              </Button>
              <Button sx={{ color: '#fff', fontSize: 12 }}>
            Download
              </Button>

              </Stack>
             }

<MPopper 
open={open} 
//the menu popup
handleClose = {handleClose} 
handleListKeyDown= {handleListKeyDown}
anchorRef={anchorRef.current}
 />
        </Toolbar>
      </AppBar>
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
        
        <div style={{ flex: 3 }}>{props.children}</div>

      </Box>
    </Box>
 </ThemeProvider>
    );
  }
  Client.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
export default Client