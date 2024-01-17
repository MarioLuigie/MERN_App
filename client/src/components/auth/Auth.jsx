/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Avatar,
  Button,
  Paper,
  Grid,
  Container,
  Grow
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GoogleLogin } from "@react-oauth/google";

import Slider from "../content/Slider";
import Input from "./Input";
import * as actions from "../../redux/actions/auth.js";

const styles = css`
  padding-bottom: 20px;

  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 30px 20px;
    width: 100%;
  }

  .avatar {
    margin-bottom: 20px;
  }

  .form {
    width: 100%;
    padding: 40px 0 15px;
  }

  .googleLogin {
    width: 100%;

    &__line {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #a7a7a7;
      padding: 30px 0 15px;
    }
  }

  .submitBtnWrapper {
    padding-top: 50px;
  }

  .submitBtn {
    background-color: black;
    color: white;

    &:hover {
      background-color: #1b1b1b;
    }
  }

  .requestBtnWrapper {
    padding-top: 5px;
  }

  .requestBtn {
    background-color: transparent;
    color: #141414;

    &:hover {
      background-color: transparent;
    }
  }

  .custom-google-login-button .MuiButton-height {
    height: 50px;
  }
`

export default function Auth() {

  const [ isPasswordHidden, setIsPasswordHidden ] = useState(true);
  const [ isSignUp, setIsSignUp ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchMode = () => {
    setIsSignUp(prevState => !prevState);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Auth form");
  }

  const handleChange = () => {

  }

  const handleShowPassword = () => {
    setIsPasswordHidden(prevState => !prevState);
  }

  const googleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    try {
      dispatch(actions.downloadToken(credentialResponse));
      navigate("/home");
    } catch (err) {
      console.log("googleSuccess error:", err);
    }
  }

  const googleError = (err) => {
    console.log('Login Failed', err);
    console.log('Login Failed');
  }

  const handleClickGoogleBtn = () => {
    console.log("Google button clicked");
  }

  return (
    <div css={styles}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={6}>
          <Grow in timeout={700}>
            <div><Slider /></div>
          </Grow>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Grow in timeout={700}>
            <Container maxWidth="xs">
              <Paper className="paper" elevation={6}>
                <Avatar className="avatar">
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form className="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item className="googleLogin">
                      <GoogleLogin 
                        onSuccess={(credentialResponse) => googleSuccess(credentialResponse)}
                        onError={googleError}
                        click_listener={handleClickGoogleBtn}
                        width="335"
                        size="large"
                        logo_alignment="center"
                        text="signin_with"
                        theme="outline"
                        locale="yi_US"
                        ux_mode="popup"
                        cookiePolicy="single_host_origin"
                        className="custom-google-login-button"
                      />
                      <div className="googleLogin__line">or</div>
                    </Grid>
                    {isSignUp && (
                      <>
                        <Input 
                          name="firstName"
                          label="First Name"
                          type="text"
                          isAutoFocus={true}
                          isHalf={true}
                          handleChange={handleChange}
                        />
                        <Input 
                          name="lastName"
                          label="Last Name"
                          type="text"
                          isAutoFocus={false}
                          isHalf={true}
                          handleChange={handleChange}
                        />
                      </>
                    )}
                    <Input 
                      name="email"
                      label="Email"
                      type="email"
                      isAutoFocus={false}
                      isHalf={false}
                      handleChange={handleChange}
                    />
                    <Input 
                      name="password"
                      label="Password"
                      type={isPasswordHidden ? "password" : "text"}
                      isAutoFocus={false}
                      isHalf={false}
                      handleChange={handleChange}
                      handleShowPassword={handleShowPassword}
                    />
                    {isSignUp && 
                      <Input 
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        isAutoFocus={false}
                        isHalf={false}
                        handleChange={handleChange}
                      />
                    }
                  </Grid>
                  <div className="submitBtnWrapper">
                  <Button 
                      className="submitBtn" 
                      type="submit" 
                      fullWidth 
                      variant="contained"
                    >
                      {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                  </div>
                  <div className="requestBtnWrapper">
                    <Button 
                      className="requestBtn" 
                      type="button" 
                      fullWidth 
                      variant="text"
                      onClick={switchMode}
                    >
                      {isSignUp ? "ALREADY HAVE AN ACCOUNT? SIGN IN" : "DON'T HAVE AN ACCOUNT? SIGN UP"}
                    </Button>
                  </div>
                </form>
              </Paper>
            </Container>
          </Grow>
        </Grid>
      </Grid>
    </div>
  )
}