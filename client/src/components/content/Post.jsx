/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropTypes } from "prop-types";
import { 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography 
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const styles = css`

`

export default function Post({ post }) {

  return (
    <div css={styles}>
      <ThumbUpIcon />
      <DeleteIcon />
      <MoreHorizIcon />
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object
}