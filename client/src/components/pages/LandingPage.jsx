/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Container,
  Grow,
  Grid
} from "@mui/material";

import Slider from "../content/Slider";

const styles = css`
  padding-top: 160px;
  min-height: 750px;
  background-color: #ececec;
`

export default function LandingPage() {

  return (
    <div css={styles}>
      <Container >
        <Grid container >
          <Grid item xs={12} sm={12} lg={6}>
            <Grow in timeout={700}>
              <div><Slider /></div>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}