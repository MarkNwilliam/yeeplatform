import React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import MenuList from '@mui/material/MenuList';

export default function MPopper({ open, anchorRef, handleClose, handleListKeyDown }) {
    // Menu items and their routes
    const menuItems = [
        { label: 'Premium', path: '/Premium' },
        { label: 'Support', path: '/Support' },
        { label: 'Download', path: '/Download' },
    ];

    return (
        <div>
            <Popper
                open={open}
                anchorEl={anchorRef}
                role={undefined}
                placement="bottom-start"
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
                                            style={{ textDecoration: 'none', color: 'inherit' }}  // Remove default link styling
                                        >
                                            <MenuItem 
                                                onClick={handleClose} 
                                                sx={{ 
                                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }  // Add hover effect
                                                }}
                                            >
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
