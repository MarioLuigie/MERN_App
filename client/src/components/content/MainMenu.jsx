// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector, useDispatch } from "react-redux";
import { 
  IconButton,
  Paper
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PostForm from '../dialogs/PostForm';

import SearchForm from "../dialogs/SearchForm";
import * as app from "../../redux/actions/app";

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  /* background-color: green; */

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  /* background-color: red; */
}

`

export default function MainMenu() {

  const dispatch = useDispatch();

  const { isSearchFormOpen, isPostFormOpen} = useSelector(store => store.app);

  const handleOpenPostForm = () => {
    dispatch(app.updatePostFormOpen(true));
  };

  const handleOpenSearchForm = () => {
    dispatch(app.updateSearchFormOpen(true));
  };

  const handleClosePostForm = () => {
    dispatch(app.updatePostFormOpen(false));
  };

  const handleCloseSearchForm = () => {
    dispatch(app.updateSearchFormOpen(false));
  };

  return (
    <div css={styles}>
      <div className="buttons">
        <Paper elevation={6} sx={{borderRadius: 1}}>
          <IconButton size="medium">
            <Diversity1Icon fontSize="medium" sx={{color: "#000000"}} />
          </IconButton>
        </Paper>
        <Paper elevation={6} sx={{borderRadius: 1, backgroundColor: "#ffcd2a"}} onClick={handleOpenPostForm}>
          <IconButton size="large">
            <AddIcon fontSize="medium" sx={{color: "#000000"}}/>
          </IconButton>
        </Paper>
        <Paper elevation={6} sx={{borderRadius: 1}} onClick={handleOpenSearchForm}>
          <IconButton size="medium">
            <SearchIcon fontSize="medium" sx={{color: "#000000"}} />
          </IconButton>
        </Paper>
      </div>
      <PostForm isDialogOpen={isPostFormOpen} handleClose={handleClosePostForm} />
      <SearchForm isDialogOpen={isSearchFormOpen} handleClose={handleCloseSearchForm}  />
    </div>
  )
}