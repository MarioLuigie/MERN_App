import { 
  Container,
  AppBar,
  Typography,
  Grow,
  Grid
} from "@mui/material";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

export default function App() {
  
  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <Main />
      </Container>
    </>
  )
}

