// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { useParams, useNavigate, Routes, Route} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  CircularProgress, 
  Container, 
  Grid
} from "@mui/material";
import moment from "moment";

import * as actions from "../../redux/actions/posts.js";
import * as app from "../../redux/actions/app.js";
import { useAppContext } from '../../context/context';
import GalleryDetails from "../content/PostDetails/GalleryDetails";
import Gallery from "../content/PostDetails/Gallery";

const styles = (navbarHeight) => css`
  /* height: calc(100vh - ${navbarHeight}px);
  min-height: calc(100vh - ${navbarHeight}px);
  max-height: calc(100vh - ${navbarHeight}px); */
  margin-top: ${navbarHeight}px;
  width: 100%;
  background-color: rgb(22, 22, 22);

  .gridContainer {
    /* max-height: calc(100vh - ${navbarHeight}px); */
  }

  .gridItem {
    max-height: calc(100vh - ${navbarHeight}px);
  }

  .container {
    height: 100%;
    width: 100%;
    max-width: 1920px;
  }
`

export default function PostDetails() {

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { navbarHeight } = useAppContext();

  const { post, isLoading } = useSelector(store => store.posts);
  const { currentImageIndex, lastHomePagination } = useSelector(store => store.app);

  const [ dataLoaded, setDataLoaded ] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      await dispatch(actions.getPost(params.id));
      await dispatch(actions.getPosts());
      setDataLoaded(true);
    }
    fetchPost();
  }, [params.id]);

  const handleGoHome = () => {
    console.log("GO HOME");
    navigate(lastHomePagination);
    dispatch(app.updateCurrentImageIndex(0));
  }

  const handleBack = () => {
    // navigate(-1);
    const newIndex = currentImageIndex - 1;
    if (newIndex >= 0) {
      dispatch(app.updateCurrentImageIndex(newIndex));
      navigate(`/home/${post._id}/${post.files[newIndex]}`);
    }
  }

  const handleForward = () => {
    console.log("FORWARD", currentImageIndex);
    const newIndex = (currentImageIndex + 1) % post.files.length;
    dispatch(app.updateCurrentImageIndex(newIndex));
    navigate(`/home/${post._id}/${post.files[newIndex]}`);
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''; 
  
    const formattedDate = moment(dateString).format('DD MMMM YYYY');
  
    return formattedDate;
  };

    // console.log(post?.files);

  if (isLoading || !dataLoaded) {
    return (
      <div css={styles}>
        <CircularProgress />
      </div>
    );
  }

  if (!post || Object.keys(post).length === 0) {
    return (
      <div css={styles}>
        <p>NO DATA...</p>
      </div>
    );
  }

  return (
    <div css={styles(navbarHeight)}>
      <Container className="container" maxWidth="xl">
        <Grid container justifyContent="center" spacing={2} className="gridContainer">
          <Grid item xs={12} sm={12} md={7} lg={8} xl={9} className="gridItem">
            <Routes>
              <Route 
                path={`/${post.files[currentImageIndex]}`} 
                element={
                  <Gallery 
                    post={post} 
                    currentImageIndex={currentImageIndex} 
                    handleForward={handleForward}
                    handleBack={handleBack}
                  />
                } 
              />
            </Routes>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
            <GalleryDetails 
              post={post} 
              handleGoHome={handleGoHome} 
              formatDate={formatDate}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

// Dane są pobierane w funkcji fetchPost, która jest wywoływana przez useEffect w momencie montowania lub re-renderowania komponentu. Oto kroki, jakie się dzieją:

//     useEffect zostaje uruchomiony, ponieważ jest zależny od params.id.

// javascript

// useEffect(() => {
//   const fetchPost = async () => {
//     await dispatch(actions.getPost(params.id));
//     setDataLoaded(true);
//   }
//   fetchPost();
// }, [params.id]);

//     Wewnątrz fetchPost używane jest dispatch do wywołania akcji getPost z parametrem params.id. Akcja ta prawdopodobnie jest częścią Redux i ma na celu pobranie danych posta z odpowiedniego źródła, na przykład z API.

// javascript

// await dispatch(actions.getPost(params.id));

//     Po pomyślnym pobraniu danych (asynchronicznie), ustawiane jest setDataLoaded(true). To z kolei wpływa na renderowanie komponentu, zwłaszcza w warunku sprawdzającym czy dane są już załadowane:

// javascript

// if (isLoading || !dataLoaded) {
//   return (
//     <div css={styles}>
//       <CircularProgress />
//     </div>
//   );
// }

// W tym momencie, jeśli dane są już pobrane (dataLoaded === true), komponent będzie renderował widok szczegółów posta. Dane posta są wykorzystywane w sekcji renderowania komponentu, na przykład do przekazania ich do komponentu Gallery i GalleryDetails. W tych komponentach są prawdopodobnie używane do wyświetlenia zdjęć i szczegółów posta.