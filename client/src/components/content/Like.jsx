// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  IconButton
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffIcon from '@mui/icons-material/ThumbUpOffAlt';

import { useAppContext } from '../../context/context.jsx';
import LikersList from "./LikersList.jsx";
import * as actions from "../../redux/actions/posts.js";

const styles = css`

 .button {
  color: black;
  padding: 5px;
 }

 .likes {
  display: flex;
  align-items: center;
  font-size: 0.86rem;
 }

 .likesNumbWrapper {
  position: relative;
  cursor: pointer;
  padding: 5px 10px 5px 0;
 }
`

export default function Like({
  post
}) {
  const { user } = useAppContext();
  const [ isLiked, setIsLiked ] = useState(false);
  const [ isLikersListHidden, setIsLikersListHidden ] = useState(true);
  const dispatch = useDispatch();

  let youAsLiker = "";
  let otherUsers = "users";

  
  useEffect(() => {
    setIsLiked((post.likers.findIndex((liker) => String(liker._id) === String(user?.result?._id))) !== -1);
    // console.log("ISLIKED:", isLiked, post);
  }, [post]);

  const checkLikersList = (userId) => {
    const isUserLiker = post.likers.some(liker => liker._id === userId);
  
    if (isUserLiker) {
      youAsLiker = "You and ";
      otherUsers = post.likers.length - 1 > 1 
        ? "users" 
        : (post.likers.length - 1 === 1 
            ? "user" 
            : ""
          );
    } else {
      youAsLiker = "";
      otherUsers = "";
    }
  }

  const likePost = () => {
    dispatch(actions.likePost(post._id));
  }

  const handleMouseOver = (evt) => {
    evt.stopPropagation();
    setIsLikersListHidden(false);
    // console.log("Like mouse over");
  }

  const handleMouseOut = (evt) => {
    evt.stopPropagation();
    setIsLikersListHidden(true);
    // console.log("Like mouse out");
  }

  return (
    <div css={styles}>
      <div className="likes">
        <IconButton className="button" size="small" onClick={likePost}>
          {isLiked
            ? <ThumbUpIcon />
            : <ThumbUpOffIcon />
          }
        </IconButton>
        <div 
          className="likesNumbWrapper"
          onMouseOver={handleMouseOver} 
          onMouseOut={handleMouseOut}
        >
          <p>
            {checkLikersList(user?.result?._id)}
            {youAsLiker 
              ? `${youAsLiker} ${post.likers.length - 1} ${otherUsers}`
              : `${post.likers.length}`
            }
          </p>
          {isLikersListHidden || post.likers.length === 0
            ? null
            : <LikersList likers={post.likers}/>
          }
        </div>
      </div>
    </div>
  )
}