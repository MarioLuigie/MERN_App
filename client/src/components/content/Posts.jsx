/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import { PropTypes } from "prop-types";

import Post from "./Post";

const styles = css`
  .postsContainer {

  }

  .progress {
    display: flex;
    justify-content: center;
  }
`

export default function Posts({
  setCurrentId
}) {
  const postsList = useSelector(store => store.postsList);

  console.log(postsList);
  
  return (
    <div css={styles}>
      {postsList.length 
        ? (
            <Grid 
              container 
              className="postsContainer" 
              alignItems="stretch" 
              spacing={3}
            >
              {postsList.map((post) => (
                <Grid item xs={12} sm={12} lg={6} key={post._id}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
          )
        : <div className="progress"><CircularProgress /></div> 
      }
    </div>
  )
}

Posts.propTypes = {
  setCurrentId: PropTypes.func
}