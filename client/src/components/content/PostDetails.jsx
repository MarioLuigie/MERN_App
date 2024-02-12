// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const styles = css`
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default function PostDetails() {

  const params = useParams();

  const { postsList } = useSelector(store => store.posts);

  const post = postsList?.find(post => post._id === params.id);

  console.log("***:", post)

  return (
    <div css={styles}>
      <p>{post?.name}</p>
      <p>{post?.title}</p>
      <p>{post?.message}</p>
      <p>{post?.tags.map(tag => `${tag},`)}</p>
    </div>
  )
}