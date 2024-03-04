/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Auth from "../auth/Auth";
import LandingPage from "../pages/LandingPage";
import PostDetails from '../pages/PostDetails';
import { useAppContext } from '../../context/Context';

const styles = css`

`
export default function Main() {

<<<<<<< HEAD
  const { user, setCurrentId } = useAppContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditPost = (postId) => () => {
    setCurrentId(postId);
  }

  const handleDeletePost = (postId) => () => {
    dispatch(actions.deletePost(postId));
    navigate("/home");
  }

  const postSupport = {
    handleEditPost,
    handleDeletePost
  }
=======
  const { user } = useAppContext();
>>>>>>> 12_CreateAppReducer

  console.log("MAIN");

  return (
    <main css={styles}>
      <Routes>
        <Route exact path="/" element={!user ? <LandingPage /> : <Navigate to="/home" />} />
        <Route exact path="/home" element={!user ? <Auth /> : <Home />} />
        <Route exact path="/home/search" element={!user ? <Auth /> : <Home />} />
        <Route exact path="/auth" element={!user ? <Auth /> : <Navigate to="/home" />} />
        <Route exact path="/home/:id" element={<PostDetails />} />
      </Routes>
    </main>
  )
}