import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import ListMenu from "../ui/ListMenu";
import * as actions from "../../redux/actions/posts";
import * as app from "../../redux/actions/app";

export default function PostSettings({
  post
}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditPost = () => {
    dispatch(app.updateCurrentPostId(post._id));
    dispatch(app.updateIsPostFormOpen(true));
  }

  const handleDeletePost = () => {
    dispatch(actions.deletePost(post._id));
    navigate("/home?page=1");
  }

  return (
    <ListMenu                 
      options={[
        {
          icon: <EditNoteIcon fontSize="small"/>, 
          text: "Edit post", 
          onHandle: handleEditPost
        },
        {
          icon: <VerifiedUserIcon fontSize="small"/>, 
          text: "Private post", 
          onHandle: () => {console.log("Private post");}
        },
        {
          icon: <VisibilityOffIcon fontSize="small"/>, 
          text: "Hide post", 
          onHandle: () => {console.log("Hide post")}
        },
        {
          icon: <DeleteSweepIcon fontSize="small"/>, 
          text: "Delete post", 
          onHandle: handleDeletePost
        },
      ]}
      anchor={null}
    />
  )
}