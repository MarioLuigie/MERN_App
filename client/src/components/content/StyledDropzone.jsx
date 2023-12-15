/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useMemo} from 'react';
import { useDropzone } from 'react-dropzone';
import { useCallback } from "react";

import { countBytes } from "../../utils/counters.js";

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
  uploadedFiles
}) {

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      setUploadedFiles(prevFiles => [
        ...prevFiles,
        ...acceptedFiles
      ]);
    }
  }, []);

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

  const files = uploadedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {countBytes(file.size, "MB")} MB
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
      <aside style={{padding: "10px", color: "lightgray"}}>
        <ul style={{listStyle: "none", paddingTop: "20px"}}>{files}</ul>
      </aside>
    </div>
  );
}

