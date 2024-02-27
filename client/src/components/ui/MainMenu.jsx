// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  IconButton,
  Paper
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Diversity1Icon from '@mui/icons-material/Diversity1';

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

.addBtn {

}

.searchBtn {

}

`

export default function MainMenu() {

  return (
    <div css={styles}>
      <Paper elevation={6} sx={{borderRadius: 100}}>
        <IconButton size="medium">
          <Diversity1Icon fontSize="medium" sx={{color: "#000000"}} />
        </IconButton>
      </Paper>
      <Paper  elevation={6} sx={{borderRadius: 100, backgroundColor: "#ffcd2a"}}>
        <IconButton size="large">
          <AddIcon fontSize="medium" sx={{color: "#000000"}}/>
        </IconButton>
      </Paper>
      <Paper elevation={6} sx={{borderRadius: 100}}>
        <IconButton size="medium">
          <SearchIcon fontSize="medium" sx={{color: "#000000"}} />
        </IconButton>
      </Paper>
    </div>
  )
}