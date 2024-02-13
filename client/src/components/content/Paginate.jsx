// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useDispatch, useSelector } from "react-redux";
import { 
  Pagination,
  PaginationItem
} from "@mui/material";
import { Link } from "react-router-dom";
import qs from "qs";

const styles = css`

`

export default function Paginate({
  page
}) {

  const getURL = (item) => {
    const currentQueryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    const newQueryParams = qs.stringify({
      ...currentQueryParams,
      page: item.page
    });
    
    return `/home?${newQueryParams}`;
  }

  const dispatch = useDispatch();
  const { numbOfPages } = useSelector(store => store.posts);

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
            to={getURL(item)}
            shape="rounded"
          />
          
        )}
      />
    </div>
  )
}