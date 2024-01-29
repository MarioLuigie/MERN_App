import mongoose from "mongoose";

//Create mongoose Schema (Document)
const postSchema = mongoose.Schema({
  creator: String,
  title: String,
  message: String,
  tags: String,
  files: [String],
  likeCount: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

//Create a mongoose model based on the Schema (Collection)
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;