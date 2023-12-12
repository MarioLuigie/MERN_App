import mongoose from "mongoose";

//Create mongoose Schema (Document)
const postSchema = mongoose.Schema({
  creator: String,
  title: String,
  message: String,
  tags: String,
  acceptedFiles: [String],
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

//Create a mongoose model based on the Schema (Collection)
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;