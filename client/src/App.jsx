import { 
  Container,
} from "@mui/material";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

export default function App() {

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{padding: 0}}>
        <Main />
      </Container>
      <Footer />
    </>
  )
}

