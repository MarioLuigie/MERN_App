import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { useAppContext } from './context/context';
import CreatePostForm from './components/dialogs/CreatePostForm';
import SearchForm from "./components/dialogs/SearchForm";

export default function App() {

  const {
    isCreateFormOpen,
    setIsCreateFormOpen,
    isSearchFormOpen,
    setIsSearchFormOpen,
    handleCloseForm,
   } = useAppContext();

  return (
    <>
      <Header />
      <Main />
      <CreatePostForm isDialogOpen={isCreateFormOpen} handleClose={handleCloseForm(setIsCreateFormOpen)} />
      <SearchForm isDialogOpen={isSearchFormOpen} handleClose={handleCloseForm(setIsSearchFormOpen)}  />
    </>
  )
}

