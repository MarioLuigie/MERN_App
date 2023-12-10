/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Bar from "../content/Bar";
import Slider from "../content/Slider";

const styles = css`
`
export default function Header() {

  return (
    <div css={styles}>
      <Bar />
      <Slider />
    </div>
  )
}