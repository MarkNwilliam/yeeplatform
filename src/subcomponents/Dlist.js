import * as React from 'react';

import List from '@mui/material/List';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import Avatar from '@mui/material/Avatar';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import UploadIcon from '@mui/icons-material/Upload';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EditIcon from '@mui/icons-material/Edit';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

export default function MList() {
    return (
        <div>
            <Avatar
  src="/Y.webp"
  sx={{ width: 50,
     height: 50 , 
    justifyContent: 'center',
    textAlign: 'center',
    mx: 'auto',
   mt: -5
          }}
/>
      <List>
        {[
          {
        name:'Upload Ebook',
        path:'/dashboard/Upload',
        
       icon: <UploadIcon  />
        },
        {
        name:'Upload Audio',
        path:'/dashboard/Audio',
        
        icon: <AudiotrackIcon  />
        },
        
        {
          name:'Upload Audio Chapter',
          path:'/dashboard/AudioChapter',
          
          icon: <SpatialAudioIcon  />
          },

        {
          name:'Write Chapter',
          path:'/dashboard/Write',
          
          icon: <EditIcon  />
          }, 
        
        {
        name:'My Audios',
        path:'/dashboard/MyAudios',
        
        icon: <VolumeMuteIcon  />
        },
       
        {
  name: 'My Books',
  path: '/dashboard/MyBooks',
  icon: <LibraryBooksIcon />,
},
{
  name: 'My Chapters',
  path: '/dashboard/MyChapters',
  icon: <BookIcon />,
},
{
        name:'Statistics',
        path:'/dashboard/Statistics',
       
        icon: <BarChartIcon   />
        },
       
       
    ].map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <Link to = {text.path}>
            <ListItemButton>
              <ListItemIcon>
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
        name:'Profile',
        path:'/dashboard/Profile',
        value:"3",
        icon: <PersonIcon  />
        }, 
              {
        name: 'News',
        path:'/dashboard/News',
        icon: <NewspaperIcon  />
        },
            {
        name:'NFTs',
        path:'/dashboard/Nfts',
        icon: <CurrencyBitcoinIcon  />
        },
        {
name: "Support",
path:'/dashboard/AuthorSupport',
icon: <AlternateEmailIcon />
        },
        
            ].map((text, index) => (
          <ListItem key={text.name} disablePadding>
             <Link to = {text.path}>
            <ListItemButton>
              <ListItemIcon>
             {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
        </div>
    )
}
