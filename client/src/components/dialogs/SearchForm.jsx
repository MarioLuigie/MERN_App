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
import SearchIcon from '@mui/icons-material/Search';

import Search from "../content/forms/Search";

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

export default function SearchForm({
  isDialogOpen,
  handleClose
}) {

  return (
    <div css={styles}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isDialogOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2, display: "flex", gap: "5px", alignItems: "center" }} id="customized-dialog-title">
            <div>
              Search
            </div>
            <SearchIcon />
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
            <Search handleCloseDialog={handleClose} />
          </DialogContent>
        </BootstrapDialog>
    </div>
  )
}
