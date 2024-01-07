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
  Grow,
  TextField
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Slider from "../content/Slider";
import Input from "./Input";

const styles = css`
  padding-bottom: 20px;

  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 30px;
    width: 100%;
  }

  .avatar {
    margin-bottom: 20px;
  }

  .form {
    width: 100%;
    padding: 40px 0;
  }

  .submitBtn {
    background-color: black;
    color: white;
    margin: 35px 0 0;

    &:hover {
      background-color: #1b1b1b;
    }
  }
`

export default function Auth() {
  const isSignup = true;

  const [ isPasswordHidden, setIsPasswordHidden ] = useState(true);

  const handleSubmit = (evt) => {
    evt.preventDefault;
    console.log("Auth form");
  }

  const handleChange = () => {

  }

  const handleShowPassword = () => {
    setIsPasswordHidden(prevState => !prevState);
  }

  return (
    <div css={styles}>
      <Slider />
      <Grow in timeout={700}>
        <Container maxWidth="xs">
          <Paper className="paper" elevation={6}>
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
              {isSignup ? "Sign Up" : "Sign In"}
            </Typography>
            <form className="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input 
                      name="firstName"
                      label="First Name"
                      type="text"
                      isAutoFocus={true}
                      isHalf={false}
                      handleChange={handleChange}
                    />
                    <Input 
                      name="lastName"
                      label="Last Name"
                      type="text"
                      isAutoFocus={false}
                      isHalf={false}
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
                {isSignup && 
                  <Input 
                    name="confirmPassword"
                    label="Confirm Password"
                    type={isPasswordHidden ? "password" : "text"}
                    isAutoFocus={false}
                    isHalf={false}
                    handleChange={handleChange}
                    handleShowPassword={handleShowPassword}
                  />
                }
              </Grid>
              <Button className="submitBtn" type="submit" fullWidth variant="contained">{isSignup ? "Sign Up" : "Sign In"}</Button>
            </form>
          </Paper>
        </Container>
      </Grow>
    </div>
  )
}