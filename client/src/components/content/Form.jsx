/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";
import { PropTypes } from "prop-types";

import StyledDropzone from "./StyledDropzone";
import * as actions from "../../redux/actions/posts.js";
import { useAppContext } from '../../context/context.jsx';

const styles = css`

  .paper {
    padding: 20px 15px 35px;
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

export default function Form({
  currentId,
  setCurrentId
}) {
  const initPostData = {
    title: "",
    message: "",
    tags: ""
  }

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [refusedFiles, setRefusedFiles] = useState([]);
  const [postData, setPostData] = useState(initPostData);
  const dispatch = useDispatch();

  const { user } = useAppContext();

  const editedPost = useSelector(store => 
    currentId 
      ? store.postsList.find(post => post._id === currentId) 
      : null
  );

  // console.log("Edited post:", editedPost);

  useEffect(() => {
    if (editedPost) {
      setPostData(editedPost);
    }
  }, [editedPost]);

  const handleChange = (evt) => {
    setPostData({
      ...postData,
      [evt.target.name]: evt.target.value
    });
  }

  const handleClear = () => {
    setPostData(initPostData);
    setUploadedFiles([]);
    setRefusedFiles([]);
    setCurrentId(null);
    // console.log("clear");
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(postData, "from submit");

    if (currentId) {
      dispatch(actions.updatePost(currentId, {...postData, name: user?.result?.name}));
    } else {
      const files = uploadedFiles;
      // console.log("UploadeFiles:", files);
      dispatch(actions.createPost({...postData, name: user?.result?.name, files}));
    }

    handleClear();
  }

  // console.log(postData.acceptedFiles);
  // console.log(postData);

  if (!user?.result?.name) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign In to create own memories!
        </Typography>
      </Paper>
    )
  }

  return (
    <div css={styles}>
      <Paper className="paper" elevation={6}>
        <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h6">
            {currentId ? "Edit memory" : "Create memory"}
          </Typography>
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
            multiline
            rows={4}
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
            <StyledDropzone 
              setUploadedFiles={setUploadedFiles} 
              uploadedFiles={uploadedFiles} 
              setRefusedFiles={setRefusedFiles}
              refusedFiles={refusedFiles}
            />
          </div>
          <div className="buttons">
            <Button 
              className="submitBtn" 
              variant="contained" 
              size="large" 
              type="submit" 
              fullWidth
            >
              Submit
            </Button>
            <Button 
              className="clearBtn" 
              variant="outlined" 
              size="large" 
              type="reset" 
              fullWidth 
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}

Form.propTypes = {
  currentId: PropTypes.string,
  setCurrentId: PropTypes.func
}