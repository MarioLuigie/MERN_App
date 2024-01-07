/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Container,
  Typography,
} from "@mui/material";

const styles = css`
  padding: 0 0 90px;
`

export default function Slider() {

  return (
    <div css={styles}>
      <Container maxWidth="sm">
        <Typography 
          variant="h2" 
          align="center" 
          color="textPrimary" 
          gutterBottom
        >
          Let`s share!
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          color="textSecondary" 
          paragraph
        >
          Hello everyone! This is the place for sharing emotions from your live! You may show photos and videos here! Let`s create something special!
        </Typography>
      </Container>
    </div>
  )
}