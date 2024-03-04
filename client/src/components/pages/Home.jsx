/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { 
  Container,
  Grow,
  Grid
} from "@mui/material";

import Posts from "../content/Posts";
import Paginate from "../content/Paginate";
import MainMenu from "../content/MainMenu";
import * as actions from "../../redux/actions/posts.js";
import { useAppContext } from '../../context/context';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const styles = (navbarHeight) => css`
  margin-top: ${navbarHeight}px;
  /* padding-bottom: 40px; */

  .paginateWrapper {
    padding: 25px 15px 25px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .menuWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 13px 5px;
    /* background-color: green; */
  }
`

export default function Home() {

  const { navbarHeight } = useAppContext();

  const query = useQuery();
  const dispatch = useDispatch();
  const location = useLocation();

  const page = query.get("page") || 1;//odczytanie bieżącego URL z numerem strony
  const searchQuery = query.get("searchQuery"); 
  const tags = query.get("tags"); 

  useEffect(() => {
    dispatch(actions.getPosts({ 
      query: searchQuery, 
      tags: tags,
      page: page || 1
    }));
    setCurrentLocation(`${location.pathname}${location.search}`);
  }, [query, page, tags]);

  const { setCurrentLocation } = useAppContext();

  // setTimeout(() => {
  //   console.log("LOCATION:", currentLocation);
  //   console.log("LOCATION:", location);
  // }, 3000);

  return (
    <div css={styles(navbarHeight)}>
      <Grow in timeout={700}>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
            <Grid item xs={12}>
              <div className="menuWrapper">
                <MainMenu />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Posts />
            </Grid>
            <Grid item xs={12}>
              <div className="paginateWrapper">
                <Paginate page={page} />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}