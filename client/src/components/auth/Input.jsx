import { 
  Grid,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { PropTypes } from "prop-types";

export default function Input({
  name,
  label,
  type,
  isAutoFocus,
  isHalf,
  handleChange,
  handleShowPassword
}) {

  return (
    <Grid item xs={12} sm={isHalf ? 6 : 12}>
      <TextField 
        name={name}
        label={label}
        type={type}
        autoFocus={isAutoFocus}
        fullWidth 
        required
        variant="outlined"
        onChange={handleChange}
      />
    </Grid>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  isAutoFocus: PropTypes.bool,
  isHalf: PropTypes.bool,
  handleChange: PropTypes.func,
  handleShowPassword: PropTypes.func
}