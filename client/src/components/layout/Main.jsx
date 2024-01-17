/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Auth from "../auth/Auth";
import LandingPage from "../pages/LandingPage";

const styles = css`
`
export default function Main() {

  return (
    <div css={styles}>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}