/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropTypes } from "prop-types";
import { 
  Container,
  Typography,
  Button,
  Grid
} from "@mui/material";
import { Link } from "react-router-dom";

const styles = css`
  .title {
    line-height: 1;
    font-size: 65px;
  }

  .button {
    color: black;
    background-color: #FFDA2A;
    width: 150px;
    height: 50px;
    font-size: 19px;
  }
`

export default function Slider({
  config
}) {

  return (
    <div css={styles}>
      <Container maxWidth="md">
        <Typography 
          className="title"
          variant="h2" 
          align="left" 
          color={config.titleColor} 
          sx={{fontWeight: config.titleWeight, textShadow: config.titleShadow}}
          gutterBottom
        >
          <p>{config.title}</p>
        </Typography>
        <Typography 
          variant="h5" 
          align="left" 
          color={config.contentColor} 
          sx={{textShadow: config.contentShadow}}
          paragraph
        >
          {config.text}
        </Typography>
        <Grid align="left" pt="15px">
          <Button 
            variant="contained" 
            className="button"
            component={Link}
            to="/auth"
          >
            Sign in
          </Button>
        </Grid>
      </Container>
    </div>
  )
}

Slider.propTypes = {
  config: PropTypes.object
}