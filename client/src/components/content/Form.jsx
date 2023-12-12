/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";

import StyledDropzone from "./StyledDropzone";
import * as actions from "../../redux/actions/posts.js";

const styles = css`
  padding: 20px 0;

  .paper {
    padding: 35px 15px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .fileInput {

  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .submitBtn{
    background-color: black;

    &:hover {
      background-color: #1b1b1b;
    }
  }

  .clearBtn {
    color: black;
    background-color: white;
    border-color: #1b1b1b;

    &:hover {
      background-color: #f5f5f5;
      border-color: #1b1b1b;
    }
  }
`

export default function Form() {
  const initPostData = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    acceptedFiles: []
  }

  const [postData, setPostData] = useState(initPostData);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    setPostData({
      ...postData,
      [evt.target.name]: evt.target.value
    });
  }

  const onDrop = (acceptedFiles) => {
    setPostData({
      ...postData,
      acceptedFiles
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(postData, "from submit");

    dispatch(actions.postPost(postData));
    setPostData(initPostData);
    // console.log(postData);
  }

  const handleClear = () => {
    setPostData(initPostData);
    console.log("clear");
  }

  console.log(postData.acceptedFiles);
  console.log(postData);

  return (
    <div css={styles}>
      <Paper className="paper">
        <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h6">Create memory</Typography>
          <TextField 
            name="creator" 
            variant="outlined" 
            label="Creator" 
            fullWidth 
            value={postData.creator}
            onChange={handleChange}
          />
          <TextField 
            name="title" 
            variant="outlined" 
            label="Title" 
            fullWidth 
            value={postData.title}
            onChange={handleChange}
          />
          <TextField 
            name="message" 
            variant="outlined" 
            label="Message" 
            fullWidth 
            value={postData.message}
            onChange={handleChange}
          />
          <TextField 
            name="tags" 
            variant="outlined" 
            label="Tags" 
            fullWidth 
            value={postData.tags}
            onChange={handleChange}
          />
          <div className="fileInput">
            <StyledDropzone onDrop={onDrop} />
          </div>
          <div className="buttons">
            <Button className="submitBtn" variant="contained" size="large" type="submit" fullWidth>Submit</Button>
            <Button className="clearBtn" variant="outlined" size="large" type="reset" fullWidth onClick={handleClear}>Clear</Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}