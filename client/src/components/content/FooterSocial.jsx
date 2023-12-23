// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Grid,
  IconButton,
} from "@mui/material";
import { PropTypes } from "prop-types"

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/Youtube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const styles = css`
  padding-top: 30px;

  @media screen and (min-width: 600px) {
    padding-top: 60px;
  }

  .icon {
    color: white;
  }
`
export default function FooterSocial({
  socialMedia
}) {

  return (
    <Grid item xs={12} align="center" css={styles}>
      <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMedia.facebook} target='_blank' rel="noopener noreferrer">
        <FacebookIcon className="icon" />
      </IconButton>
      <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMedia.instagram} target='_blank' rel="noopener noreferrer">
        <InstagramIcon className="icon" />
      </IconButton>
      <IconButton aria-label="Youtube" color="inherit" component="a" href={socialMedia.youtube} target='_blank' rel="noopener noreferrer">
        <YoutubeIcon className="icon" />
      </IconButton>
      <IconButton aria-label="LinkedIn" color="inherit" component="a" href={socialMedia.linkedIn} target='_blank' rel="noopener noreferrer">
        <LinkedInIcon className="icon" />
      </IconButton>
  </Grid>
  )
}

FooterSocial.propTypes = {
  socialMedia: PropTypes.object
}
