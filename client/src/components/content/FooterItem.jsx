/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropTypes } from "prop-types";


const styles = css`
  color: #eeeeee;
  padding: 15px;
  display: flex;
  flex-direction: column;

  .title {
    font-size: 1.2rem;
    padding-bottom: 10px;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .link {
    font-size: 0.9rem;
  }
`

export default function FooterItem({
  section
}) {

  return (
    <div css={styles}>
      <p className='title'>{section.title}</p>
      <div className='links'>
        {section.links.map(((link, i) => (
          <p key={i} className='link'>{link}</p>
        )))}
      </div>
    </div>
  )
}

FooterItem.propTypes = {
  section: PropTypes.object
}