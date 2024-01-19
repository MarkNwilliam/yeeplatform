import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Scontent from "../components/Scontent";
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Head from 'next/head'
import Button from '@mui/material/Button';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import MPopper from "../components/MPopper.js"
import MList from "../subcomponents/MList.js"
import { useWindowWidth } from '@react-hook/window-size';
import Barlist from "../subcomponents/Barlist.js";




const drawerWidth = 240;

 function Search(props) {

  const width = useWindowWidth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
 

  
  

    return (
      <ThemeProvider>



  

    <Scontent/>


   
 </ThemeProvider>
    );
  }

  
export default Search