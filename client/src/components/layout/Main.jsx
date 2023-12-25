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
import * as actions from "../../redux/actions/posts";

const styles = css`

`
export default function Main() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  console.log("Current ID:", currentId);

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
              <Posts 
                setCurrentId={setCurrentId}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={5}>
              <Form 
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}