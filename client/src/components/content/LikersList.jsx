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
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background-color: #eeeeee;
  }

  .liker {
    font-size: 13px;
    color: grey;
    white-space: nowrap;
  }
`

export default function LikersList({
  likers
}) {

  console.log("Lista Lubiących:", likers);

  return (
    <div css={styles}>
      <Paper elevation={6} className="likersList">
        {likers.map(liker => (
          <p className="liker" key={liker._id}>{liker.name}</p>
          ))
        }
      </Paper>
    </div>
  )
}