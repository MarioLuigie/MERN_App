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
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const styles = css`
  /* margin-bottom: 160px; */
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
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .purple {
    font-size: 16px;
    color: black;
    width: 30px;
    height: 30px;
  }

  .userName {
    font-size: 14px;
  }

  .logout {
    background-color: #242424;
    color: #ebebeb;

        &:hover {
      background-color: transparent;
    }
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
  // const user = null;
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  console.log("User auth", user);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div css={styles}>
      <AppBar position="fixed" className="appBar">
        <div className="brand">
          <Typography
            className="brand__text" 
            component={Link} 
            to={user ? "/home" : "/"}
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
                  alt={user.name}
                  src={user.picture}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Typography className="userName" variant="subtitle1">
                  {user.name}
                </Typography>
                <Button 
                  className="logout"
                  variant="contained" 
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    navigate("/auth");
                  }}
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