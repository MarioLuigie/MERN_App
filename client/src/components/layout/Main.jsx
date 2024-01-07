/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Routes, Route } from "react-router-dom";

import Home from "../content/Home";
import Auth from "../auth/Auth";

const styles = css`

`
export default function Main() {

  return (
    <div css={styles}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}