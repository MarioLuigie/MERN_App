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
          sx={{fontWeight: config.headingWeight, textShadow: config.headingShadow}}
          gutterBottom
        >
          <p>{config.title}</p>
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          color={config.contentColor} 
          sx={{textShadow: config.contentShadow}}
          paragraph
        >
          {config.text}
        </Typography>
      </Container>
    </div>
  )
}

Slider.propTypes = {
  config: PropTypes.object
}