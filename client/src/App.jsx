import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

export default function App() {

  return (
    <>
      <Button startIcon={<SendIcon />} variant="contained" onClick={() => {console.log("Click")}}>Send</Button>

      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>

      <IconButton color="secondary" aria-label="add an alarm">
  <AlarmIcon />
</IconButton>

<IconButton color="primary" aria-label="add to shopping cart">
  <AddShoppingCartIcon />
</IconButton>
    </>
  )
}

