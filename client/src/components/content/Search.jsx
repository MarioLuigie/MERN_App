// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { 
  TextField,
  Paper, 
  Typography,
  Button
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import InputTags from "../ui/InputTags";
import * as actions from "../../redux/actions/posts.js";

const styles = css`
  .searchWrapper {
    padding: 15px 15px 35px;
  }

  .searchInputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .searchTitle {
    display: flex;
    gap: 5px;
    align-items: center;
    padding-bottom: 18px;
  }

  .btns {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 30px;
  }

  .btn{
    background-color: black;

    &:hover {
      background-color: #1b1b1b;
    }
  }

  .clearBtn {
    color: black;
    background-color: white;
    border-color: #1b1b1b;

    &:hover {
      background-color: #f5f5f5;
      border-color: #1b1b1b;
    }
  }
`

export default function Search() {

  const [ searchValue, setSearchValue ] = useState("");
  const [ tags, setTags ] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSearchPost = () => {
    if(searchValue.trim() || tags) {
      console.log(searchValue);
      dispatch(actions.getPostsBySearch({ searchValue, tags: tags.join(",") }));
      handleClear();
    } else {
      navigate("/home");
    }
  }

  const handleChange = (evt) => {
    setSearchValue(evt.target.value);
  }

  const handleKeyDown = (evt) => {
    if(evt.key === "Enter") {
      console.log("Is searching...");
    }
  }

  const handleClear = () => {
    setSearchValue("");
    setTags([]);
  }

  return (
    <div css={styles}>
      <Paper position="flex" color="inherit" className="searchWrapper" elevation={4}>
        <div className="searchTitle">
          <Typography variant="h6">
            Search
          </Typography>
          <SearchIcon />
        </div>
        <div className="searchInputs">
          <TextField 
            fullWidth
            name="search"
            label="Search Editorial"
            variant="outlined"
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <InputTags 
            setState={setTags}
            state={tags}
            label="Search by Tags"
          />
        </div>
        <div className="btns">
          <Button 
            className="btn" 
            variant="contained" 
            size="large" 
            type="submit" 
            fullWidth
            onClick={handleSearchPost}
          >
            Search
          </Button>
          <Button 
              className="clearBtn" 
              variant="outlined" 
              size="large" 
              type="reset" 
              fullWidth 
              onClick={handleClear}
            >
              Clear
            </Button>
        </div>
      </Paper>
    </div>
  )
}