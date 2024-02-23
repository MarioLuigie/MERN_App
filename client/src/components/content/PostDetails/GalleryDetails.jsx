// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Button, 
  Paper, 
  Typography,
  Avatar,
  Divider
} from "@mui/material";

import Comments from "./Comments";

const styles = css`

  .title {
    padding-top: 30px;
    font-weight: bold;
    line-height: 0.9;
  }

  .info {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .images {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(20, 20, 20);
  }

  .infos {
    height: 100%;
    padding: 30px 20px 30px;
    display: flex;
    flex-direction: column;
  }

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

  .btn {
    /* background-color: black; */
    color: black;
    border-color: #1b1b1b;

    &:hover {
      /* background-color: #1b1b1b; */
      border-color: #1b1b1b;
    }
  }
`

export default function GalleryDetails({
  formatDate,
  handleBack, 
  post
}) {

  return (
    <div css={styles}>
      <Paper elevation={4} className="infos">
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
        <Typography 
          variant="h3" 
          className="title"
        >
          {post?.title}
        </Typography>

        <Typography 
          variant="overline" 
          color="textSecondary" 
          className="date"
        >
          {formatDate(post?.createdAt)}
        </Typography>

        <Typography variant="body1" pt="25px" gutterBottom>{post?.message}</Typography>

        <Typography 
          variant="body2" 
          pb="25px"  
          color="textSecondary"
        >
          {post?.tags.map(tag => `#${tag},`)}
        </Typography>

        <Typography 
          variant="body2" 
          pb="10px" 
          color="textSecondary"
        >
          {`${post?.likers.length} likers`}
        </Typography>

        <Divider />

        <Comments post={post} />

        <Button 
          className="btn"
          variant="outlined" 
          onClick={handleBack}
          fullWidth
        >
          Back
        </Button>
      </Paper>
    </div>
  )
}