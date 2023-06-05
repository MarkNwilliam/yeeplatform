
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

export default function MPopper(props) {
    return (
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
                    <Link to = "/Premium">
                    <MenuItem onClick={props.handleClose}>Premium</MenuItem>
                    </Link>
                    <Link to = "/Support">
                    <MenuItem onClick={props.handleClose}>Support</MenuItem>
                    </Link>
                    <Link to = "/Download" >
                    <MenuItem onClick={props.handleClose}>Download</MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>
    )
}
