// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Button, Container, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";

import * as actions from "../../redux/actions/posts";
import { useAppContext } from '../../context/context';

const styles = css`
  min-height: 800px;
  padding-top: 100px;

  .container {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
  }
`

export default function PostDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentLocation } = useAppContext();

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
    navigate(currentLocation);
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''; 
  
    const formattedDate = moment(dateString).format('DD MMMM YYYY');
  
    return formattedDate;
  };

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
      <Container >
        <Grid container className="container">
          <Typography variant="h2">{post?.title}</Typography>
          <Typography variant="overline" color="textSecondary">{formatDate(post?.createdAt)}</Typography>
          <Typography gutterBottom>{post?.name}</Typography>
          <Typography variant="h6" pt="50px">{post?.message}</Typography>
          <Typography variant="body2" pb="50px" color="textSecondary">{post?.tags.map(tag => `#${tag},`)}</Typography>
          <Typography variant="body2" pb="50px" color="textSecondary">{`${post?.likers.length} likers`}</Typography>
          <Button variant="outlined" onClick={handleBack}>Back</Button>
        </Grid>
      </Container>
    </div>
  );
}