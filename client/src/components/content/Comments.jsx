// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { 
  Typography,
  TextField,
  Button
} from "@mui/material";

const styles = css`
  padding-top: 15px;
  margin-bottom: 45px;

  .commentsWrapper {
    margin-top: 10px;
    background-color: #ececec;
    min-height: 230px;
    max-height: 230px;
    height: 100%;
    overflow: auto;
    border-radius: 5px;
    position: relative;
  }

  .comment {
    height: 800px;
  }
`

export default function Comments() {

  console.log("Comment Section");

  return (
    <div css={styles}>
      <Typography variant="body1">Comments</Typography>
        <div className="commentsWrapper">
          <div className="comment">

          </div>
        </div>
    </div>
  )
}