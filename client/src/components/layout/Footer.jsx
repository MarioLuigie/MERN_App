/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Container,
  Grid
} from "@mui/material";

import FooterItem from "../content/footer/FooterItem";
import FooterSocial from "../content/footer/FooterSocial";
import jsonData from "../../constants/textContent.json";

const styles = css`
  background-color: black;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  .links {
    width: 100%;
    padding: 30px 0 40px;
  }

  .info {
    width: 100%;
    max-width: 920px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #868686;
    font-size: 0.8rem;
    font-weight: 100;
    padding: 15px 30px;

    &__content {
      text-align: justify;
      line-height: 1.2rem;
    }
  } 

  .sign {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #868686;
    font-size: 0.7rem;
    font-weight: 100;
    padding: 10px 15px 0;

    &__content {
      text-align: center;
    }
  }

  span {
    font-size: 0.8rem;
  }
`

export default function Footer() {
  const sections = jsonData.footer.sections;

  const powered = jsonData.footer.signature.powered;
  const ver = jsonData.footer.signature.ver;
  const info = jsonData.footer.info;

  const socialMedia = {
    facebook: "#",
    instagram: "#",
    youtube: "https://www.youtube.com/",
    linkedIn: "#",
  }

  return (
    <div css={styles}>
      <div className='links'>
        <Container>
          <Grid container justifyContent='space-between'>
            <FooterItem section={sections.about}/>
            <FooterItem section={sections.contactUs}/>
            <FooterItem section={sections.help}/>
            <FooterSocial socialMedia={socialMedia} />
          </Grid>
        </Container>
      </div>
      <div className="info">
        <p className="info__content">
          {info}
        </p>
      </div>
      <div className="sign">
        <p className="sign__content">
          {powered}
          <span>{ver}</span>
          </p>
      </div>
    </div>
  )
}
