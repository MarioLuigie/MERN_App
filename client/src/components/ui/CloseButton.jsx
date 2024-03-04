// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import {
  IconButton
} from "@mui/material";

export default function CloseButton({
  onClick
}) {

  return (
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  )
}