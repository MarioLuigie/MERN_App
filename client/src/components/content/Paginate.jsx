// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Pagination,
  PaginationItem,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";

const styles = css`

`

export default function Paginate() {

  return (
    <div css={styles}>
      <Pagination 
        count={10}//than will be dynamic value
        page={1}//dynamic current page
        variant="text"
        color="standard"
        size="large"
        renderItem={(item) => (
          <PaginationItem 
            {...item}
            component={Link}
            to={`/home?page=${1}`}
            shape="rounded"
          />
          
        )}
      />
    </div>
  )
}