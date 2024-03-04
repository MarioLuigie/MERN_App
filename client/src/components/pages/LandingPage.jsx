/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Container,
  Grow,
  Grid
} from "@mui/material";

import Slider from "../content/Slider";
import videoSource from "../../assets/videos/landingPage02_FHD.mp4";
import jsonData from "../../constants/textContent.json";
import { useAppContext } from '../../context/Context';
import Footer from "../layout/Footer";

const styles = css`
  min-height: 750px;
  background-color: #ececec;
  overflow: hidden;

  .videoWrapper {
    display: flex;
    justify-content: center;
    min-height: 780px;
  }

  .video {
    object-fit: initial;
  }

  .slider {
    width: 100%;
    margin-top: 120px;
    position: absolute;
    z-index: 1;

    @media screen and (min-width: 450px) {
      margin-top: 250px;
    }

    @media screen and (min-width: 500px) {
      margin-top: 400px;
    }

    @media screen and (min-width: 960px) {
      margin-top: 480px;
    }
  }
`

export default function LandingPage() {
  const { landingPage } = jsonData;
  const { user } = useAppContext();

  return (
    <div css={styles}>
      {/* <Container > */}
        <Grid container >
          <Grid item xs={12} sm={12} lg={6}>
            <Grow in timeout={700}>
              <div className="slider">
                <Slider 
                  config={
                    {
                      titleColor: "white", 
                      titleWeight: 700, 
                      contentColor: "#e7e7e7",
                      title: landingPage.title,
                      text: landingPage.text
                    }
                  }
                />
              </div>
            </Grow>
          </Grid>
        </Grid>
        <div style={{backgroundColor: "black"}} className="videoWrapper">
          <video autoPlay loop muted className="video">
            <source src={videoSource} type="video/mp4"/>
          </video>
        </div>
      {/* </Container> */}
      <Footer />
    </div>
  )
}