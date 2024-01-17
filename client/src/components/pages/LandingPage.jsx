/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Container,
  Grow,
  Grid
} from "@mui/material";

import Slider from "../content/Slider";
import videoSource from "../../assets/videos/landingPage01_FHD.mp4";

const styles = css`
  /* padding-top: 160px; */
  min-height: 750px;
  background-color: #ececec;
  overflow: hidden;

  .video {
    object-fit: initial;
  }
`

export default function LandingPage() {

  return (
    <div css={styles}>
      {/* <Container > */}
        {/* <Grid container >
          <Grid item xs={12} sm={12} lg={6}>
            <Grow in timeout={700}>
              <div><Slider /></div>
            </Grow>
          </Grid>
        </Grid> */}
        <div style={{backgroundColor: "black"}}>
          <video autoPlay loop muted className="video">
            <source src={videoSource} type="video/mp4"/>
          </video>
        </div>
      {/* </Container> */}
    </div>
  )
}