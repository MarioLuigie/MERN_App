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
import CreatePostForm from '../dialogs/CreatePostForm';

import SearchForm from "../dialogs/SearchForm";
import * as actions from "../../redux/actions/app";

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

  const { isSearchFormOpen, isCreatePostFormOpen} = useSelector(store => store.app);

  const handleOpenCreatePostForm = () => {
    dispatch(actions.updateCreatePostFormOpen(true));
  };

  const handleOpenSearchForm = () => {
    dispatch(actions.updateSearchFormOpen(true));
  };

  const handleCloseCreatePostForm = () => {
    dispatch(actions.updateCreatePostFormOpen(false));
  };

  const handleCloseSearchForm = () => {
    dispatch(actions.updateSearchFormOpen(false));
  };

  return (
    <div css={styles}>
      <div className="buttons">
        <Paper elevation={6} sx={{borderRadius: 1}}>
          <IconButton size="medium">
            <Diversity1Icon fontSize="medium" sx={{color: "#000000"}} />
          </IconButton>
        </Paper>
        <Paper elevation={6} sx={{borderRadius: 1, backgroundColor: "#ffcd2a"}} onClick={handleOpenCreatePostForm}>
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
      <CreatePostForm isDialogOpen={isCreatePostFormOpen} handleClose={handleCloseCreatePostForm} />
      <SearchForm isDialogOpen={isSearchFormOpen} handleClose={handleCloseSearchForm}  />
    </div>
  )
}