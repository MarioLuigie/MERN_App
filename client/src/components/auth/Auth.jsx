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
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from "@react-oauth/google";

import Input from "./Input";
import * as actions from "../../redux/actions/auth.js";

const styles = css`
  padding-bottom: 45px;
  padding-top: 140px;

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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .googleLoginContent {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }

  .googleLoginText {
    padding-top: 1.5px;
  }

  .googleIcon {
    font-size: 1.2rem;
  }

  .auth-method-seperator {
    font-size: 16px;
    font-weight: 400;
    margin: 1.8em auto;
    position: relative;
    text-align: center;
    width: 100%;
    color: #a7a7a7;
}

  .auth-method-seperator::before,
  .auth-method-seperator::after {
    border-top: 1px solid #a7a7a7;
    content: " ";
    display: inline-block;
    position: absolute;
    top: 0.7em;
    width: 43%;
  }

  .auth-method-seperator::before {
    left: 0;
  }

  .auth-method-seperator::after {
    right: 0;
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
`

export default function Auth({
  config
}) {

  const initFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [ isPasswordHidden, setIsPasswordHidden ] = useState(true);
  const [ isSignUp, setIsSignUp ] = useState(false);
  const [formData, setFormData ] = useState(initFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchMode = () => {
    setIsSignUp(prevState => !prevState);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isSignUp) {
      dispatch(actions.signUp(formData, navigate));
    } else {
      dispatch(actions.signIn(formData, navigate));
    }

    console.log("Sign in - Login and Password", formData);
  }

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  }

  const handleShowPassword = () => {
    setIsPasswordHidden(prevState => !prevState);
  }

  const googleSuccess = async (googleResponse) => {
    console.log(googleResponse);
    try {

      dispatch(actions.signInGoogle(googleResponse, navigate));

    } catch (err) {
      console.log("googleSuccess error:", err);
    }
  }

  const googleError = (err) => {
    console.log('Login Failed', err);
    console.log('Login Failed');
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (googleResponse) => googleSuccess(googleResponse),
    onError: googleError
  })

  return (
    <div css={styles}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
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
                        <Button 
                          onClick={() => googleLogin()}
                          fullWidth
                          variant="outlined"
                        >
                          <div className="googleLoginContent">
                            <p className="googleLoginText">
                              {isSignUp
                                ? "Sign up with Google"
                                : "Sign in with Google"
                              }
                            </p>
                            <GoogleIcon className="googleIcon"/>
                          </div>
                        </Button>
                        <div className="auth-method-seperator">
                          <span>or</span>
                        </div>
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
      </Container>
    </div>
  )
}