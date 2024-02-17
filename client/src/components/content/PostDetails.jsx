// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  CircularProgress, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Typography,
  Avatar
} from "@mui/material";
import moment from "moment";

import * as actions from "../../redux/actions/posts";
import { useAppContext } from '../../context/context';

const styles = (navbarHeight) => css`
  padding: 30px 0;
  height: calc(100vh - ${navbarHeight}px);
  margin-top: calc(${navbarHeight}px);
  /* background-color: red; */

  .container {
    /* background-color: green; */
    height: 100%;
  }

  .title {
    padding-top: 30px;
    font-weight: bold;
    line-height: 0.9;
  }

  .info {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .images {
    width: 100%;
    height: 100%;
  }

  .infos {
    height: 100%;
    padding: 30px 15px 30px;
    align-content: stretch;
  }

  .nameWrapper {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .nameText{
    margin: 0;
    line-height: 0;
  }

  .purple {
    font-size: 11px;
    color: black;
    width: 20px;
    height: 20px;
  }

  .btn{
    background-color: black;
    color: white;
    border-color: #1b1b1b;

    &:hover {
      background-color: #1b1b1b;
      border-color: #1b1b1b;
    }
  }
`

export default function PostDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { navbarHeight, user } = useAppContext();

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
    navigate(-1);
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
    <div css={styles(navbarHeight)}>
      <Container maxWidth="lg" className="container">
        <Grid container justifyContent="center" spacing={2} sx={{height: "100%"}}>
          <Grid item xs={12} sm={8}>
            <Paper className="images" elevation={4}>

            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper elevation={4} className="infos">
              <div className="nameWrapper">
                <Avatar 
                  className="purple" 
                  alt={post?.creator?.name}
                  src={""}
                >
                  {post?.creator?.name ? post?.creator?.name.charAt(0) : ""}
                </Avatar>
                <Typography 
                  variant="body2"
                  color="textSecondary" 
                  gutterBottom
                  className="nameText"
                >
                  {post?.name}
                </Typography>
              </div>
              <Typography 
                variant="h3" 
                className="title"
              >
                {post?.title}
              </Typography>

              <Typography 
                variant="overline" 
                color="textSecondary" 
                className="date"
              >
                {formatDate(post?.createdAt)}
              </Typography>

              <Typography variant="body1" pt="25px" gutterBottom>{post?.message}</Typography>

              <Typography 
                variant="body2" 
                pb="25px" 
                pt="25px" 
                color="textSecondary"
              >
                {post?.tags.map(tag => `#${tag},`)}
              </Typography>

              <Typography 
                variant="body2" 
                pb="25px" 
                color="textSecondary"
              >
                {`${post?.likers.length} likers`}
              </Typography>

              <Button 
                className="btn"
                variant="outlined" 
                onClick={handleBack}
                fullWidth
              >
                Back
              </Button>

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}