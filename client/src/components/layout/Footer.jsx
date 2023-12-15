/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  BottomNavigation, 
  BottomNavigationAction,
} from "@mui/material";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/Youtube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


import FooterItem from "../content/FooterItem";
import FooterSocial from "../content/FooterSocial";
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

  .sign {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 7px;
    color: #cecece;
    font-size: 0.6rem;
    font-weight: 100;
  }

  p {
    text-align: center;
  }

  span {
    font-size: 0.8rem;
  }
`

export default function Footer() {
  const sections = jsonData.footer.sections;

  const house = jsonData.footer.signature.house;
  const rights = jsonData.footer.signature.rights;
  const powered = jsonData.footer.signature.powered;
  const ver = jsonData.footer.signature.ver;

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
      <div className='sign'>
        <p>
          {house}
          <span>{rights}</span>
          {powered}
          <span>{ver}</span>
          </p>
      </div>
    </div>
  )
}
