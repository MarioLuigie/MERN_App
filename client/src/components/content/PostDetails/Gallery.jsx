// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Paper
} from "@mui/material";
import { useAppContext } from '../../../context/Context';

const styles = (navbarHeight) => css`
  height: 100%;

  .images {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(20, 20, 20);
    min-height: none;

    @media screen and (min-width: 900px) {
      min-height: calc(100vh - ${navbarHeight}px);
    }
  } 
`

export default function Gallery({
  post
}) {

  const { navbarHeight } = useAppContext();

  return (
    <div css={styles(navbarHeight)}>
      <Paper className="images" elevation={0}>
        <img 
          src={post.files.length > 0 ? post.files[0] : ""} 
          alt="" 
          style={{maxHeight: "100%", maxWidth: "100%"}}
        />
      </Paper>
    </div>
  )
}
