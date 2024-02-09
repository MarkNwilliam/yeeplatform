import React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import MenuList from '@mui/material/MenuList';
import { HomeIcon, StarIcon, LifebuoyIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';

export default function MPopper({ open, anchorRef, handleClose, handleListKeyDown }) {
    const menuItems = [
        { label: 'Home', path: '/', icon: <HomeIcon className="h-5 w-5 mr-2" /> },
        { label: 'Premium', path: '/Premium', icon: <StarIcon className="h-5 w-5 mr-2" /> },
        { label: 'Support', path: '/Support', icon: <LifebuoyIcon className="h-5 w-5 mr-2" /> },
        { label: 'Download', path: '/Download', icon: <CloudArrowDownIcon className="h-5 w-5 mr-2" /> },
    ];

    return (
        <div style={{ zIndex: 30 }}>
            <Popper
                open={open}
                anchorEl={anchorRef}
                role={undefined}
                placement="bottom-end"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {menuItems.map(item => (
                                        <Link 
                                            to={item.path} 
                                            key={item.label}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <MenuItem 
                                                onClick={handleClose} 
                                                sx={{ 
                                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                                                    padding: '10px 15px', // Increased padding
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontSize: '1rem', // Larger font size
                                                }}
                                            >
                                                {item.icon}
                                                {item.label}
                                            </MenuItem>
                                        </Link>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
