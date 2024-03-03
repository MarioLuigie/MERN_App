/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropTypes } from "prop-types";
import { 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Typography,
  ButtonBase,
  Avatar
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { useAppContext } from '../../context/Context.jsx';
import Like from "./Like.jsx";
import PostSettings from "./PostSettings.jsx";
// import image from "../../../../api/uploads/1703801554909.jpg"

const styles = (isOwn) => css`
  height: 100%;

 .card {
  position: relative;
  border: ${isOwn ? "#bdbdbd solid 1px" : "none"};
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 }

 .buttonBase {
  display: block;
  width: 100%;
  text-align: left;
 }

 .media {
  padding-top: 56.25%;//16:9
  height: 0;
  background-color: 'rgba(0, 0, 0, 0.5)';
  background-blend-mode: 'darken';
  border-bottom: #cacaca solid 1px;
 }

 .title {
  font-weight: bold;
  font-size: 26px;
 }

 .timeOverlay {
  position: absolute;
  top: 20px;
  left: 20px;
 }

 .nameWrapper {
  display: flex;
  align-items: center;
  gap: 7px;
 }

 .name {
  color: white;
 }

 .purple {
  font-size: 11px;
  color: black;
  width: 30px;
  height: 30px;
  }

 .buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  margin-right: 6px;
 }

 .button {
  color: black;
  padding: 5px;
 }

 .actions {
  display: flex;
  justify-content: space-between;
  padding: 12px 5px;
 }

 .likes {
  display: flex;
  align-items: center;
  font-size: 0.86rem;
 }

 .likesNumbWrapper {
  position: relative;
  cursor: pointer;
  padding: 5px 10px 5px 0;
 }

 .tags {
  padding: 10px 15px 0;
  display: flex;
 }
`

export default function Post({ 
  post
}) {

  const navigate = useNavigate();
  const { user } = useAppContext();
  // const [ likes, setLikes ] = useState([]);

  const isOwn = String(post.creator._id) === String(user?.result?._id);

  // console.log(post);
  // console.log(post.creator);
  // console.log("IS OWN:", isOwn);
  // console.log("POST likers:", post.likers);

  const handleOpenPostDetails = (evt) => {
    // console.log("DETAILS");
    evt.stopPropagation();
    navigate(`/home/${post._id}`);
  }

  const shortText = (text, numb) => {
    const shortText = text.slice(0, numb);
    return shortText;
  }

  return (
    <div css={styles(isOwn)}>
      <Card className="card" elevation={isOwn ? 6 : 3}>
        <ButtonBase className="buttonBase" onClick={handleOpenPostDetails}>
          <CardMedia 
            className="media"
            // image={'https://images.pexels.com/photos/1020017/pexels-photo-1020017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
            image={post.files.length > 0 ? post.files[0] : "/"}
            title={post.title}
          />
          <div className="timeOverlay">
            <div className="nameWrapper">
              <Avatar
                className="purple" 
                alt={post?.creator?.name}
                src={post?.creator?.picture}
              >
                {!post?.creator?.picture ? post?.creator?.name.charAt(0) : ""}
              </Avatar>
              <Typography variant="h6" color="textSecondary" className="name">{post.name}</Typography>
            </div>
            <Typography variant="body2" color="textSecondary" className="name">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          <div className="tags">
            {post.tags.map((tag, i) => {
              return (
                <Typography variant="body2" color="textSecondary" key={i}>
                  {`#${tag}`}
                </Typography>)
              })
            }
          </div>
          <div>
            <CardContent sx={{mt: 2}}>
              <Typography variant="h5" className="title" gutterBottom>{post.title.length > 18 ? `${shortText(post.title, 18)}...` : post.title}</Typography>
              <Typography component="p" variant="body2" color="textSecondary">{post.message.length > 34 ? `${shortText(post.message, 45)}...` : post.message}</Typography>
            </CardContent>
          </div>
        </ButtonBase>
        <div>
          <CardActions className="actions">
            <Like post={post} />
            {isOwn ?
              <div className="buttons">
                <PostSettings post={post} />
              </div> 
              : null
            }
          </CardActions>
        </div>
      </Card>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  setCurrentId: PropTypes.func
}