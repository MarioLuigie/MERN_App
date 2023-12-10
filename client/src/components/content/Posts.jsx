/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from "react-redux";

import Post from "./Post";

const styles = css`

`

export default function Posts() {
  const postsList = useSelector(store => store.postsList);
  console.log(postsList);
  return (
    <div css={styles}>
      <h1>POSTS</h1>
      <Post />
      <Post />
    </div>
  )
}