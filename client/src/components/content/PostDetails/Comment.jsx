// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Typography,
  Avatar
} from "@mui/material";
import CommentControl from "../../ui/ListMenu";
import moment from "moment";
import { useDispatch } from "react-redux";

import { useAppContext } from '../../../context/context';
import * as actions from "../../../redux/actions/posts";


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
`

export default function Comment({
  post,
  comment
}) {
  const { user } = useAppContext();
  const dispatch = useDispatch();

  console.log(comment);
  // console.log("Comment i Post id:", comment._id, post?._id);

  const handleDeleteComment = () => {
    dispatch(actions.deleteComment(post?._id, comment?._id));
  }

  return (
    <div css={styles}>
      <div className="commentWrapper">
        <Avatar 
          className="purple" 
          alt={comment?.author?.name}
          src={`${comment?.author?.picture}`}
        >
          {!comment.author.picture ? comment?.author?.name.charAt(0) : ""}
        </Avatar>
        <div>
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
        <div>
          {
            comment?.authorId === user?.result?._id 
            ? <CommentControl 
                options={[
                  {text: "Edit comment", onHandle: () => {console.log("Edit")}},
                  {text: "Delete comment", onHandle: handleDeleteComment}
                ]}
              />
            :
              <CommentControl 
                options={[
                  {text: "Hide comment", onHandle: () => {console.log("Hide")}},
                  {text: "Report comment", onHandle: () => {console.log("Report")}},
                ]}
              />
          }
        </div>
      </div>
    </div>
  )
}