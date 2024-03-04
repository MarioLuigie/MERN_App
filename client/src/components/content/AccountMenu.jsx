// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu,
  IconButton,
  MenuItem,
  ButtonBase,
  Divider, 
  Typography,
  createTheme,
  ThemeProvider
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Switch from '@mui/material/Switch';

import Creator from "../ui/Creator";


const styles = css`

  .listItem {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 0.5;
    padding: 6px 0;
    width: 280px;

    &--mode {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
    }
  }

  .iconTextWrapper {
    display: flex;
    align-items: center;
    line-height: 0.5;
    gap: 8px;
  }

  .icon {
    color: #383838;
  }

  .text {
    color: #202020;
    font-size: 14px;

    &--logout {
      font-weight: bold;
      font-size: 16px;
    }
  }

  .info {
    display: flex;
    justify-content: center;
    padding: 15px 15px 0px 15px;

    &--footer {
      padding: 0;
    }
  }

  .link {
    text-decoration: none;
    color: #969696;
    line-height: 1.5;

    &:hover {
      color: black;
    }
  }
`

export default function ListMenu({
  options,
  anchor
}) {
  const [ isDarkMode, setIsDarkMode ] = useState(false);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = () => {
    options.logout();
    setAnchorEl(null);
  }

  const handleSwitchMode = (evt) => {
    setIsDarkMode(evt.target.checked);
    console.log("Switch mode", isDarkMode);
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
        <MenuItem onClick={() => {console.log("Profile")}}>
          <div css={styles}>
            <div className="listItem">
              <div className="icon"><AccountBoxIcon fontSize="medium" /></div>
              <div className="text">Profile</div>
            </div>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {console.log("Account settings")}}>
          <div css={styles}>
            <div className="listItem">
              <div className="icon"><TuneIcon fontSize="small" /></div>
              <div className="text">Account settings</div>
            </div>
          </div>
        </MenuItem>
        <div css={styles}>
          <div className="listItem--mode">
            <div className="iconTextWrapper">
              <div className="icon">
                <NightlightIcon fontSize="small" />
              </div>
              <div className="text">
                Dark mode
              </div>
            </div>
            <div>
              <Switch {...label} 
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: "#222222"},
                  "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {backgroundColor: "#000000"}
                }}
                inputProps={{"aria-label": "dark mode switch"}}
                name="darkModeSwitch"
                checked={isDarkMode}
                onChange={handleSwitchMode}
              />
            </div>
          </div>
        </div>
        <MenuItem onClick={() => {console.log("Help and Support")}}>
          <div css={styles}>
            <div className="listItem">
              <div className="icon"><ContactSupportIcon fontSize="small" /></div>
              <div className="text">Help and Support</div>
            </div>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleAction}>
          <div css={styles}>
            <div className="listItem">
              <div className="icon"><LogoutIcon fontSize="small" /></div>
              <div className="text text--logout">Log out</div>
            </div>
          </div>
        </MenuItem>
        <Divider />
        <div css={styles}>
          <div className="info">
            <Typography variant="caption" component={Link} className="link">Privacy&nbsp;</Typography>
            <Typography variant="caption" component={Link} className="link">Statute&nbsp;</Typography>
            <Typography variant="caption" component={Link} className="link">Advertisement&nbsp;</Typography>
            <Typography variant="caption" component={Link} className="link">Cookies</Typography>
          </div>
          <div className="info info--footer">
            <Typography variant="caption" component={Link} className="link">yourEditorials 2024</Typography>
          </div>
        </div>
      </Menu>
    </div>
  )
}