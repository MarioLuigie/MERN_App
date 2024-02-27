// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { 
  IconButton,
  Paper
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import CreatePostForm from '../dialogs/CreatePostForm';

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.addBtn {

}

.searchBtn {

}

`

export default function MainMenu() {

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div css={styles}>
      <div className="buttons">
        <Paper elevation={6} sx={{borderRadius: 1}}>
          <IconButton size="medium">
            <Diversity1Icon fontSize="medium" sx={{color: "#000000"}} />
          </IconButton>
        </Paper>
        <Paper  elevation={6} sx={{borderRadius: 1, backgroundColor: "#ffcd2a"}} onClick={handleOpenDialog}>
          <IconButton size="large">
            <AddIcon fontSize="medium" sx={{color: "#000000"}}/>
          </IconButton>
        </Paper>
        <Paper elevation={6} sx={{borderRadius: 1}}>
          <IconButton size="medium">
            <SearchIcon fontSize="medium" sx={{color: "#000000"}} />
          </IconButton>
        </Paper>
      </div>
      <CreatePostForm open={dialogOpen} handleClose={handleCloseDialog}></CreatePostForm>
    </div>
  )
}