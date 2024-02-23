// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Typography,
  Avatar
} from "@mui/material";

const styles = css`
  .nameWrapper {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .nameText{
    margin: 0;
    line-height: 0;
  }

  .purple {
    font-size: 11px;
    color: black;
    width: 20px;
    height: 20px;
  }
`

export default function Creator({
  post
}) {

  return (
    <div css={styles}>
      <div className="nameWrapper">
        <Avatar 
          className="purple" 
          alt={post?.creator?.name}
          src={post?.creator?.picture}
        >
          {!post?.creator?.picture ? post?.creator?.name.charAt(0) : ""}
        </Avatar>
        <Typography 
          variant="body2"
          color="textSecondary" 
          gutterBottom
          className="nameText"
        >
          {post?.name}
        </Typography>
      </div>
    </div>
  )
}
