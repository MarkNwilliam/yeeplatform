import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Scontent from "../components/Scontent";
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MPopper from "../components/MPopper.js"
import MList from "../subcomponents/MList.js"
import { useWindowWidth } from '@react-hook/window-size';
import Barlist from "../subcomponents/Barlist.js";
import Intro from "../components/intro";
import EbookDetails from "../components/EbookDetails";
import AudiobookDetail from "../components/AudiobookDetail";

import ChapterDetail from "../components/ChapterDetail";
import { useContext } from 'react';
import Ebooks from "./Ebooks"
import Audiobooks from "./Audiobooks"
import Chapters from "./Chapters"
import { AuthContext } from '../contexts/AuthContext';


import {
  Routes,
  Route,
  useLocation,
  Link
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

const StyledSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const drawerWidth = 240;

 function Home(props) {
  const { user, logout } = useContext(AuthContext);


  const location = useLocation();
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
      <MList/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;



  const handleLogout = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        window.location.reload();
      }
    });
  };

    return (
      
      <ThemeProvider theme={theme}>



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
        { location.pathname === "/search" ?
          <StyledSearch>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </StyledSearch>
          :
          <></>
}

        


              <Stack spacing={2} direction="row">
  {user ? (
    <>
      <Link to="/my-account">
  <Button
    variant="outlined"
    color="outline"
    sx={{
      color: '#fff',
      fontSize: 12,
      borderRadius: 20,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }}
  >
    My Account
  </Button>
</Link>
<Button
  variant="outlined"
  color="outline"
  onClick={handleLogout}
  sx={{
    color: '#fff',
    fontSize: 12,
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  }}
>
  Logout
</Button>

    </>
  ) : (
    <>
      <Stack 
          
          spacing={2} 
          direction="row">

            <Link to = "/Signup">
              <Button  variant="outlined"  color="outline" class="animate-bounce" sx={{  color: '#fff', fontSize: 12 }}>Sign up</Button>
              </Link>
              <Link to = "/Signin">
              <Button  variant="outlined"  color="outline" sx={{ color: '#fff', fontSize: 12 }}>Log in</Button>
              </Link>
              </Stack>
    </>
  )}
</Stack>

{ width < 830 ?

<IconButton
  size="large"
  color="inherit"
  ref={anchorRef}
  id="composition-button"
  aria-controls={open ? 'composition-menu' : undefined}
  aria-expanded={open ? 'true' : undefined}
  aria-haspopup="true"
  onClick={handleToggle}
  sx={{
    marginLeft: 'auto',
  }}
>
  <FormatAlignRightIcon sx={{ fontSize: 30 }} />
</IconButton>

 
: 
<Barlist />
             }

<MPopper open={open} 
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
        
       
  

        <Routes>
        <Route path="/" index element = {<Intro />} />
        <Route path="home" index element = {<Intro />} />
        <Route path="search" element={<Scontent />} />
        <Route path="ebooks" element = {<Ebooks />} />
        <Route path="ebooks/:id" element={<EbookDetails />} />
        <Route path="audiobooks" element={<Audiobooks />} />
        <Route path="audiobooks/:id" element={<AudiobookDetail />} />
        <Route path="chapters/:id" element={<ChapterDetail />} />
        <Route path="chapters" element={<Chapters />} />
        </Routes>


      </Box>
    </Box>
 </ThemeProvider>
    );
  }
  Home.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
export default Home
