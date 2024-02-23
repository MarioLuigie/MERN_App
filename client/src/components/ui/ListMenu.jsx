// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";

import { 
  Menu,
  IconButton,
  MenuItem
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const styles = css`

`

export default function ListMenu({
  options
}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (option) => () => {
    option.onHandle();
    setAnchorEl(null);
  }

  return (
    <div css={styles}>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          options.map((option, i) => (
            <MenuItem onClick={handleAction(option)} sx={{fontSize: "14px"}} key={i}>
              {option.text}
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}