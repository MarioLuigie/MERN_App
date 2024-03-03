// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Button, 
  Paper, 
  Typography,
  Divider
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';

import Comments from "./Comments";
import Creator from "../../ui/Creator";
import PostSettings from "../PostSettings";
import Like from "../Like";
import { useAppContext } from '../../../context/Context';
import PostForm from '../../dialogs/PostForm';
import * as app from "../../../redux/actions/app";

const styles = (navbarHeight) => css`
  height: 100%;
  overflow: auto;
  max-height: calc(100vh - ${navbarHeight}px); 
  background-color: #ffffff; 

  .paper {
    height: 100%;
    min-height: calc(100vh - ${navbarHeight}px);
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
  post
}) {

  const { user } = useAppContext();
  const { navbarHeight } = useAppContext();

  const dispatch = useDispatch();

  const isOwn = String(post.creator._id) === String(user?.result?._id);

  const { isPostFormOpen } = useSelector(store => store.app);

  const handleClosePostForm = () => {
    dispatch(app.updateIsPostFormOpen(false));
  };

  return (
    <div css={styles(navbarHeight)}>
      <Paper elevation={0} className="paper">
        <div className="card">
          <div className="info">
            <div className="creator">
              <Creator 
                user={post?.creator} 
                textColor="black"
                purpleSize="21px"
              />
              {isOwn && <PostSettings post={post} />}
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
      <PostForm isDialogOpen={isPostFormOpen} handleClose={handleClosePostForm} />
    </div>
  )
}