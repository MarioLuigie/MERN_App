import { 
  Container,
  AppBar,
  Typography,
  Grow,
  Grid
} from "@mui/material";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

export default function App() {

  return (
    <>
      <Container maxWidth="lg" sx={{padding: 0}}>
        <Header />
        <Main />
        <Footer />
      </Container>
    </>
  )
}

