// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  CircularProgress, 
  Container, 
  Grid
} from "@mui/material";
import moment from "moment";

import * as actions from "../../../redux/actions/posts";
import { useAppContext } from '../../../context/context';
import GalleryDetails from "./GalleryDetails";
import Gallery from "./Gallery";

const styles = (navbarHeight) => css`
  /* padding: 30px 0; */
  height: calc(100vh - ${navbarHeight}px);
  min-height: calc(100vh - ${navbarHeight}px);
  max-height: calc(100vh - ${navbarHeight}px);
  margin-top: calc(${navbarHeight}px);
  width: 100%;
  /* background-color: red; */

  .gridContainer {
    max-height: calc(100vh - ${navbarHeight}px);
  }

  .gridItem {
    max-height: calc(100vh - ${navbarHeight}px);
  }

  .container {
    /* background-color: green; */
    height: 100%;
    padding-top: 10px;
    width: 100%;
    max-width: 1920px;
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
    const fetchPost = async () => {
      await dispatch(actions.getPost(params.id));
      setDataLoaded(true);
    }
    fetchPost();
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
      <Container className="container">
        <Grid container justifyContent="center" spacing={2} className="gridContainer">
          <Grid item xs={12} sm={12} md={7} lg={8} xl={9} className="gridItem">
            <Gallery post={post} />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4} xl={3} >
            <GalleryDetails 
              post={post} 
              handleBack={handleBack} 
              formatDate={formatDate}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}