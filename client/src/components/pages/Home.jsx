/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Container,
  Grow,
  Grid
} from "@mui/material";

import Posts from "../content/Posts";
import Form from "../content/Form";
import Paginate from "../content/Paginate";
import Search from "../content/Search";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const styles = css`
  padding-top: 110px;
  /* padding-bottom: 40px; */

  .searchWrapper {
    padding: 15px 15px 35px;
  }

  .searchInputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .searchTitle {
    display: flex;
    gap: 5px;
    align-items: center;
    padding-bottom: 18px;
  }

  .paginateWrapper {
    padding: 25px 15px 25px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

export default function Home() {

  const [currentId, setCurrentId] = useState(null);
  const [ tags, setTags ] = useState([]);
  
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const page = query.get("page") || 1;//odczytanie bieżącego URL z numerem strony
  const searchQuery = query.get("searchQuery"); 

  // console.log("Current ID:", currentId);
  // console.log("CHIPS***:", chips);

  // useEffect(() => {
  //   // console.log("UseEffect - datas readed.");
  //   dispatch(actions.getPosts());
  // }, [currentId, dispatch]);

  return (
    <div css={styles}>
      <Grow in timeout={700}>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
            {/* {(!searchQuery && !tags.length) 
              && (
                <Grid item xs={12}>
                  <div className="paginateWrapper">
                    <Paginate page={page} />
                  </div>
                </Grid>
              )
            } */}
            <Grid item xs={12}>
              <div className="paginateWrapper">
                <Paginate page={page} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
              <Posts 
                setCurrentId={setCurrentId}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <Search tags={tags} setTags={setTags} />
                </Grid>
                <Grid item xs={12} >
                  <Form 
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* {(!searchQuery && !tags.length) 
              && (
                <Grid item xs={12}>
                  <div className="paginateWrapper">
                    <Paginate page={page} />
                  </div>
                </Grid>
              )
            } */}
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