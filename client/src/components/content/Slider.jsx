/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropTypes } from "prop-types";
import { 
  Container,
  Typography,
} from "@mui/material";

const styles = css`
  padding: 0 0 90px;
`

export default function Slider({
  config
}) {

  return (
    <div css={styles}>
      <Container maxWidth="sm">
        <Typography 
          variant="h2" 
          align="center" 
          color={config.headingColor} 
          sx={{fontWeight: config.headingWeight}}
          gutterBottom
        >
          <p>Let`s share!</p>
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          color={config.contentColor} 
          paragraph
        >
          Hello everyone! This is the place for sharing emotions from your live! You may show photos and videos here! Let`s create something special!
        </Typography>
      </Container>
    </div>
  )
}

Slider.propTypes = {
  config: PropTypes.object
}