/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import InputTags from "../ui/InputTags";
import * as app from "../../redux/actions/app"

const styles = css`
  padding: 20px 15px 35px;

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
  currentPostId,
  closeDialog
}) {
  
  const initPostData = {
    title: "",
    message: ""
  }

  const { isCreatePostFormOpen } = useSelector(store => store.app);
  const { postsList } = useSelector(store => store.posts);

  const [tags, setTags ] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [refusedFiles, setRefusedFiles] = useState([]);
  const [postData, setPostData] = useState(initPostData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleInputRef = useRef(null);

  const { user } = useAppContext();

  const editedPost = useSelector(store => 
    currentPostId 
      ? store.posts.postsList?.find(post => post?._id === currentPostId) 
      : null
  );

  console.log("Edited Post:", editedPost);
  console.log("currentPostId:", currentPostId);
  console.log("postsList:", postsList);

  useEffect(() => {
    if (editedPost) {
      setPostData(editedPost);
      setTags(editedPost.tags);
    }
  }, [editedPost]);

  useEffect(() => {
    if (currentPostId && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [currentPostId]);

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
    dispatch(app.updateCurrentPostId(null));
    setTags([]);
    closeDialog();
    // console.log("clear");
  }

  useEffect(() => {
    if (!isCreatePostFormOpen) {
      setPostData(initPostData);
      setTags([]);
    }
  }, [isCreatePostFormOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(postData, "from submit");
    // console.log("TAGS FROM SUBMIT:", tags);

    if (currentPostId) {
      dispatch(actions.updatePost(currentPostId, {...postData, name: user?.result?.name, tags}));
    } else {
      const files = uploadedFiles;
      // console.log("UploadeFiles:", files);
      dispatch(actions.createPost({...postData, name: user?.result?.name, files, tags}, navigate));
    }

    handleClear();
    closeDialog();
  }

  // console.log(postData.acceptedFiles);
  // console.log(postData);
  // console.log("TAGS", tags);

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
      <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField 
          inputRef={titleInputRef}
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
        <InputTags 
          label="Add Tags"
          setState={setTags}
          state={tags}
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
            {currentPostId ? "Update" : "Create"}
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
    </div>
  )
}

Form.propTypes = {
  currentPostId: PropTypes.string,
  closeDialog: PropTypes.func
}