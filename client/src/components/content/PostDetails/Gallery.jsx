// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Paper,
  Button
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    position: relative;

    @media screen and (min-width: 900px) {
      min-height: calc(100vh - ${navbarHeight}px);
    }
  } 

  .navigateWrapper {
    background-color: transparent;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 75px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: #bdbdbd11;
      width: 60px;
    }

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }

  .navigateIcon {
    color: #8d8d8d;
    font-size: 50px;
  }
`

export default function Gallery({
  post
}) {

  const { navbarHeight } = useAppContext();

  return (
    <div css={styles(navbarHeight)}>
      <Paper className="images" elevation={0}>
        <Button className="navigateWrapper navigateWrapper--left"       
          TouchRippleProps={{style: { color: "#a8a8a8" },
          }}
        >
          <ArrowBackIosNewIcon className="navigateIcon" />
        </Button>
        <img 
          src={post.files.length > 0 ? post.files[0] : ""} 
          alt="" 
          style={{maxHeight: "100%", maxWidth: "100%"}}
        />
        <Button className="navigateWrapper navigateWrapper--right"
          TouchRippleProps={{style: { color: "#a8a8a8" },
          }}
        >
          <ArrowForwardIosIcon className="navigateIcon" />
        </Button>
      </Paper>
    </div>
  )
}
