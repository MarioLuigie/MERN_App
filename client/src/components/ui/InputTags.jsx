// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Chip,
  Autocomplete,
  TextField
} from "@mui/material";

const styles = css`

`
export default function InputTags({
  setState,
  state,
  label
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
        renderInput={(props) => <TextField label={label} {...props} />
        }
      />
    </div>
  )
}
