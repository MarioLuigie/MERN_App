/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { 
  Container,
  Grow,
  Grid
} from "@mui/material";

import Posts from "../content/Posts";
import Form from "../content/Form";
import Paginate from "../content/Paginate";
import * as actions from "../../redux/actions/posts";

const styles = css`
  padding-top: 135px;

  .paginateWrapper {
    padding: 25px 15px 25px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

export default function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  console.log("Current ID:", currentId);

  useEffect(() => {
    console.log("UseEffect - datas readed.");
    dispatch(actions.getPosts());
  }, [currentId, dispatch]);

  return (
    <div css={styles}>
      <Grow in timeout={700}>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
            <Grid item xs={12} sm={6} lg={9} xl={9}>
              <Posts 
                setCurrentId={setCurrentId}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <Form 
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="paginateWrapper">
                <Paginate />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}