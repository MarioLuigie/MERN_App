/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Container,
  Grow,
  Grid,
  Chip,
  Autocomplete,
  TextField,
  Stack,
  Paper, 
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import Posts from "../content/Posts";
import Form from "../content/Form";
import Paginate from "../content/Paginate";
import * as actions from "../../redux/actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const styles = css`
  padding-top: 135px;

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

  .paginateWrapper {
    padding: 25px 15px 25px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

export default function Home() {
  const defaultValue = [];
  const [currentId, setCurrentId] = useState(null);
  const [ search, setSearch ] = useState();
  const [ chips, setChips ] = useState(defaultValue);
  
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const page = query.get("page") || 1;//odczytanie bieżącego URL z numerem strony
  const searchQuery = query.get("searchQuery"); 

  console.log("Current ID:", currentId);
  console.log("CHIPS***:", chips);

  useEffect(() => {
    // console.log("UseEffect - datas readed.");
    dispatch(actions.getPosts());
  }, [currentId, dispatch]);

  const handleChange = (evt) => {
    setSearch(evt.target.value);
  }

  const handleKeyDown = (evt) => {
    if(evt.key === "Enter") {
      console.log("Is searching...");
    }
  }

  return (
    <div css={styles}>
      <Grow in timeout={700}>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
            <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
              <Posts 
                setCurrentId={setCurrentId}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <Paper position="flex" color="inherit" className="searchWrapper" elevation={4}>
                    <div className="searchTitle">
                      <Typography variant="h6">
                        Search{chips}
                      </Typography>
                      <SearchIcon />
                    </div>
                    <div className="searchInputs">
                      <TextField 
                        fullWidth
                        name="search"
                        label="Add word"
                        variant="outlined"
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                      <Autocomplete
                        clearIcon={false}
                        options={[]}
                        freeSolo
                        multiple
                        defaultValue={defaultValue}
                        onChange={(_, value) => setChips(value)}
                        renderTags={(value, props) => value.map((option, i) => (
                          <Chip label={option} {...props({ i })} key={ i }/>
                          ))
                        }
                        renderInput={(props) => <TextField label="Add Tags" {...props} />
                        }
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} >
                  <Form 
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className="paginateWrapper">
                <Paginate />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}