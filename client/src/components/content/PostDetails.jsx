// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Button } from "@mui/material";

import * as actions from "../../redux/actions/posts";

const styles = css`
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default function PostDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post, postsList, isLoading } = useSelector(store => store.posts);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(actions.getPost(params.id));
      setDataLoaded(true);
    }
    fetch();
  }, [params.id]);

  const handleBack = () => {
    navigate("/home");
  }

  if (isLoading || !dataLoaded) {
    return (
      <div css={styles}>
        <CircularProgress />
      </div>
    );
  }

  if (!post || Object.keys(post).length === 0) {
    return (
      <div css={styles}>
        <p>NO DATA...</p>
      </div>
    );
  }

  return (
    <div css={styles}>
      <p>ppp</p>
      <p>{post?.name}</p>
      <p>{post?.title}</p>
      <p>{post?.message}</p>
      <p>{post?.tags.map(tag => `${tag},`)}</p>
      <Button variant="outlined" onClick={handleBack}>Back</Button>
    </div>
  );
}