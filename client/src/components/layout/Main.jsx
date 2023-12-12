/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  Container,
  Grow,
  Grid
} from "@mui/material";

import Posts from "../content/Posts";
import Form from "../content/Form";
import * as actions from "../../redux/actions/posts";

const styles = css`

`
export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UseEffect - datas readed.");
    dispatch(actions.getPosts());
  }, [dispatch]);

  return (
    <div css={styles}>
      <Grow in timeout={700}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
            <Grid item xs={12} sm={6} xl={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={6} xl={5}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}