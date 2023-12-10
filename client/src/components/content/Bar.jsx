/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  AppBar,
  Typography,
} from "@mui/material";

const styles = css`
  .appBar {
    background-color: #0e0e0e;
    padding: 15px;
  }

  span {
    color: #52ffbd;
    font-size: 1.5rem;
    font-family: 'Gloria Hallelujah', 'Roboto', sans-serif;
  }
`

export default function Bar() {

  return (
    <div css={styles}>
      <AppBar position="fixed" className="appBar">
        <Typography 
          variant="h4" 
          align="left"
        >
          <span>your</span>MEMORIES!
        </Typography>
      </AppBar>
    </div>
  )
}