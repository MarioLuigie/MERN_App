/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  AppBar,
  Typography,
  Toolbar, 
  Avatar,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";

const styles = css`
  .appBar {
    background-color: #0e0e0e;
    padding: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  span {
    color: #58c2ff;
    font-size: 1.5rem;
    font-family: 'Gloria Hallelujah', 'Roboto', sans-serif;
  }

  .brand {

    &__text {
      color: white;
      text-decoration: none;
    }
  }

  .toolbar {

  }

  .profile {

  }

  .purple {

  }

  .userName {

  }

  .logout {
    background-color: #242424;
    color: #ebebeb
  }

  .login {
    background-color: transparent;
    font-family: sans-serif;

    &:hover {
      background-color: transparent;
    }
  }
`

export default function Navbar() {
  const user = null;

  return (
    <div css={styles}>
      <AppBar position="fixed" className="appBar">
        <div className="brand">
          <Typography
            className="brand__text" 
            component={Link} 
            to="/"
            variant="h4" 
            align="left"
          >
            <span>your</span>MEMORIES!
          </Typography>
        </div>
        <Toolbar className="toolbar">
          {user
            ? <div className="profile">
                <Avatar 
                  className="purple" 
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className="userName" variant="h6">
                  {user.result.name}
                </Typography>
                <Button 
                  className="logout"
                  variant="contained" 
                >
                  Logout
                </Button>
              </div>
            : <Button 
                className="login"
                variant="contained"
                component={Link} 
                to="/auth"
              >
                Sign In
              </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}