// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Chip,
  Autocomplete,
  TextField,
  Typography
} from "@mui/material";

const styles = css`
  .explainText {
    color: #c9c9c9;
    font-size: 0.85rem;
    padding-top: 6px;
  }
`
export default function InputTags({
  setState,
  state,
  label,
  isExplain=true
}) {

  return (
    <div css={styles}>
      <Autocomplete
        clearIcon={false}
        options={[]}
        freeSolo
        multiple
        value={state}
        onChange={(_, value) => setState(value)}
        renderTags={(value, props) => value.map((option, i) => {
          return (
            <Chip 
              label={option}  
              {...props({ i })} 
              onDelete={() => {
                setState(state => state.filter((_, j) => i !== j));

              }} 
              key={ i }
            />)
          })
        }
        renderInput={(props) => (
          <div>
            <TextField label={label} {...props} />
            {isExplain ? <Typography className="explainText">Press enter to add a tag.</Typography> : ""}
          </div>
        )}
      />
    </div>
  )
}
