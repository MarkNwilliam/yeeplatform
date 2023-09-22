import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import BookIcon from '@mui/icons-material/Book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function MList() {
  return (
    <div>
      <Avatar
        src="Y.png"
        sx={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          textAlign: 'center',
          mx: 'auto',
          mt: -5
        }}
      />
      <List>
        {[
          {
            name: 'Home',
            path: 'home',
            value: "1",
            icon: <HomeIcon />
          },
          {
            name: 'Search',
            path: 'search',
            value: "2",
            icon: <SearchIcon />
          },
          {
            name: 'Your PlayList',
            path: '',
            value: "3",
            icon: <PlaylistAddCheckIcon />
          },

          {
            name: 'Audiobooks',
            path: 'audiobooks',
            icon: <AudiotrackIcon />
          },
          {
            name: 'Ebooks',
            path: 'ebooks',
            icon: <BookIcon />
          },
          {
            name: 'Chapters',
            path: 'chapters',
            icon: <LibraryBooksIcon />
          },
          {
            name: 'Magazines',
            path: '/',
            icon: <MenuBookIcon />
          },
          {
            name: 'Comics',
            path: '/',
            icon: <LibraryBooksIcon />
          },
        ].map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <Link to={text.path}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {[
          {
            name: 'Create PlayList',
            path: '/',
            icon: <PlaylistAddIcon />
          },
          {
            name: 'Liked Books',
            path: '/',
            icon: <FavoriteIcon />
          },
        ].map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 35 }}>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {[
          { name: 'Facebook', icon: <FacebookIcon /> },
          { name: 'Twitter', icon: <TwitterIcon /> },
          { name: 'Instagram', icon: <InstagramIcon /> },
          { name: 'LinkedIn', icon: <LinkedInIcon /> },
        ].map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 35 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
