/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styles = css`
  background-color: black;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .sign {
    color: #cecece;
    font-size: 0.6rem;
    font-weight: 100;
    position: absolute;
    bottom: 7px;
  }
`

export default function Footer() {

  return (
    <div css={styles}>
      <p className="sign">ARWcode 2023 &copy; Powered by MUI and MERN stack</p>
    </div>
  )
}