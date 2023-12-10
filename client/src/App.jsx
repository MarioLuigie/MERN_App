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
import { useSelector } from "react-redux";

import Posts from "./components/content/Posts";
import Form from "./components/content/Form";

const styles = css`
  .appBar {
    background-color: #0e0e0e;
    padding: 15px;
  }

  span {
    color: #52ffbd;
    font-size: 1.5rem;
    font-family: 'Gloria Hallelujah', 'Roboto', sans-serif;
  }
`

export default function App() {
  const postsList = useSelector(store => store.postsList);

  console.log(postsList);

  return (
    <div css={styles}>
      <Container maxWidth="lg">
        <AppBar position="fixed" className="appBar">
          <Typography variant="h4" align="left"><span>your</span>MEMORIES!</Typography>
        </AppBar>
        {postsList.map((post, i) => (
          <div style={{marginTop: "100px"}} key={i}>
            <p>{post}</p>
          </div>
        ))}
      </Container>
    </div>
  )
}

