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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { useAppContext } from '../../context/context.jsx';
import { auth as type } from "../../constants/actionTypes.js";

const styles = css`

  .appBar {
    background-color: #0e0e0e;
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  span {
    /* color: #58c2ff; */
    color: #FFDA2A;
    font-size: 1.5rem;
    font-family: 'Gloria Hallelujah', 'Roboto', sans-serif;
  }

  .brand {

    &__text {
      color: #f0f0f0;
      text-decoration: none;
      padding-left: 20px;
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

  .signin {
    background-color: transparent;
    font-family: sans-serif;
    display: flex;
    gap: 6px;

    &:hover {
      background-color: transparent;
    }
  }

  .desk {
    display: none;

    @media screen and (min-width: 600px) {
      display: block;
    }
  }

  .mobile {
    display: block;

    @media screen and (min-width: 600px) {
      display: none;
    }
  }
`

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, setUser } = useAppContext();
  console.log("User auth", user);

  const logout = () => {
    dispatch({type: type.LOGOUT})
    navigate("/");
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div css={styles}>
      <AppBar position="fixed" className="appBar">
        <div className="brand">
          <Typography
            className="brand__text desk" 
            component={Link} 
            to={user ? "/home" : "/"}
            variant="h4" 
            align="left"
          >
            <span>your</span>MEMORIES!
          </Typography>
          <Typography
            className="brand__text mobile" 
            component={Link} 
            to={user ? "/home" : "/"}
            variant="h4" 
            align="left"
          >
            <span>your</span>M!
          </Typography>
        </div>
        <Toolbar className="toolbar">
          {user
            ? <div className="profile">
                <Avatar 
                  className="purple" 
                  alt={user?.result.name}
                  src={user?.result?.picture}
                >
                  {user?.result?.picture ? "" : user?.result.name.charAt(0)}
                </Avatar>
                <Typography className="userName" variant="subtitle1">
                  {user?.result.name}
                </Typography>
                <Button 
                  className="logout"
                  variant="contained" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            : <div>
                <Button 
                  className="signin"
                  variant="contained"
                  component={Link} 
                  to="/auth"
                >
                  <AccountCircleIcon sx={{fontSize: 27, color: "#999999"}} />
                  Sign In
                </Button>
              </div>
            }
        </Toolbar>
      </AppBar>
    </div>
  )
}