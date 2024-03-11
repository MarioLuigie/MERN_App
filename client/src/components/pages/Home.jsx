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

import Posts from "../content/posts/Posts";
import Paginate from "../content/Paginate";
import MainMenu from "../content/mainMenu/MainMenu";
import * as actions from "../../redux/actions/posts.js";
import * as app from "../../redux/actions/app.js";
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
    padding: 20px 0 0;
    margin-bottom: 18px;
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

    dispatch(app.updateLastHomePagination(`${location.pathname}${location.search}`));

    if (location.pathname === "/home") dispatch(app.updateCurrentImageIndex(0));
    
  }, [query, page, tags]);

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
            <Grid item xs={12} sx={{"&.MuiGrid-item": {paddingTop: "0px"}}}>
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