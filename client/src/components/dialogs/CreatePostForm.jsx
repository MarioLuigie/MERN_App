// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Form from "../content/Form";
import { useAppContext } from '../../context/context';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const styles = css`
  position: absolute;
`

export default function CreatePostForm({ isDialogOpen, handleClose }) {

  const { currentId, setCurrentId } = useAppContext();

  return (
    <div css={styles}>
      {ReactDOM.createPortal(
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isDialogOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {currentId ? "Edit Editorial" : "Create Editorial"}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Form currentId={currentId} setCurrentId={setCurrentId} closeDialog={handleClose} />
          </DialogContent>
        </BootstrapDialog>,
      document.getElementById("portal"))}
    </div>
  )
}