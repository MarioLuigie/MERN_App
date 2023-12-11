/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

import { countBytes } from "../../utils/counters.js";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 4,
  borderColor: '#bbbbbb',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
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
  onDrop
}) {

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
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

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {countBytes(file.size, "MB")} MB
    </li>
  ));

  return (
    <div>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{`Drag 'n' drop some files here, or click to select files`}</p>
        <small>(Only *.jpeg and *.png images will be accepted)</small>
      </div>
      <aside style={{padding: "10px", color: "lightgray"}}>
        <ul style={{listStyle: "none", paddingTop: "20px"}}>{files}</ul>
      </aside>
    </div>
  );
}

// const {
//   getRootProps,
//   getInputProps,
//   acceptedFiles,
//   isFocused,
//   isDragAccept,
//   isDragReject
// } = useDropzone({accept: {
//     'image/jpeg': [".jpeg"], 
//     'image/png': [".png"]
//   }, onDrop, disabled: true});
