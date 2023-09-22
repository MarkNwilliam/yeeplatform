import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import Barlist from "./Barlist.js"
import MPopper from "../components/MPopper.js"
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

export default function Bbar() {

    const Swidth = useWindowWidth();
   
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

  return (
    <>
     <ThemeProvider theme={theme}>
 <AppBar 
    
    position="fixed"
    sx={{
      
      bgcolor: 'success.main'
    }}
  >
    <Toolbar>

   <Link to = "/">
<Avatar
 href = "/"
  src="Y.png"
  sx={{ width: 30, height: 30 }}
/>

</Link>


    <Divider />
   
      <Stack 

class="ml-8"
      sx={{ mx: 10 }}
              spacing={3} 
      direction="row">
          <Button href="/Signup" variant="outlined"  color="outline" class="animate-bounce " sx={{  color: '#fff', fontSize: 12 }}>Sign up</Button>

          <Button href="/Signin"  variant="outlined"  color="outline"  sx={{ color: '#fff', fontSize: 12 }}>Log in</Button>
          </Stack>
          
{ Swidth < 830 ?

<IconButton
class=" ml-12 "
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
  </ThemeProvider>
    </>
  );
}
