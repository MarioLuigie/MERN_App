// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";

import { 
  Menu,
  IconButton,
  MenuItem,
  ButtonBase
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const styles = css`

  .listItem {
    display: flex;
    gap: 8px;
  }

  .icon {
    color: #383838;
  }

  .text {
    color: #202020;
    font-size: 14px;
  }

`

export default function ListMenu({
  options,
  anchor
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
      {!anchor 
        ? <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
        : <ButtonBase onClick={handleClick}>{anchor}</ButtonBase>
      }
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
            <MenuItem onClick={handleAction(option)} key={i}>
              <div css={styles}>
                <div className="listItem">
                  <div className="icon">{option.icon}</div>
                  <div className="text">{option.text}</div>
                </div>
              </div>
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}