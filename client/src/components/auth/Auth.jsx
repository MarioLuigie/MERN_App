/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
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

const styles = css`
  padding-bottom: 20px;

  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 30px 10px;
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
    padding: 40px 0 16px;
    width: 100%;
  }

  .submitBtn {
    background-color: black;
    color: white;

    &:hover {
      background-color: #1b1b1b;
    }
  }

  .requestBtn {
    background-color: transparent;
    color: #141414;
    margin-top: 7px;

    &:hover {
      background-color: transparent;
    }
  }
`

export default function Auth() {

  const [ isPasswordHidden, setIsPasswordHidden ] = useState(true);
  const [ isSignUp, setIsSignUp ] = useState(false);

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

  const googleAuthSuccess = credentialResponse => {
    console.log(credentialResponse);
  }

  const googleAuthError = () => {
    console.log('Login Failed');
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
                        label="Repeat Password"
                        type={isPasswordHidden ? "password" : "text"}
                        isAutoFocus={false}
                        isHalf={false}
                        handleChange={handleChange}
                        handleShowPassword={handleShowPassword}
                      />
                    }
                  </Grid>
                  <div className="googleLogin">
                    <GoogleLogin 
                      onSuccess={googleAuthSuccess}
                      onError={googleAuthError}
                    />
                  </div>
                  <Button 
                    className="submitBtn" 
                    type="submit" 
                    fullWidth 
                    variant="contained"
                  >
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                  <Button 
                    className="requestBtn" 
                    type="button" 
                    fullWidth 
                    variant="text"
                    onClick={switchMode}
                  >
                    {isSignUp ? "ALREADY HAVE AN ACCOUNT? SIGN IN" : "DON'T HAVE AN ACCOUNT? SIGN UP"}
                  </Button>
                </form>
              </Paper>
            </Container>
          </Grow>
        </Grid>
      </Grid>
    </div>
  )
}