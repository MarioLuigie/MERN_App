// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppContext } from '../../../context/context';
import { 
  Typography,
  TextField,
  Avatar,
  IconButton
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import * as actions from "../../../redux/actions/posts.js";
import Comment from "./Comment";

const styles = css`
  padding-top: 15px;

  .commentsTitle {
    padding-left: 20px;
    font-size: 18px;
  }

  .commentsWrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 10px;
    min-height: 250px;
    max-height: 250px;
    height: 100%;
    overflow: auto;
    border-radius: 5px;
    padding-bottom: 10px;
  }

  .inputWrapper {
    display: flex;
    gap: 5px;
    padding: 20px 30px 0 20px;
  }

  .input {
    width: 100%;
  }

  .purple {
    font-size: 14px;
    color: black;
    width: 30px;
    height: 30px;
  }

  .sendBtnWrapper {
    display: flex;
    justify-content: flex-end;
  }
`

export default function Comments({
  post
}) {
  const { user } = useAppContext();
  const dispatch = useDispatch();
  const [commentValue, setCommentValue ] = useState("");

  const handleChange = (evt) => {
    setCommentValue(evt.target.value);
  }

  const handleComment = () => {
    dispatch(actions.commentPost(post._id, {authorId: user?.result?._id, content: commentValue}));

    setCommentValue("");
  }

  return (
    <div css={styles}>
      <Typography variant="body1" className="commentsTitle">Comments</Typography>
      <div className="commentsWrapper">
        {post.comments?.map((comment, i) => (
          <Comment 
            post={post}
            comment={comment} 
            key={i} 
          />
        ))}
      </div>
      <div className="inputWrapper">
        <Avatar 
          className="purple" 
          alt={user?.result?.name}
          src={`${user?.result?.picture}`}
        >
          {!user.result.picture ? user?.result?.name.charAt(0) : ""}
        </Avatar>
        <div className="input">
          <TextField 
            fullWidth
            value={commentValue}
            onChange={handleChange}
            placeholder='Write a comment'
          />
          <div className="sendBtnWrapper">
            <IconButton onClick={handleComment} title="Comment">
              <SendIcon sx={{color: "black"}} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}