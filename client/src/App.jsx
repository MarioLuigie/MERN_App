import { 
  Container,
  AppBar,
  Typography,
  Grow,
  Grid
} from "@mui/material";
import { useSelector } from "react-redux";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

export default function App() {
  const postsList = useSelector(store => store.postsList);

  console.log(postsList);

  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <Main />
      </Container>
    </>
  )
}

