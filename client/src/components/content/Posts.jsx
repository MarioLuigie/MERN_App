/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Container,
  AppBar,
  Typography,
  Grow,
  Grid
} from "@mui/material";

import Post from "./Post";

const styles = css`


`

export default function Posts() {

  return (
    <div css={styles}>
      <h1>POSTS</h1>
      <Post />
      <Post />
    </div>
  )
}