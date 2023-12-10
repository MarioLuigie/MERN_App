import * as api from "../api/api.js";
import { posts as type} from "../../constants/actionTypes.js";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    console.log(data);

    dispatch({type: type.READ_POSTS, data});
  } catch (err) {
    console.error("Something went wrong...", err.message);
  }
}