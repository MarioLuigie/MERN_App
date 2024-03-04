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
<<<<<<< HEAD
import CreatePostForm from '../dialogs/CreatePostForm';
import { useAppContext } from '../../context/context';
=======
import PostForm from '../dialogs/PostForm';
>>>>>>> 12_CreateAppReducer

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

<<<<<<< HEAD
  // const { isSearchFormOpen, setIsSearchFormOpen, isCreateFormOpen, setIsCreateFormOpen } = useAppContext();

  const handleOpenForm = (setState) => () => {
    setState(true);
=======
  const { isSearchFormOpen, isPostFormOpen} = useSelector(store => store.app);

  const handleOpenPostForm = () => {
    dispatch(app.updateIsPostFormOpen(true));
>>>>>>> 12_CreateAppReducer
  };

  const handleOpenSearchForm = () => {
    dispatch(app.updateIsSearchFormOpen(true));
  };

  const handleClosePostForm = () => {
    dispatch(app.updateIsPostFormOpen(false));
  };

  const handleCloseSearchForm = () => {
    dispatch(app.updateIsSearchFormOpen(false));
  };

  return (
    <div css={styles}>
      <div className="buttons">
        <Paper elevation={4} sx={{borderRadius: 1}}>
          <IconButton size="medium">
            <Diversity1Icon fontSize="medium" sx={{color: "#000000"}} />
          </IconButton>
        </Paper>
        <Paper elevation={4} sx={{borderRadius: 1, backgroundColor: "#ffcd2a"}} onClick={handleOpenPostForm}>
          <IconButton size="large">
            <AddIcon fontSize="medium" sx={{color: "#000000"}}/>
          </IconButton>
        </Paper>
        <Paper elevation={4} sx={{borderRadius: 1}} onClick={handleOpenSearchForm}>
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