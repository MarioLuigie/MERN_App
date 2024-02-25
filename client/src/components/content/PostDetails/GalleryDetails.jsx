// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Button, 
  Paper, 
  Typography,
  Divider
} from "@mui/material";

import Comments from "./Comments";
import Creator from "../../ui/Creator";

const styles = css`
  height: 100%;

  .paper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .postTitle {
    padding-top: 30px;
    font-weight: bold;
    line-height: 0.9;
  }

  .info {
    padding: 30px 20px 0px;
  }

  .comments {
    padding: 15px 0px 0px 0px;
  }

  .btnWrapper {
    padding: 20px;
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
      <Paper elevation={4} className="paper">
        <div className="card">
          <div className="info">
            <Creator post={post} />
            <Typography 
            variant="h3" 
            className="postTitle"
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
          <div className="comments">
            <Comments post={post} />
          </div>
        </div>
        <div className="btnWrapper">
          <Button 
            className="btn"
            variant="outlined" 
            onClick={handleBack}
            fullWidth
          >
            Back
          </Button>
        </div>
      </Paper>
    </div>
  )
}