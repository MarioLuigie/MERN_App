/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import { PropTypes } from "prop-types";

import Post from "./Post";

const styles = css`
  padding-bottom: 20px;
  
  .postsContainer {

  }

  .progress {
    display: flex;
    justify-content: center;
  }
`

export default function Posts({
  postSupport
}) {
  const { postsList, isLoading } = useSelector(store => store.posts);

  // console.log(postsList);

  if (!postsList?.length && !isLoading) {
    return (
      <div css={styles}>
        <p>No posts...</p>
      </div>
    )
  }
  
  return (
    <div css={styles}>
      {!isLoading
        ? (
            <Grid 
              container 
              className="postsContainer" 
              alignItems="stretch" 
              spacing={3}
            >
              {postsList?.map((post) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                  <Post post={post} postSupport={postSupport} />
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