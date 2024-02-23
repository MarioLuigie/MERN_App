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
import Creator from "../../ui/Creator";

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
        <Creator post={post} />
          <div>
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
            <Typography 
              variant="body1" 
              pt="25px" 
              gutterBottom
            >
              {post?.message}
            </Typography>
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
          </div>
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