/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropTypes } from "prop-types";
import { 
  Grid,
  Link,
  Typography,
} from "@mui/material";

const styles = css`
  padding: 10px;
  min-width: 200px;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .title {
    color: #f8f8f8;
    display: inline-block;
    white-space: nowrap;
  }

  .link {
    color: #cacaca;
    font-weight: 300;
    display: inline-block;
    white-space: nowrap;
    text-decoration: none;
  }

  .footerItem {
    min-width: 120px;
    text-align: center;
    
    @media screen and (min-width: 600px) {
      text-align: left;
    }
  }
`

export default function FooterItem({
  section
}) {

  return (
    <Grid item xs={12} sm={6} md={4} css={styles}>
      <div className='footerItem'>
        <Typography variant="h6" className="title">
          {section.title}
        </Typography>
          {section.links.map((link, i) => (
            <div key={i}>
              <Link href="#" className="link" gutterBottom variant="subtitle1">{link}
              </Link>
            </div>
          ))}
      </div>
    </Grid>
  )
}

FooterItem.propTypes = {
  section: PropTypes.object
}

{/* <Grid item xs={12} sm={6} md={3}>
<Typography variant='h6' sx={{color: "white"}} gutterBottom>
  yourMEMORIES
</Typography>
</Grid> */}