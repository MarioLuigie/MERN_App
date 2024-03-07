// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Paper, 
  Typography,
  Divider
} from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { useSelector, useDispatch } from 'react-redux';

import Comments from "./Comments";
import Creator from "../../ui/Creator";
import PostSettings from "../PostSettings";
import Like from "../Like";
import { useAppContext } from '../../../context/context';
import PostForm from '../../dialogs/PostForm';
import * as app from "../../../redux/actions/app";
import CloseButton from "../../ui/CloseButton";

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
    padding: 30px 0 13px;
    font-weight: bold;
    line-height: 0.9;
  }

  .dateWrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
  }

  .date {
    color: #949494;
    letter-spacing: 1px;
    font-size: 12px;
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

  .controlls {
    display: flex;
  }
`

export default function GalleryDetails({
  formatDate,
  handleGoHome, 
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
              <div className="controlls">
                <PostSettings post={post} isOwn={isOwn} />
                <CloseButton onClick={handleGoHome}/>
              </div>
            </div>
            <Typography 
            variant="h3" 
            className="postTitle"
            >
              {post?.title}
            </Typography>
            <div className="dateWrapper">
              <div className="date" >{formatDate(post?.createdAt)}</div>
              <PublicIcon color="disabled" fontSize="small" />
            </div>
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
      </Paper>
      <PostForm isDialogOpen={isPostFormOpen} handleClose={handleClosePostForm} />
    </div>
  )
}