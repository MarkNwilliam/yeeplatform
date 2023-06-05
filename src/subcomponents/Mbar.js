import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { purple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { blue, yellow, red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import Head from 'next/head';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import Barlist from "./Barlist"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import MPopper from "../components/MPopper.js"

import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

export default function Mbar(props) {
  return (
    <>
     <AppBar 
    
    position="fixed"
    sx={{
      width: { sm: `calc(100% - ${props.drawerWidth}px)` },
      ml: { sm: `${props.drawerWidth}px` },
      bgcolor: 'success.main'
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={props.handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
    

      <Stack 
      
      spacing={2} 
      direction="row">
          <Button  
          variant="outlined"  
          color="outline" 
          class="animate-bounce" 
          sx={{  color: '#fff', fontSize: 12 }}>Sign up</Button>

          <Button  variant="outlined"  color="outline" sx={{ color: '#fff', fontSize: 12 }}>Log in</Button>
          </Stack>
{ props.width < 753 ?

<IconButton
 class = "mx-11"
                size="large"
                color="inherit"
                ref={props.anchorRef1}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={props.handleToggle}
          >
<FormatAlignRightIcon  sx={{ fontSize: 30 }} />     
</IconButton>

: 

<Barlist />
         }
        
      
        <div>
            <Popper
          open={props.open}
          anchorEl={props.anchorRef}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
  <ClickAwayListener onClickAway={props.handleClose}>
                  <MenuList
                    autoFocusItem={props.open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={props.handleListKeyDown}
                  >
                    <MenuItem onClick={props.handleClose}>Premium</MenuItem>
                    <MenuItem onClick={props.handleClose}>Support</MenuItem>
                    <MenuItem onClick={props.handleClose}>Download</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>

    </Toolbar>
  </AppBar>
    </>
  );
}
