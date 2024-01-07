/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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

import Slider from "../content/Slider";

const styles = css`
  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .avatar {

  }
`

export default function Auth() {
  const isSignup = false;

  return (
    <div css={styles}>
      <Slider />
      <Container maxWidth="xs">
        <Paper className="paper" elevation={3}>
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        </Paper>
      </Container>
    </div>
  )
}