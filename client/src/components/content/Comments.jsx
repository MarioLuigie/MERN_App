// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppContext } from '../../context/context';
import { 
  Typography,
  TextField,
  Avatar,
  IconButton
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import * as actions from "../../redux/actions/posts.js";
import Comment from "./Comment";

const styles = css`
  padding-top: 15px;
  margin-bottom: 45px;

.commentsWrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
  min-height: 220px;
  max-height: 220px;
  height: 100%;
  overflow: auto;
  border-radius: 5px;
  padding-bottom: 10px;
}

.inputWrapper {
  display: flex;
  gap: 5px;
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

.btnWrapper {
  display: flex;
  justify-content: flex-end;
}

.btn {
  background-color: black;
  color: white;
  border-color: #1b1b1b;

  &:hover {
    background-color: #1b1b1b;
    border-color: #1b1b1b;
  }
}
`

export default function Comments({
  post
}) {
  const { user } = useAppContext();
  const dispatch = useDispatch();
  // const [ comments, setComments ] = useState(post?.comments);
  const [commentValue, setCommentValue ] = useState("");

  const handleChange = (evt) => {
    setCommentValue(evt.target.value);
  }

  // const handleComment = async () => {
  //   const updatedPost = await dispatch(actions.commentPost(post._id, {authorId: user?.result?._id, content: commentValue}));

  //   setComments(updatedPost?.comments);
  //   setCommentValue("");
  // }

  const handleComment = () => {
    dispatch(actions.commentPost(post._id, {authorId: user?.result?._id, content: commentValue}));

    setCommentValue("");
  }

  return (
    <div css={styles}>
      <Typography variant="body1">Comments</Typography>
      <div className="commentsWrapper">
        {post.comments?.map((comment, i) => (
          <Comment 
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
          <div className="btnWrapper">
            <IconButton onClick={handleComment}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}