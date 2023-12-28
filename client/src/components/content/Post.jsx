/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropTypes } from "prop-types";
import { 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  IconButton,
  Typography 
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import {  useDispatch } from "react-redux";

import * as actions from "../../redux/actions/posts.js";

const styles = css`

 .card {
  position: relative;
 }

 .media {
  padding-top: 56.25%;//16:9
  height: 0;
  background-color: 'rgba(0, 0, 0, 0.5)';
  background-blend-mode: 'darken';
  border-bottom: #cacaca solid 1px;
 }

 .timeOverlay {
  position: absolute;
  top: 20px;
  left: 20px;
 }

 .moreOverlay {
  position: absolute;
  top: 20px;
  right: 20px;
 }

 .button {
  color: black;
  padding: 10px;
 }

 .actions {
  display: flex;
  justify-content: space-between;
  padding: 12px 5px;
 }

 .likes {
  display: flex;
  align-items: center;
  font-size: 0.86rem;
 }

 .tags {
  padding: 10px 15px 0;
 }
`

export default function Post({ 
  post,
  setCurrentId
}) {
  const dispatch = useDispatch();

  const editPost = () => {
    setCurrentId(post._id);
  }

  const likePost = () => {
    dispatch(actions.likePost(post._id));
  }

  const deletePost = () => {
    dispatch(actions.deletePost(post._id));
  }

  return (
    <div css={styles}>
      <Card className="card">
        <CardMedia 
          className="media"
          image={post.files[0] || "null"}
          title={post.title}
        />
        <div className="timeOverlay">
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className="moreOverlay">
          <IconButton className="button" size="small" onClick={editPost}>
            <MoreIcon />
          </IconButton>
        </div>
        <div className="tags">
          <Typography variant="body2" color="textSecondary">{post.tags.split(", ").map(tag => `#${tag}`)}</Typography>
        </div>
        <div>
          <CardContent>
            <Typography variant="h6" gutterBottom>{post.title}</Typography>
            <Typography variant="h6" gutterBottom>{post.message}</Typography>
          </CardContent>
        </div>
        <div>
          <CardActions className="actions">
            <div className="likes">
            <IconButton className="button" size="small" onClick={likePost}>
              <ThumbUpIcon />
            </IconButton>
            <p>{post.likeCount}</p>
            </div>
            <IconButton className="button" size="small" onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  setCurrentId: PropTypes.func
}