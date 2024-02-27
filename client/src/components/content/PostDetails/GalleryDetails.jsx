// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Button, 
  Paper, 
  Typography,
  Divider
} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import Comments from "./Comments";
import Creator from "../../ui/Creator";
import Settings from "../../ui/ListMenu";
import Like from "../Like";

const styles = css`
  height: 100%;

  .paper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .creator {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .postTitle {
    padding-top: 30px;
    font-weight: bold;
    line-height: 0.9;
  }

  .info {
    padding: 30px 20px 0px;
  }

  .likes {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  post,
  postSupport
}) {

  const { handleEditPost, handleDeletePost } = postSupport;

  return (
    <div css={styles}>
      <Paper elevation={4} className="paper">
        <div className="card">
          <div className="info">
            <div className="creator">
              <Creator 
                user={post?.creator} 
                textColor="black"
                purpleSize="21px"
              />
              <Settings 
                options={[
                  {
                    icon: <EditNoteIcon fontSize="small"/>, 
                    text: "Edit post", 
                    onHandle: handleEditPost(post?._id)
                  },
                  {
                    icon: <VerifiedUserIcon fontSize="small"/>, 
                    text: "Private post", 
                    onHandle: () => {console.log("Private post");}
                  },
                  {
                    icon: <VisibilityOffIcon fontSize="small"/>, 
                    text: "Hide post", 
                    onHandle: () => {console.log("Hide post")}
                  },
                  {
                    icon: <DeleteSweepIcon fontSize="small"/>, 
                    text: "Delete post", 
                    onHandle: handleDeletePost(post?._id)
                  },
                ]}
                anchor={null}
                postSupport={postSupport}
              />
            </div>
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
            <div className="likes">
              <Like post={post} />
              <Typography 
                variant="body2" 
                pb="10px" 
                color="textSecondary"
              >
                {`${post?.likers.length} likers`}
              </Typography>
            </div>
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