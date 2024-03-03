// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppContext } from '../../../context/Context';
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
  padding-top: 5px;
  height: 100%;

  .commentsTitle {
    padding-left: 20px;
    padding-bottom: 10px;
    font-size: 18px;
  }

  .commentsWrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 10px;
    min-height: 150px;
    max-height: 220px;
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
        {post?.comments?.map((comment, i) => (
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
            type="text"
            fullWidth
            value={commentValue}
            onChange={handleChange}
            placeholder="Write a comment"
            sx={{backgroundColor: "#e7e7e7"}}
            multiline
            rows={2}
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