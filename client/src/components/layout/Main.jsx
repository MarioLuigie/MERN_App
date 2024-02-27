/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Routes, Route, Navigate} from "react-router-dom";
import { useState } from "react";
import  { useDispatch } from "react-redux";

import Home from "../pages/Home";
import Auth from "../auth/Auth";
import LandingPage from "../pages/LandingPage";
import PostDetails from '../content/PostDetails/PostDetails';
import { useAppContext } from '../../context/context';
import * as actions from "../../redux/actions/posts.js";

const styles = css`

`
export default function Main() {

  const { user } = useAppContext();

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const handleEditPost = (postId) => (evt) => {
    evt.stopPropagation();
    setCurrentId(postId);
  }

  const handleDeletePost = (postId) => () => {
    dispatch(actions.deletePost(postId));
  }

  const postSupport = {
    currentId,
    setCurrentId,
    handleEditPost,
    handleDeletePost
  }

  return (
    <main css={styles}>
      <Routes>
        <Route exact path="/" element={!user ? <LandingPage /> : <Navigate to="/home" />} />
        <Route exact path="/home" element={!user ? <Auth /> : <Home postSupport={postSupport} />} />
        <Route exact path="/home/search" element={!user ? <Auth /> : <Home postSupport={postSupport} />} />
        <Route exact path="/auth" element={!user ? <Auth /> : <Navigate to="/home" />} />
        <Route exact path="/home/:id" element={<PostDetails postSupport={postSupport} />} />
      </Routes>
    </main>
  )
}