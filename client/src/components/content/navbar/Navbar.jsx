/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  AppBar,
  Typography,
  Toolbar,
  Button
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { useAppContext } from '../../../context/context.jsx';
import * as type from "../../../constants/actions.js";
import * as app from "../../../redux/actions/app.js";
import jsonData from "../../../constants/textContent.json";
import LoggedUser from "../../ui/Creator.jsx";
import AccountMenu from "../navbar/AccountMenu.jsx";

const styles = css`

  .appBar {
    background-color: black;
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .your {
    /* color: #58c2ff; */
    color: #FFDA2A;
    font-size: 1.5rem;
    font-family: 'Gloria Hallelujah', 'Roboto', sans-serif;
  }

  .editorials {
    font-weight: bold;
  }

  .brand {
    padding-left: 20px;
    
    &__text {
      color: #f0f0f0;
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
  const { navbar } = jsonData;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navbarRef = useRef(null);

  const { user } = useSelector(store => store.app);

  const { navbarHeight, setNavbarHeight } = useAppContext();
  // console.log("User auth", user);

  const logout = () => {
    dispatch({type: type.LOGOUT})
    navigate("/");
    // setUser(null);
    dispatch(app.setUser(null));
  }

  useEffect(() => {

    // console.log("NAVBAR HEIGHT STATE:", navbarHeight);
    // console.log("NAVBAR HEIGHT:", navbarRef.current.clientHeight);
    // console.log("NAVBAR HEIGHT:", navbarRef.current);

    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        const height = navbarRef.current.clientHeight;
        setNavbarHeight(height);
      }
    };
    
    updateNavbarHeight();

    const resizeObserver = new ResizeObserver(updateNavbarHeight);
    if (navbarRef.current) {
      resizeObserver.observe(navbarRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };

  }, [navbarHeight]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    // setUser(JSON.parse(localStorage.getItem("profile")));
    dispatch(app.setUser(JSON.parse(localStorage.getItem("profile"))));
  }, [location]);

  return (
    <div css={styles}>
      <AppBar position="fixed" className="appBar" ref={navbarRef}>
        <div className="brand">
          <Typography
            className="brand__text desk" 
            component={Link} 
            to={user ? "/home?page=1" : "/"}
            variant="h4" 
            align="left"
          >
            <span className="your">{navbar.title1}</span><span className="editorials">{navbar.title2}</span>
          </Typography>
          <Typography
            className="brand__text mobile" 
            component={Link} 
            to={user ? "/home?page=1" : "/"}
            variant="h4" 
            align="left"
          >
            <span className="your">{navbar.title1Short}</span><span className="editorials">{navbar.title2Short}</span>
          </Typography>
        </div>
        <Toolbar className="toolbar">
          {user
            ? <div className="profile">
                <AccountMenu 
                  options={{
                    logout: logout
                  }}
                  anchor={
                    <LoggedUser 
                      user={user?.result}
                      textColor="white"
                      textSize="16px"
                      purpleSize="25px"
                    />
                  }
                />
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