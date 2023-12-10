/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { 
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";

import StyledDropzone from "./StyledDropzone";

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
`

export default function Form() {
  const initPostData = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    acceptedFiles: null
  }

  const [postData, setPostData] = useState(initPostData);

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

  const handleSubmit = () => {

  }

  console.log(postData.acceptedFiles);

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
          <div>
            <StyledDropzone onDrop={onDrop} />
          </div>
        </form>
      </Paper>
    </div>
  )
}