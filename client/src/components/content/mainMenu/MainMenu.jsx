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
import PostForm from '../../dialogs/PostForm';

import SearchForm from "../../dialogs/SearchForm";
import * as app from "../../../redux/actions/app";

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  /* background-color: green;  */
  width: 100%;
  border-radius: 5px;
  padding: 18px 5px;
  border-color: #bdbdbd;

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
    dispatch(app.updateIsPostFormOpen(true));
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
    <Paper css={styles} variant='outlined'>
      <div className="buttons">
        <Paper elevation={2} sx={{borderRadius: 15}}>
          <IconButton size="medium">
            <Diversity1Icon fontSize="medium" sx={{color: "#000000"}} />
          </IconButton>
        </Paper>
        <Paper elevation={2} sx={{borderRadius: 15, backgroundColor: "#ebebeb"}} onClick={handleOpenPostForm}>
          <IconButton size="medium">
            <AddIcon fontSize="medium" sx={{color: "#000000"}}/>
          </IconButton>
        </Paper>
        <Paper elevation={2} sx={{borderRadius: 15}} onClick={handleOpenSearchForm}>
          <IconButton size="medium">
            <SearchIcon fontSize="medium" sx={{color: "#000000"}} />
          </IconButton>
        </Paper>
      </div>
      <PostForm isDialogOpen={isPostFormOpen} handleClose={handleClosePostForm} />
      <SearchForm isDialogOpen={isSearchFormOpen} handleClose={handleCloseSearchForm}  />
    </Paper>
  )
}