// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Typography,
  Avatar
} from "@mui/material";

const styles = (textColor, textSize, purpleSize) => css`
  .nameWrapper {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .nameText{
    margin: 0;
    line-height: 0;
    color: ${textColor};
    font-size: ${textSize};
  }

  .purple {
    font-size: 11px;
    color: black;
    width: ${purpleSize};
    height: ${purpleSize};
  }
`

export default function Creator({
  user,
  textColor,
  textSize,
  purpleSize
}) {

  return (
    <div css={styles(textColor, textSize, purpleSize)}>
      <div className="nameWrapper">
        <Avatar 
          className="purple" 
          alt={user?.name}
          src={String(user?.picture)}
        >
          {!user?.picture ? user?.name.charAt(0) : ""}
        </Avatar>
        <Typography 
          variant="body2"
          color="textSecondary" 
          gutterBottom
          className="nameText"
        >
          {user?.name}
        </Typography>
      </div>
    </div>
  )
}



