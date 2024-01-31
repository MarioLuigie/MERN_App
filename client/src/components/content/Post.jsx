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
import ThumbUpOffIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import {  useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import * as actions from "../../redux/actions/posts.js";
import { useAppContext } from '../../context/context.jsx';
// import image from "../../../../api/uploads/1703801554909.jpg"

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
  const { user } = useAppContext();
  const [ isLiked, setIsLiked ] = useState(false);

  const isOwn = post.creator === user?.result?._id;

  useEffect(() => {
    setIsLiked((post.likeCount.findIndex((id) => id === String(user?.result?._id))) !== -1);
  }, [post]);

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
      <Card className="card" elevation={6}>
        <CardMedia 
          className="media"
          image={'https://images.pexels.com/photos/1020017/pexels-photo-1020017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
          title={post.title}
        />
        <div className="timeOverlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className="moreOverlay">
          {isOwn
            ? (
                <IconButton className="button" size="small" onClick={editPost}>
                  <MoreIcon />
                </IconButton>
              )
            : null
          }
        </div>
        <div className="tags">
          <Typography variant="body2" color="textSecondary">{post.tags.split(", ").map(tag => `#${tag}`)}</Typography>
        </div>
        <div>
          <CardContent>
            <Typography variant="h6" gutterBottom>{post.title}</Typography>
            <Typography component="p" variant="body2" color="textSecondary">{post.message}</Typography>
          </CardContent>
        </div>
        <div>
          <CardActions className="actions">
            <div className="likes">
              <IconButton className="button" size="small" onClick={likePost}>
                {isLiked
                  ? <ThumbUpIcon />
                  : <ThumbUpOffIcon />
                }
              </IconButton>
              <p>{post.likeCount.length}</p>
            </div>
            {isOwn
              ? (
                  <IconButton className="button" size="small" onClick={deletePost}>
                    <DeleteIcon />
                  </IconButton>
                )
              : null
            }
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