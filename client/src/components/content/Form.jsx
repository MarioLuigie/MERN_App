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

const styles = css`
  .paper {
    padding: 15px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`

export default function Form() {
  const initPostData = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
  }

  const [postData, setPostData] = useState(initPostData);

  const handleChange = (evt) => {
    setPostData({
      ...postData,
      [evt.target.name]: evt.target.value
    });
  }

  const handleSubmit = () => {

  }

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
        </form>
      </Paper>
    </div>
  )
}