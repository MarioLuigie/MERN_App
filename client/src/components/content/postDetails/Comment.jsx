// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Typography,
  Avatar,
  TextField,
  IconButton
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import moment from "moment";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useAppContext } from '../../../context/context';
import * as actions from "../../../redux/actions/posts";
import CommentControl from "../../ui/ListMenu";

const styles = css`

  .commentWrapper {
    display: flex;
    gap: 5px;
    padding: 0 20px 0;
  }

  .comment {
    padding: 8px 14px;
    background-color: #ececec;
    border-radius: 15px;

    &__author {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: bold;
    }

    &__content {
      font-size: 13px;
      font-weight: bold;
      color: #666666;
    }
  }

  .time {
    font-size: 12px;
    color: #a1a1a1;
    font-weight: bold;
    padding-top: 3px;
  }

  .purple {
    font-size: 14px;
    color: black;
    width: 30px;
    height: 30px;
  }

  .editStateControlls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export default function Comment({
  post,
  comment
}) {
  const { user } = useAppContext();
  const dispatch = useDispatch();

  const [ isEditing, setIsEditing ] = useState(false);
  const [ editedContent, setEditedContent ] = useState(comment?.content);

  // console.log(comment);
  // console.log("Comment i Post id:", comment._id, post?._id);

  const handleDeleteComment = () => {
    dispatch(actions.deleteComment(post?._id, comment?._id));
  }

  const handleEditComment = () => {
    setIsEditing(true);
    setEditedContent(comment?.content);
  }

  const handleUpdateComment = () => {
    dispatch(actions.updateComment(post?._id, comment?._id, {...comment, content: editedContent}));
    setIsEditing(false);
  }

  const handleChange = (evt) => {
    setEditedContent(evt.target.value);
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(comment?.content);
  }

  const handleKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      handleCancel();
    }
  }

  return (
    <div css={styles}>
      <div className="commentWrapper">
        <Avatar 
          className="purple" 
          alt={comment?.author?.name}
          src={comment?.author?.picture ? `${comment?.author?.picture}` : ""}
        >
          {!comment.author.picture ? comment?.author?.name.charAt(0) : ""}
        </Avatar>
        {!isEditing
          ? <div>
              <div className="comment">
                <Typography 
                  variant="subtitle2" 
                  className="comment__author"
                >
                  {comment?.author?.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  className="comment__content"
                >
                  {comment?.content}
                </Typography>
              </div>
              <div>
                <div className='time'>{moment(comment?.createdAt).fromNow()}</div>
              </div>
            </div>
          : <div className="input">
              <TextField 
                autoFocus
                fullWidth
                value={editedContent}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <div className="editStateControlls">
                <div>
                  <Typography variant="caption">Press Esc to </Typography>
                  <Typography sx={{cursor: "pointer", color: "#1279da", fontWeight: "bold"}} onClick={handleCancel} variant="caption">Cancel.</Typography>
                </div>
                <div className="sendBtnWrapper">
                  <IconButton onClick={handleUpdateComment} title="Comment">
                    <SendIcon sx={{color: "black"}} />
                  </IconButton>
                </div>
              </div>
            </div>
        }
        <div>
          {
            comment?.authorId === user?.result?._id
            ? !isEditing 
              ? <CommentControl 
                  options={[
                    {
                      icon: <EditNoteIcon fontSize="small" />, 
                      text: "Edit comment", 
                      onHandle: handleEditComment
                    },
                    {
                      icon: <DeleteSweepIcon fontSize="small" />, 
                      text: "Delete comment", 
                      onHandle: handleDeleteComment
                    }
                  ]}
                /> 
              : null
            :
              <CommentControl 
                options={[
                  {
                    icon: <VisibilityOffIcon fontSize="small"/>, 
                    text: "Hide comment", 
                    onHandle: () => {console.log("Hide")}
                  },
                  {
                    icon: <FlagIcon fontSize="small"/>, 
                    text: "Report comment", 
                    onHandle: () => {console.log("Report")}
                  },
                ]}
              />
          }
        </div>
      </div>
    </div>
  )
}