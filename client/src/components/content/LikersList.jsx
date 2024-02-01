// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Paper
} from "@mui/material";

const styles = css`
  position: absolute;
  bottom: 21px;
  left: 0px;
  max-height: 400px;

  .likersList {
    padding: 7px 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    background-color: #eeeeee;
  }

  .liker {
    font-size: 13px;
    color: grey;
  }
`

export default function LikersList({
  likersList
}) {

  const List = () => {
    const list = likersList.map(((liker, i) => (
      <p className="liker" key={i}>{liker}</p>
    )));

    return list;
  }

  return (
    <div css={styles}>
      <Paper elevation={6} className="likersList">
        <List />
      </Paper>
    </div>
  )
}