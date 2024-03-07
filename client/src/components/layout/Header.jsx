/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Navbar from "../content/navbar/Navbar";

const styles = css`
`
export default function Header() {

  return (
    <div css={styles}>
      <Navbar />
    </div>
  )
}