// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Pagination,
  PaginationItem
} from "@mui/material";
import { Link } from "react-router-dom";

import * as actions from "../../redux/actions/posts";

const styles = css`

`

export default function Paginate({
  page
}) {

  const dispatch = useDispatch();
  const { numbOfPages } = useSelector(store => store.posts);

  useEffect(() => {
    if(page) dispatch(actions.getPosts(page));
  }, [page])

  return (
    <div css={styles}>
      <Pagination 
        count={numbOfPages}//than will be dynamic value
        page={Number(page) || 1}//dynamic current page
        variant="text"
        color="standard"
        size="large"
        renderItem={(item) => (
          <PaginationItem 
            {...item}
            component={Link}
            to={`/home?page=${item.page}`}
            shape="rounded"
          />
          
        )}
      />
    </div>
  )
}