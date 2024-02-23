// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Paper
} from "@mui/material";

const styles = css`
  height: 100%;

  .images {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(20, 20, 20);
  }
`

export default function Gallery({
  post
}) {

  return (
    <div css={styles}>
      <Paper className="images" elevation={4} style={{height: "100%"}}>
        <img 
          src={post.files.length > 0 ? post.files[0] : ""} 
          alt="" 
          style={{maxHeight: "100%", maxWidth: "100%"}}
        />
      </Paper>
    </div>
  )
}


// return (
//   <div css={styles}>
//     <Paper className="images" elevation={4} style={{height: "100%"}}>
//       <img 
//         src={post.files.length > 0 ? post.files[0] : ""} 
//         alt="" 
//         style={{maxHeight: "100%", maxWidth: "100%"}}
//       />
//     </Paper>
//   </div>
// )