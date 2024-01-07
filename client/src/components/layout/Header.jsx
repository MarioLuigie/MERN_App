/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Navbar from "../content/Navbar";
import Slider from "../content/Slider";

const styles = css`
`
export default function Header() {

  return (
    <div css={styles}>
      <Navbar />
      <Slider />
    </div>
  )
}