// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { 
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";

import Form from "../content/Form";

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
  z-index: 100;
`

export default function PostForm({ isDialogOpen, handleClose }) {

  const { currentPostId } = useSelector(store => store.app);

  return (
    <div css={styles}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isDialogOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {currentPostId ? "Edit Editorial" : "Create Editorial"}
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
          <Form currentPostId={currentPostId} closeDialog={handleClose} />
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}