// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TextField,
  Button
} from "@mui/material";
import qs from "qs";

import InputTags from "../../ui/InputTags";

const styles = css`

  .searchWrapper {
    padding: 15px 15px 35px;

  }

  .searchInputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
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

export default function Search({
  handleCloseDialog
}) {

  const [ searchValue, setSearchValue ] = useState("");
  const [ tags, setTags ] = useState([]);

  const navigate = useNavigate();

  const queryParams = qs.stringify({
    searchQuery: searchValue || undefined, // Dodaj tylko, jeśli searchValue istnieje
    tags: tags.join(",") || undefined,
  });

  const handleSearchPost = () => {
    if(searchValue.trim() || tags.length) {

      navigate(`/home?${queryParams}`);
      
      handleClear();
      // console.log("TRUE");
    } else {
      // console.log("FALSE");
      navigate("/home");
    }
    handleCloseDialog();
  }

  const handleChange = (evt) => {
    setSearchValue(evt.target.value);
    console.log("SEARCH VALUE:", searchValue);
  }

  const handleKeyDown = (evt) => {
    if(evt.key === "Enter") {
      handleSearchPost();
    }
  }

  const handleClear = () => {
    setSearchValue("");
    setTags([]);
    handleCloseDialog();
  }

  return (
    <div css={styles}>
      <div position="flex" color="inherit" className="searchWrapper" elevation={4}>
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
            onKeyDown={handleKeyDown}
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
      </div>
    </div>
  )
}