// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Typography,
  Avatar
} from "@mui/material";
import moment from "moment";

const styles = css`

  .commentWrapper {
    display: flex;
    gap: 5px;
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
  comment
}) {

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
      </div>
    </div>
  )
}