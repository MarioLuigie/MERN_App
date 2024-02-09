import mongoose from "mongoose";

//Create mongoose Schema (Document)
const postSchema = mongoose.Schema({
  name: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  message: String,
  tags: [String],
  files: [String],
  likers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
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