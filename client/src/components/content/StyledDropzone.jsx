/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, {useMemo} from 'react';
import { useDropzone } from 'react-dropzone';
import { useCallback } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import { countBytes } from "../../utils/counters.js";

const styles = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .uploadedFileWrapper {
    display: flex;
    align-items: center;
  }

  .uploadedFile {
    background-color: #eeeeee;
    padding: 5px 8px;
    border-radius: 4px;
    color: #c5c5c5;
    position: relative;
    min-width: 190px;
    border: #c9c9c9 1px solid;
    font-size: 0.9rem;
  }

  .a {
    position: absolute;
    right: -10px;
    top: -8px;
    padding: 2px;
    background-color: #e6e6e6;
  }

  .cancelIcon {
    color: #818181;
    font-size: 0.9rem;
  }

  .successIcon {
    color: #1cad54;
    font-size: 1.4rem;
    margin-left: 13px;
  }

  .rejectedIcon {
    color: #fc7373;
    font-size: 1.2rem;
    margin-left: 13px;
  }
`

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: "center",
  padding: '20px',
  borderWidth: 2,
  borderRadius: 4,
  borderColor: '#bbbbbb',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  minHeight: "90px",
  textAlign: "center"
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function StyledDropzone({
  setUploadedFiles,
  uploadedFiles,
  setRefusedFiles,
  refusedFiles
}) {

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setUploadedFiles(prevFiles => [
        ...prevFiles,
        ...acceptedFiles
      ]);
    }

    if (rejectedFiles?.length) {
      setRefusedFiles(prevFiles => [
        ...prevFiles,
        ...rejectedFiles
      ]);
    }
  }, []);

  console.log(refusedFiles);

  const removeUploadedFile = filePath => () => {
    setUploadedFiles(prevFiles => [
      ...prevFiles.filter(file => file.path !== filePath)
    ]);
  }

  const removeRefusedFile = filePath => () => {
    setRefusedFiles(prevFiles => [
      ...prevFiles.filter(({ file }) => file.path !== filePath)
    ]);

    console.log("remove rejected");
  }

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive
  } = useDropzone({
    accept: {
      'image/jpeg': [".jpeg"], 
      'image/png': [".png"]
    }, 
    maxFiles: 4, 
    onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  console.log(uploadedFiles);

  const successFiles = uploadedFiles.map(file => (
    <li key={file.path} className="uploadedFileWrapper">
      <div className="uploadedFile">
        <div>
          {file.path} - {countBytes(file.size, "MB")} MB
        </div>
        <IconButton 
          onClick={removeUploadedFile(file.path)} 
          className="a"
        >
          <CloseIcon className="cancelIcon" />
        </IconButton>
      </div>
      <DoneIcon className="successIcon" />
    </li>
  ));

  const errorFiles = refusedFiles.map(({ file }) => (
    <li key={file.path} className="uploadedFileWrapper">
      <div className="uploadedFile">
        <div>
          {file.path} - {countBytes(file.size, "MB")} MB
        </div>
        <IconButton 
          onClick={removeRefusedFile(file.path)} 
          className="a"
        >
          <CloseIcon className="cancelIcon" />
        </IconButton>
      </div>
      <DoDisturbIcon className="rejectedIcon" />
  </li>
  ));

  return (
    <div>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        {
          isDragActive 
            ? <p>Drop some files here...</p>
            : <div>
                <p>{`Drag 'n' drop some files here, or click to select files`}</p>
                <small>Only *.jpeg and *.png images will be accepted</small>
              </div>
        }
      </div>
      <aside style={{paddingTop: "12px"}}>
        <ul style={{listStyle: "none", paddingTop: "20px"}} css={styles}>{successFiles}</ul>
        <ul style={{listStyle: "none", paddingTop: "20px"}} css={styles}>{errorFiles}</ul>
      </aside>
    </div>
  );
}

